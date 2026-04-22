import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { getDb } from "@/src/db"
import { validateIntakeBody } from "@/src/lib/validation/intake"
import { organizations } from "@/src/db/schema/organizations"
import { intakeJobs } from "@/src/db/schema/intake-jobs"
import { intakeSubmissions } from "@/src/db/schema/intake-submissions"

function generateReferenceNo() {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, "0")
  const d = String(now.getUTCDate()).padStart(2, "0")
  const suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase()

  return `INT-${y}${m}${d}-${suffix}`
}

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 }
    )
  }

  const { data, errors } = validateIntakeBody(body)

  if (!data) {
    return NextResponse.json(
      { success: false, error: "Validation failed", details: errors },
      { status: 422 }
    )
  }

  const db = getDb()

  try {
    const result = await db.transaction(async (tx) => {
      const [existingOrganization] = await tx
        .select({
          id: organizations.id,
          name: organizations.name,
          contactEmail: organizations.contactEmail,
          contactName: organizations.contactName,
        })
        .from(organizations)
        .where(eq(organizations.contactEmail, data.clientEmail))
        .limit(1)

      const organization =
        existingOrganization ??
        (
          await tx
            .insert(organizations)
            .values({
              name: data.clientName,
              contactEmail: data.clientEmail,
              contactName: data.clientName,
              status: "prospect",
            })
            .returning({
              id: organizations.id,
              name: organizations.name,
              contactEmail: organizations.contactEmail,
              contactName: organizations.contactName,
            })
        )[0]

      const referenceNo = generateReferenceNo()

      const [submission] = await tx
        .insert(intakeSubmissions)
        .values({
          referenceNo,
          projectName: data.projectName,
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          budget: data.budget ?? null,
          features: data.features ?? null,
          teamSize: data.teamSize ?? null,
          startDate: data.startDate ?? null,
          notes: data.notes ?? null,
          status: "pending",
          emailSent: false,
        })
        .returning({
          id: intakeSubmissions.id,
          referenceNo: intakeSubmissions.referenceNo,
          status: intakeSubmissions.status,
          createdAt: intakeSubmissions.createdAt,
        })

      const [job] = await tx
        .insert(intakeJobs)
        .values({
          orgId: organization.id,
          status: "queued",
          currentStage: "intake_received",
        })
        .returning({
          id: intakeJobs.id,
          orgId: intakeJobs.orgId,
          status: intakeJobs.status,
          currentStage: intakeJobs.currentStage,
          createdAt: intakeJobs.createdAt,
        })

      return {
        submission,
        organization,
        job,
      }
    })

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error("[POST /api/intake] Database error:", err)
    return NextResponse.json(
      { success: false, error: "Failed to create intake submission." },
      { status: 500 }
    )
  }
}

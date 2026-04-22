import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { getDb } from "@/src/db"
import { organizations } from "@/src/db/schema/organizations"
import { intakeJobs } from "@/src/db/schema/intake-jobs"
import { intakeSubmissions } from "@/src/db/schema/intake-submissions"

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { success: false, error: "Missing submission ID" },
      { status: 400 }
    )
  }

  const db = getDb()

  try {
    const [submission] = await db
      .select()
      .from(intakeSubmissions)
      .where(eq(intakeSubmissions.id, id))
      .limit(1)

    if (!submission) {
      return NextResponse.json(
        { success: false, error: "Submission not found" },
        { status: 404 }
      )
    }

    const [organization] = submission.clientEmail
      ? await db
          .select()
          .from(organizations)
          .where(eq(organizations.contactEmail, submission.clientEmail))
          .limit(1)
      : []

    const jobs = organization
      ? await db
          .select()
          .from(intakeJobs)
          .where(eq(intakeJobs.orgId, organization.id))
      : []

    return NextResponse.json({
      success: true,
      data: {
        submission,
        organization: organization ?? null,
        jobs,
      },
    })
  } catch (err) {
    console.error(`[GET /api/intake/${id}] Database error:`, err)
    return NextResponse.json(
      { success: false, error: "Failed to fetch submission." },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 }
    )
  }

  const VALID_STATUSES = new Set([
    "pending",
    "queued",
    "in_progress",
    "awaiting_review",
    "approved",
    "deployed",
    "failed",
    "cancelled",
  ])

  if (
    !body ||
    typeof body !== "object" ||
    !("status" in (body as object)) ||
    typeof (body as Record<string, unknown>).status !== "string" ||
    !VALID_STATUSES.has((body as Record<string, unknown>).status as string)
  ) {
    return NextResponse.json(
      {
        success: false,
        error: `status must be one of: ${[...VALID_STATUSES].join(", ")}`,
      },
      { status: 422 }
    )
  }

  const nextStatus = (body as { status: string }).status
  const db = getDb()

  try {
    const [updated] = await db
      .update(intakeSubmissions)
      .set({
        status: nextStatus,
      })
      .where(eq(intakeSubmissions.id, id))
      .returning({
        id: intakeSubmissions.id,
        status: intakeSubmissions.status,
      })

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Submission not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (err) {
    console.error(`[PATCH /api/intake/${id}] Database error:`, err)
    return NextResponse.json(
      { success: false, error: "Failed to update status." },
      { status: 500 }
    )
  }
}

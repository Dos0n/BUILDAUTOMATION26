export interface IntakeSubmissionBody {
  projectName: string
  clientName: string
  clientEmail: string
  budget?: string
  features?: string
  teamSize?: string
  startDate?: string
  notes?: string
}

export interface ValidationError {
  field: string
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateIntakeBody(body: unknown): {
  data: IntakeSubmissionBody | null
  errors: ValidationError[]
} {
  const errors: ValidationError[] = []

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      data: null,
      errors: [{ field: "body", message: "Request body must be a JSON object" }],
    }
  }

  const b = body as Record<string, unknown>

  if (!b.projectName || typeof b.projectName !== "string" || b.projectName.trim() === "") {
    errors.push({ field: "projectName", message: "projectName is required" })
  } else if (b.projectName.trim().length > 200) {
    errors.push({
      field: "projectName",
      message: "projectName must be 200 characters or fewer",
    })
  }

  if (!b.clientName || typeof b.clientName !== "string" || b.clientName.trim() === "") {
    errors.push({ field: "clientName", message: "clientName is required" })
  } else if (b.clientName.trim().length > 200) {
    errors.push({
      field: "clientName",
      message: "clientName must be 200 characters or fewer",
    })
  }

  if (!b.clientEmail || typeof b.clientEmail !== "string" || b.clientEmail.trim() === "") {
    errors.push({ field: "clientEmail", message: "clientEmail is required" })
  } else if (!EMAIL_RE.test(b.clientEmail.trim())) {
    errors.push({ field: "clientEmail", message: "clientEmail must be a valid email" })
  }

  if (b.budget !== undefined && b.budget !== null && typeof b.budget !== "string") {
    errors.push({ field: "budget", message: "budget must be a string" })
  }

  if (b.features !== undefined && b.features !== null && typeof b.features !== "string") {
    errors.push({ field: "features", message: "features must be a string" })
  }

  if (b.teamSize !== undefined && b.teamSize !== null && typeof b.teamSize !== "string") {
    errors.push({ field: "teamSize", message: "teamSize must be a string" })
  }

  if (b.startDate !== undefined && b.startDate !== null && typeof b.startDate !== "string") {
    errors.push({ field: "startDate", message: "startDate must be a string" })
  }

  if (b.notes !== undefined && b.notes !== null && typeof b.notes !== "string") {
    errors.push({ field: "notes", message: "notes must be a string" })
  }

  if (errors.length > 0) {
    return { data: null, errors }
  }

  return {
    data: {
      projectName: (b.projectName as string).trim(),
      clientName: (b.clientName as string).trim(),
      clientEmail: (b.clientEmail as string).trim().toLowerCase(),
      budget: typeof b.budget === "string" ? b.budget.trim() : undefined,
      features: typeof b.features === "string" ? b.features.trim() : undefined,
      teamSize: typeof b.teamSize === "string" ? b.teamSize.trim() : undefined,
      startDate: typeof b.startDate === "string" ? b.startDate.trim() : undefined,
      notes: typeof b.notes === "string" ? b.notes.trim() : undefined,
    },
    errors: [],
  }
}

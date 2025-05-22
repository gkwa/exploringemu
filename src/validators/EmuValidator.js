export class EmuValidator {
  validateCreate(data) {
    const errors = []

    if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
      errors.push("Name is required and must be a non-empty string")
    }

    if (!data.platform || typeof data.platform !== "string" || data.platform.trim().length === 0) {
      errors.push("Platform is required and must be a non-empty string")
    }

    if (!data.version || typeof data.version !== "string" || data.version.trim().length === 0) {
      errors.push("Version is required and must be a non-empty string")
    }

    if (data.description && typeof data.description !== "string") {
      errors.push("Description must be a string if provided")
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  validateUpdate(data) {
    const errors = []

    if (
      data.name !== undefined &&
      (typeof data.name !== "string" || data.name.trim().length === 0)
    ) {
      errors.push("Name must be a non-empty string if provided")
    }

    if (
      data.platform !== undefined &&
      (typeof data.platform !== "string" || data.platform.trim().length === 0)
    ) {
      errors.push("Platform must be a non-empty string if provided")
    }

    if (
      data.version !== undefined &&
      (typeof data.version !== "string" || data.version.trim().length === 0)
    ) {
      errors.push("Version must be a non-empty string if provided")
    }

    if (data.description !== undefined && typeof data.description !== "string") {
      errors.push("Description must be a string if provided")
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }
}

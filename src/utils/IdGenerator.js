export class IdGenerator {
  generate(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .substring(0, 20)
  }
}

import { EmuRepository } from "../repositories/EmuRepository.js"
import { EmuValidator } from "../validators/EmuValidator.js"
import { IdGenerator } from "../utils/IdGenerator.js"

export class EmuService {
  constructor(logger) {
    this.repository = new EmuRepository(logger)
    this.validator = new EmuValidator()
    this.idGenerator = new IdGenerator()
    this.logger = logger
  }

  async create(emuData) {
    this.logger.debug("Creating new emulator")

    const validationResult = this.validator.validateCreate(emuData)
    if (!validationResult.valid) {
      this.logger.error(`Validation failed: ${validationResult.errors.join(", ")}`)
      process.exit(1)
    }

    const id = this.idGenerator.generate(emuData.name)
    const emulator = {
      id,
      name: emuData.name,
      platform: emuData.platform,
      version: emuData.version,
      description: emuData.description || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await this.repository.save(id, emulator)
    this.logger.info(`Emulator created with ID: ${id}`)
  }

  async list() {
    this.logger.debug("Listing all emulators")
    const emulators = await this.repository.getAll()

    if (emulators.length === 0) {
      this.logger.info("No emulators found")
      return
    }

    emulators.forEach((emu) => {
      console.log(`${emu.id}: ${emu.name} (${emu.platform}) v${emu.version}`)
    })
  }

  async read(id) {
    this.logger.debug(`Reading emulator with ID: ${id}`)
    const emulator = await this.repository.getById(id)

    if (!emulator) {
      this.logger.error(`Emulator not found: ${id}`)
      process.exit(1)
    }

    console.log(JSON.stringify(emulator, null, 2))
  }

  async update(id, updateData) {
    this.logger.debug(`Updating emulator with ID: ${id}`)

    const existing = await this.repository.getById(id)
    if (!existing) {
      this.logger.error(`Emulator not found: ${id}`)
      process.exit(1)
    }

    const validationResult = this.validator.validateUpdate(updateData)
    if (!validationResult.valid) {
      this.logger.error(`Validation failed: ${validationResult.errors.join(", ")}`)
      process.exit(1)
    }

    const updated = {
      ...existing,
      ...Object.fromEntries(Object.entries(updateData).filter(([_, value]) => value !== undefined)),
      updatedAt: new Date().toISOString(),
    }

    await this.repository.save(id, updated)
    this.logger.info(`Emulator updated: ${id}`)
  }

  async delete(id) {
    this.logger.debug(`Deleting emulator with ID: ${id}`)

    const exists = await this.repository.getById(id)
    if (!exists) {
      this.logger.error(`Emulator not found: ${id}`)
      process.exit(1)
    }

    await this.repository.remove(id)
    this.logger.info(`Emulator deleted: ${id}`)
  }

  async clear() {
    this.logger.debug("Clearing all emulators")
    await this.repository.clear()
    this.logger.info("All emulators cleared")
  }
}

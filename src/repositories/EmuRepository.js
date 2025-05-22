import { StorageAdapter } from "../adapters/StorageAdapter.js"

export class EmuRepository {
  constructor(logger) {
    this.storage = new StorageAdapter("emulators", logger)
    this.logger = logger
  }

  async save(id, emulator) {
    this.logger.debug(`Saving emulator to storage: ${id}`)
    await this.storage.setItem(id, emulator)
  }

  async getById(id) {
    this.logger.debug(`Retrieving emulator from storage: ${id}`)
    return await this.storage.getItem(id)
  }

  async getAll() {
    this.logger.debug("Retrieving all emulators from storage")
    return await this.storage.getAllItems()
  }

  async remove(id) {
    this.logger.debug(`Removing emulator from storage: ${id}`)
    await this.storage.removeItem(id)
  }

  async clear() {
    this.logger.debug("Clearing all emulators from storage")
    await this.storage.clear()
  }
}

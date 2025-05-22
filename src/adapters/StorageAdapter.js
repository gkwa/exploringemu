import { promises as fs } from "fs"
import path from "path"
import os from "os"

export class StorageAdapter {
  constructor(storeName, logger) {
    this.storeName = storeName
    this.logger = logger
    this.dataDir = path.join(os.homedir(), ".exploringemu")
    this.storeFile = path.join(this.dataDir, `${storeName}.json`)
  }

  async _ensureDataDir() {
    try {
      await fs.mkdir(this.dataDir, { recursive: true })
    } catch (error) {
      if (error.code !== "EEXIST") {
        throw error
      }
    }
  }

  async _loadStore() {
    try {
      const data = await fs.readFile(this.storeFile, "utf8")
      return JSON.parse(data)
    } catch (error) {
      if (error.code === "ENOENT") {
        return {}
      }
      throw error
    }
  }

  async _saveStore(store) {
    await this._ensureDataDir()
    await fs.writeFile(this.storeFile, JSON.stringify(store, null, 2))
  }

  async setItem(key, value) {
    this.logger.debug(`Storage: Setting item ${key}`)
    try {
      const store = await this._loadStore()
      store[key] = value
      await this._saveStore(store)
      this.logger.debug(`Storage: Successfully set item ${key}`)
    } catch (error) {
      this.logger.error(`Storage: Failed to set item ${key}: ${error.message}`)
      throw error
    }
  }

  async getItem(key) {
    this.logger.debug(`Storage: Getting item ${key}`)
    try {
      const store = await this._loadStore()
      const item = store[key] || null
      this.logger.debug(`Storage: ${item ? "Found" : "Not found"} item ${key}`)
      return item
    } catch (error) {
      this.logger.error(`Storage: Failed to get item ${key}: ${error.message}`)
      throw error
    }
  }

  async getAllItems() {
    this.logger.debug("Storage: Getting all items")
    try {
      const store = await this._loadStore()
      const items = Object.values(store)
      this.logger.debug(`Storage: Retrieved ${items.length} items`)
      return items
    } catch (error) {
      this.logger.error(`Storage: Failed to get all items: ${error.message}`)
      throw error
    }
  }

  async removeItem(key) {
    this.logger.debug(`Storage: Removing item ${key}`)
    try {
      const store = await this._loadStore()
      delete store[key]
      await this._saveStore(store)
      this.logger.debug(`Storage: Successfully removed item ${key}`)
    } catch (error) {
      this.logger.error(`Storage: Failed to remove item ${key}: ${error.message}`)
      throw error
    }
  }

  async clear() {
    this.logger.debug("Storage: Clearing all items")
    try {
      await this._saveStore({})
      this.logger.debug("Storage: Successfully cleared all items")
    } catch (error) {
      this.logger.error(`Storage: Failed to clear items: ${error.message}`)
      throw error
    }
  }
}

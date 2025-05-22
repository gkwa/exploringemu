export class Logger {
  constructor() {
    this.level = 0
    this.levels = {
      0: "ERROR",
      1: "INFO",
      2: "DEBUG",
    }
  }

  setLevel(level) {
    this.level = Math.min(level, 2)
  }

  error(message) {
    if (this.level >= 0) {
      console.error(`[ERROR] ${message}`)
    }
  }

  info(message) {
    if (this.level >= 1) {
      console.error(`[INFO] ${message}`)
    }
  }

  debug(message) {
    if (this.level >= 2) {
      console.error(`[DEBUG] ${message}`)
    }
  }
}

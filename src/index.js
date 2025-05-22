#!/usr/bin/env node

import { program } from "commander"
import { EmuService } from "./services/EmuService.js"
import { Logger } from "./utils/Logger.js"

const logger = new Logger()
const emuService = new EmuService(logger)

program.name("exploringemu").description("CLI for managing retro gaming emulator inventory")

program
  .command("add")
  .description("Add a new emulator")
  .requiredOption("--name <name>", "emulator name")
  .requiredOption("--platform <platform>", "gaming platform")
  .requiredOption("--emu-version <version>", "emulator version")
  .option("--description <description>", "optional description")
  .option("-v, --verbose", "increase verbosity", (_, previous) => previous + 1, 0)
  .action(async (options) => {
    logger.setLevel(options.verbose || 0)
    const emuData = {
      name: options.name,
      platform: options.platform,
      version: options.emuVersion,
      description: options.description,
    }
    await emuService.create(emuData)
  })

program
  .command("list")
  .description("List all emulators")
  .option("-v, --verbose", "increase verbosity", (_, previous) => previous + 1, 0)
  .action(async (options) => {
    logger.setLevel(options.verbose || 0)
    await emuService.list()
  })

program
  .command("get")
  .description("Get emulator by ID")
  .requiredOption("--id <id>", "emulator ID")
  .option("-v, --verbose", "increase verbosity", (_, previous) => previous + 1, 0)
  .action(async (options) => {
    logger.setLevel(options.verbose || 0)
    await emuService.read(options.id)
  })

program
  .command("update")
  .description("Update an existing emulator")
  .requiredOption("--id <id>", "emulator ID")
  .option("--name <name>", "emulator name")
  .option("--platform <platform>", "gaming platform")
  .option("--emu-version <version>", "emulator version")
  .option("--description <description>", "description")
  .option("-v, --verbose", "increase verbosity", (_, previous) => previous + 1, 0)
  .action(async (options) => {
    logger.setLevel(options.verbose || 0)
    const updateData = {
      name: options.name,
      platform: options.platform,
      version: options.emuVersion,
      description: options.description,
    }
    await emuService.update(options.id, updateData)
  })

program
  .command("delete")
  .description("Delete an emulator")
  .requiredOption("--id <id>", "emulator ID")
  .option("-v, --verbose", "increase verbosity", (_, previous) => previous + 1, 0)
  .action(async (options) => {
    logger.setLevel(options.verbose || 0)
    await emuService.delete(options.id)
  })

program
  .command("clear")
  .description("Clear all emulators")
  .option("-v, --verbose", "increase verbosity", (_, previous) => previous + 1, 0)
  .action(async (options) => {
    logger.setLevel(options.verbose || 0)
    await emuService.clear()
  })

program.parse()

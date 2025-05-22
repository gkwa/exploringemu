# List available commands
default:
    @just --list

# Setup project dependencies and make executable
setup:
    pnpm install
    chmod +x src/index.js

# Run basic functionality tests
test:
    ./src/index.js add --name "TestEmu" --platform "Test" --emu-version "1.0" -v
    ./src/index.js list -v
    ./src/index.js delete --id "testemu" -v

# Clean up generated files and data
teardown:
    pnpm exec rimraf node_modules
    rm -rf ~/.exploringemu

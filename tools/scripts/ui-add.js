#!/usr/bin/env node

import { execSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { argv } from "node:process"

const componentName = argv[2]

if (!componentName) {
  console.error("Error: Please provide a component name")
  console.error("Usage: pnpm ui:add <component-name>")
  console.error("Example: pnpm ui:add button")
  process.exit(1)
}

const registryComponent = `@storybook/${componentName}-story`

try {
  execSync(`npx shadcn@latest add ${registryComponent} -c packages/ui`, {
    stdio: "inherit",
  })

  // Fix imports in the story file
  const storyFilePath = resolve(`packages/ui/src/components/${componentName}.stories.tsx`)
  try {
    let storyContent = readFileSync(storyFilePath, "utf-8")

    // Replace @workspace/components/ui/... imports with relative imports
    storyContent = storyContent.replace(
      /from ["']@workspace\/components\/ui\/([^"']+)["']/g,
      'from "./$1"'
    )

    writeFileSync(storyFilePath, storyContent, "utf-8")
  } catch {
    // Silently continue if story file doesn't exist or can't be fixed
  }

  // Run Biome fix on the new component files
  try {
    execSync(
      `npx biome check --write packages/ui/src/components/${componentName}.tsx packages/ui/src/components/${componentName}.stories.tsx`,
      {
        stdio: "pipe",
      }
    )
  } catch {
    // Silently continue if Biome fix fails
  }
} catch (error) {
  process.exit(error.status ?? 1)
}

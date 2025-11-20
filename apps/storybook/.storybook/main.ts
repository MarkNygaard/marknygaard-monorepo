import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import type { StorybookConfig } from "@storybook/nextjs"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
// biome-ignore lint: false positive - require is used intentionally for compatibility with Yarn PnP and monorepos
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")))
}

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
  stories: ["../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [getAbsolutePath("@storybook/addon-docs")],

  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
}
export default config

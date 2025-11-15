# Mark Nygaard - Monorepo

A modern monorepo setup using Turborepo, Next.js, Sanity CMS, and Storybook with shared UI components.

## Tech Stack

- **Build System**: Turborepo with pnpm workspaces
- **Linting & Formatting**: Biome with Ultracite presets
- **UI Components**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS v4
- **Type Safety**: TypeScript 5.7

## Project Structure

```
.
├── apps/
│   ├── web/          # Next.js application
│   ├── studio/       # Sanity CMS studio
│   └── storybook/    # Component documentation
├── packages/
│   └── ui/           # Shared UI component library
└── tools/
    ├── biome-config/      # Shared Biome configuration
    └── typescript-config/ # Shared TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm 10.4.1

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

## Available Commands

### Development

```bash
pnpm dev           # Start all dev servers
pnpm build         # Build all apps
```

### Code Quality

```bash
pnpm lint          # Lint all workspaces
pnpm format        # Format all workspaces
pnpm check         # Run linting, formatting, and import organization
pnpm check:unsafe  # Run all checks including unsafe fixes
```

## Workspaces

### Web App (`apps/web`)

Next.js application with:
- React 19
- Next.js 15 with Turbopack
- Tailwind CSS v4
- Shared UI components from `@workspace/ui`

### Studio (`apps/studio`)

Sanity CMS studio for content management.

### Storybook (`apps/storybook`)

Component documentation and development environment.

### UI Package (`packages/ui`)

Shared component library built with:
- shadcn/ui components
- Radix UI primitives
- Tailwind CSS
- Class Variance Authority (CVA)

## Adding UI Components

Add shadcn/ui components with Storybook stories using the custom script:

```bash
pnpm ui:add button
pnpm ui:add card
pnpm ui:add input
```

This command:
- Adds the component from the [shadcn-storybook-registry](https://github.com/lloydrichards/shadcn-storybook-registry)
- Includes both the component and its Storybook story
- Automatically fixes imports to use relative paths
- Runs Biome to organize imports and fix linting issues
- Places everything in `packages/ui/src/components/`

## Using Components

Import components from the shared UI package:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Code Quality & Formatting

This project uses **Biome** with **Ultracite** presets for lightning-fast linting and formatting.

### Features

- ✅ Auto-formatting on save
- ✅ Import organization
- ✅ Tailwind class sorting
- ✅ Pre-commit hooks

### VSCode Setup

The project is configured to format on save. Make sure you have the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) installed.

## Git Hooks

Pre-commit hooks automatically run `ultracite fix` on staged files to ensure code quality.

## License

UNLICENSED

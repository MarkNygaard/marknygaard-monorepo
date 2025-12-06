# Chatbot Conversations Admin

A Next.js application for viewing and managing chatbot conversation history with Better Auth authentication.

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)
- `DATABASE_URL` - PostgreSQL connection string for Better Auth
- `BETTER_AUTH_SECRET` - Random secret for Better Auth (generate with `openssl rand -base64 32`)
- `NEXT_PUBLIC_AUTH_URL` - Auth URL (http://localhost:3001 for local development)

### 2. Database Schema

This app uses Better Auth which requires database tables for user management. Run the Better Auth CLI to generate and migrate the schema:

```bash
# Generate schema
pnpm exec @better-auth/cli@latest generate

# Apply migration
pnpm exec @better-auth/cli@latest migrate
```

This will create the following tables in your Supabase database:
- `user` - User accounts
- `session` - User sessions
- `account` - Linked accounts
- `verification` - Email verification tokens

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Run Development Server

```bash
pnpm dev
```

The app will be available at http://localhost:3001

## Features

- ✅ Email/password authentication via Better Auth
- ✅ View all chatbot conversation sessions with pagination (20 per page)
- ✅ Real-time search with 300ms debouncing
- ✅ Sort by newest/oldest
- ✅ Date grouping (Today, Yesterday, This Week, Earlier)
- ✅ View full conversation threads with message formatting
- ✅ Smart link detection (internal/external)
- ✅ Loading states with skeleton loaders
- ✅ Error boundaries and retry mechanisms
- ✅ Responsive design with dark mode support
- 🔄 Admin-only user management (planned)
- 🔄 Export functionality (planned)

## Tech Stack

- Next.js 16 (App Router)
- Better Auth (PostgreSQL adapter)
- Supabase (PostgreSQL database)
- Tailwind CSS
- @workspace/ui (shadcn components)
- TypeScript

## Project Structure

```
apps/conversations/
├── app/
│   ├── api/
│   │   └── auth/[...all]/   # Better Auth API routes
│   ├── conversations/        # Conversations pages
│   ├── sign-in/             # Sign in page
│   ├── sign-up/             # Sign up page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── lib/
│   ├── auth.ts              # Better Auth server config
│   └── auth-client.ts       # Better Auth client
└── components/              # React components
```

## Development

### Code Quality

This project uses Biome for linting and formatting via the Ultracite preset:

```bash
# Check and fix issues
pnpm check

# Format code
pnpm format

# Lint code
pnpm lint
```

### Type Checking

```bash
pnpm typecheck
```

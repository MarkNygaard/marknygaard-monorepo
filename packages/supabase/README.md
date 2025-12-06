# @workspace/supabase

Supabase client and utilities for the marknygaard workspace.

## Installation

This package is part of the workspace and will be automatically available to other packages.

## Usage

### Client-Side Usage

```typescript
import { getSupabaseClient } from "@workspace/supabase/client"
import { getConversationsBySession } from "@workspace/supabase/queries"

const supabase = getSupabaseClient()
const messages = await getConversationsBySession(supabase, "session_123")
```

### Server-Side Usage (API Routes, Server Components)

```typescript
import { getSupabaseServiceClient } from "@workspace/supabase/client"
import { listUniqueSessions } from "@workspace/supabase/queries"

const supabase = getSupabaseServiceClient()
const { sessions, total } = await listUniqueSessions(supabase, {
  page: 1,
  limit: 20,
  sortOrder: "newest",
})
```

## Environment Variables

Copy `.env.example` to `.env` in your app directory and fill in the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Available Functions

### Queries

- `getConversationsBySession(client, sessionId)` - Get all messages for a session
- `listUniqueSessions(client, options)` - List unique sessions with pagination
- `searchConversations(client, searchQuery)` - Search conversations by content

### Types

- `ChatbotConversation` - Database row type
- `ChatbotConversationInsert` - Insert type
- `ConversationSession` - Session summary type
- `Database` - Full database schema type

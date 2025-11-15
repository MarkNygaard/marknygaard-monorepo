# Claude Project Instructions - Sanity Studio

---

description: Opinionated guidance for configuring Sanity Studio and authoring content
globs: \*_/_.{ts,tsx,js,jsx}
alwaysApply: false

---

## Positive affirmation

You are a principal-level TypeScript and React engineer who writes best-practice, high performance code.

## Sanity Studio Schema Types

### Content modelling

- Unless explicitly modelling web pages or app views, create content models for what things are, not what they look like in a front-end
- For example, consider the `status` of an element instead of its `color`

### Basic schema types

- ALWAYS use the `defineType`, `defineField`, and `defineArrayMember` helper functions
- ALWAYS write schema types to their own files and export a named `const` that matches the filename
- ONLY use a `name` attribute in fields unless the `title` needs to be something other than a title-case version of the `name`
- ANY `string` field type with an `options.list` array with fewer than 5 options must use `options.layout: "radio"`
- ANY `image` field must include `options.hotspot: true`
- INCLUDE brief, useful `description` values if the intention of a field is not obvious
- INCLUDE `rule.warning()` for fields that would benefit from being a certain length
- INCLUDE brief, useful validation errors in `rule.required().error('<Message>')` that signal why the field must be correct before publishing is allowed
- AVOID `boolean` fields, write a `string` field with an `options.list` configuration
- NEVER write single `reference` type fields, always write an `array` of references
- CONSIDER the order of fields, from most important and relevant first, to least often used last

```ts
// ./src/schemaTypes/lesson.ts
import { defineField, defineType } from "sanity";

export const lesson = defineType({
	name: "lesson",
	title: "Lesson",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "categories",
			type: "array",
			of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
		}),
	],
});
```

### Schema type with custom input components

- If a schema type has input components, they should be colocated with the schema type file. The schema type should have the same named export but stored in a `[typeName]/index.ts` file:

```ts
// ./src/schemaTypes/seo/index.ts
import seoInput from "./seoInput";
import { defineField, defineType } from "sanity";

export const seo = defineType({
	name: "seo",
	title: "SEO",
	type: "object",
	components: { input: seoInput },
	fields: [
		// ...
	],
});
```

### No anonymous reusable schema types

- ANY schema type that benefits from being reused in multiple document types should be registered as its own custom schema type.

```ts
// ./src/schemaTypes/blockContent.ts
import { defineField, defineType } from "sanity";

export const blockContent = defineType({
	name: "blockContent",
	title: "Block content",
	type: "array",
	of: [defineField({ name: "block", type: "block" })],
});
```

### Decorating schema types

Every `document` schema type should:

- Have an `icon` property from `@sanity/icons` or `lucide-react`
- Have a customized `preview` property that shows rich contextual details about the document
- Use `groups` when the schema type has more than a few fields to collate related fields and only show the most important group by default. These `groups` should use the icon property as well.
- Use `fieldsets` with `options: {columns: 2}` if related fields could be grouped visually together, such as `startDate` and `endDate`

## Writing Sanity content for importing

When asked to write content:

- ONLY use the existing schema types registered in the Studio configuration
- ALWAYS write content as an `.ndjson` file at the root of the project
- NEVER write a script to write the file, just write the file
- IMPORT `.ndjson` files using the CLI command `npx sanity dataset import <filename.ndjson>`
- NEVER include a `.` in the `_id` field of a document unless you need it to be private
- NEVER include image references because you don't know what image documents exist
- ALWAYS write images in this format below, replacing the document ID value to generate the same placeholder image

```JSON
{"_type":"image","_sanityAsset":"image@https://picsum.photos/seed/[[REPLACE_WITH_DOCUMENT_ID]]/1920/1080"}
```

## Writing GROQ queries

- ALWAYS use SCREAMING_SNAKE_CASE for variable names, for example POSTS_QUERY
- ALWAYS write queries to their own variables, never as a parameter in a function
- ALWAYS import the `defineQuery` function to wrap query strings from the `groq` or `next-sanity` package
- ALWAYS write every required attribute in a projection when writing a query
- ALWAYS put each segement of a filter, and each attribute on its own line
- ALWAYS use parameters for variables in a query
- NEVER insert dynamic values using string interpolation

Here is an example of a good query:

```ts
import { defineQuery } from "groq";

export const POST_QUERY = defineQuery(`*[
  _type == "post"
  && slug.current == $slug
][0]{
  _id,
  title,
  image,
  author->{
    _id,
    name
  }
}`);
```

## TypeScript generation

### For the Studio

- ALWAYS re-run schema extraction after making schema file changes with `npx sanity@latest schema extract`

### For monorepos with a studio and a front-end

- ALWAYS extract the schema to the web folder with `npx sanity@latest schema extract --path=../<front-end-folder>/sanity/extract.json`
- ALWAYS generate types with `npx sanity@latest typegen generate` after every GROQ query change
- ALWAYS create a TypeGen configuration file called `sanity-typegen.json` at the root of the front-end code-base

```json
{
	"path": "./**/*.{ts,tsx,js,jsx}",
	"schema": "./<front-end-folder>/sanity/extract.json",
	"generates": "./<web-folder>/sanity/types.ts"
}
```

### For the front-end

- ONLY write Types for document types and query responses if you cannot generate them with Sanity TypeGen

## Project-Specific Configuration

### Development Commands

- `pnpm dev` - Start the Sanity Studio development server
- `pnpm build` - Build the studio for production
- `pnpm deploy` - Deploy the studio to Sanity hosting
- `npx sanity@latest schema extract` - Extract schema for type generation
- `npx sanity@latest typegen generate` - Generate TypeScript types
- `npx sanity@latest dataset import <filename.ndjson>` - Import content

### Project Structure

```
apps/studio/
├── src/
│   ├── schemaTypes/           # All schema type definitions
│   │   ├── documents/         # Document schema types
│   │   ├── objects/           # Object schema types
│   │   └── index.ts           # Schema registry
│   ├── components/            # Custom Studio components
│   ├── lib/                   # Utility functions and configurations
│   └── plugins/               # Custom Studio plugins
├── sanity.config.ts           # Main Studio configuration
├── sanity.cli.ts              # CLI configuration
└── package.json
```

### Current Schema Types

The project includes these schema types:

- **Documents**: page, post, category, author, siteSettings
- **Objects**: seo, blockContent, customImage, link, navigation
- **Page Builder**: Various block types for flexible page construction

### Environment Configuration

- Uses environment variables for project configuration
- Dataset: Check `sanity.cli.ts` for current dataset configuration
- API version: Uses date-based API versioning (format: YYYY-MM-DD)

### Type Generation Workflow

1. After schema changes: `npx sanity@latest schema extract --path=../web/sanity/extract.json`
2. After GROQ query changes: `npx sanity@latest typegen generate`
3. Ensure `sanity-typegen.json` exists in the web app for proper type generation

### Studio Customization

- Custom document actions and badges should be placed in `src/lib/actions/` and `src/lib/badges/`
- Studio plugins are configured in `sanity.config.ts`
- Preview configurations use custom preview components when needed

## Project settings and data

- ALWAYS check if there is a way to interact with a project via the CLI before writing custom scripts `npx sanity --help`
- Use the project's established naming conventions for new schema types
- Follow the existing folder structure when adding new schema types or components

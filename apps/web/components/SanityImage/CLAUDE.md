# SanityImage Component - Claude Development Guidelines

## Component Overview

SanityImage is a high-performance React Server Component for rendering Sanity images with automatic format optimization, responsive breakpoints, and zero client-side JavaScript.

## Key Development Principles

### 1. **Always Use Multiple Components for Responsive Layouts**

**CRITICAL**: For optimal performance, always render multiple SanityImage components with CSS visibility classes instead of single images with CSS aspect ratios or fill mode.

```tsx
// ✅ ALWAYS do this for responsive layouts
<div className="relative overflow-hidden">
  <SanityImage image={image} aspectRatio="square" className="lg:hidden" sizes="100vw" />
  <SanityImage image={image} aspectRatio="wide" className="hidden lg:block" sizes="100vw" />
</div>

// ❌ NEVER do this - single image with CSS aspect ratios
<div className="aspect-square lg:aspect-[3/2] relative overflow-hidden">
  <SanityImage image={image} fill />
</div>
```

### 2. **Aspect Ratio vs Fill Mode Decision Tree**

- **Use `aspectRatio` prop**: For consistent layouts where you want precise image dimensions
- **Use `fill` mode**: Only when container has well-defined dimensions and you need the image to fill exactly
- **Use `fixedHeight`**: When exact pixel height is required across breakpoints

### 3. **Automatic Fit Behavior**

The component automatically applies `fit="crop"` when:

- `aspectRatio` is specified
- `fixedHeight` is specified

Never manually set `fit="crop"` with these props - it's redundant.

## Common Implementation Patterns

### Hero Sections

```tsx
<div className="relative overflow-hidden">
	{/* Mobile: Portrait for better mobile viewing */}
	<SanityImage image={heroImage} aspectRatio="portrait" sizes="100vw" className="lg:hidden" priority />

	{/* Desktop: Cinema for dramatic effect */}
	<SanityImage image={heroImage} aspectRatio="cinema" sizes="100vw" className="hidden lg:block" priority />
</div>
```

### Product Grids

```tsx
<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
	{products.map((product) => (
		<SanityImage
			key={product._id}
			image={product.image}
			aspectRatio="square"
			sizes="(max-width: 768px) 50vw, 25vw"
			alt={product.name}
		/>
	))}
</div>
```

### Article Featured Images

```tsx
<div className="relative overflow-hidden rounded-lg">
	<SanityImage image={article.image} aspectRatio="square" className="md:hidden" sizes="100vw" />
	<SanityImage image={article.image} aspectRatio="video" className="hidden md:block" sizes="100vw" />
</div>
```

### Carousels

```tsx
<div className="relative overflow-hidden">
	<SanityImage image={slide.image} aspectRatio="portrait" className="md:hidden" sizes="100vw" priority={isFirst} />
	<SanityImage
		image={slide.image}
		aspectRatio="video"
		className="hidden md:block lg:hidden"
		sizes="100vw"
		priority={isFirst}
	/>
	<SanityImage image={slide.image} fixedHeight={700} className="hidden lg:block" sizes="100vw" priority={isFirst} />
</div>
```

## Available Aspect Ratios

- `"square"` (1:1) - Product thumbnails, avatars
- `"video"` (16:9) - Video thumbnails, hero sections
- `"photo"` (4:3) - Traditional photography
- `"portrait"` (3:4) - Mobile-first designs
- `"wide"` (3:2) - Landscape photography
- `"cinema"` (2.35:1) - Dramatic wide shots

**Combining with width prop:**

```tsx
// Specify exact width, height calculated automatically
<SanityImage image={product} aspectRatio="square" width={400} />    // 400x400
<SanityImage image={hero} aspectRatio="video" width={1200} />       // 1200x675
<SanityImage image={card} aspectRatio="portrait" width={300} />     // 300x400
```

## Props to Avoid Combining

```tsx
// ❌ Don't combine these - conflicting logic
<SanityImage aspectRatio="square" fit="max" />
<SanityImage aspectRatio="square" fixedHeight={400} />
<SanityImage aspectRatio="square" fill />

// ✅ Use one approach per image
<SanityImage aspectRatio="square" />
<SanityImage fixedHeight={400} />
<SanityImage fill />
```

## Performance Guidelines

### Priority Loading

- Only use `priority={true}` for above-the-fold images
- Typically first hero image, main product image

### Sizes Attribute

- Always provide accurate `sizes` for responsive images
- Common patterns:
  - Full width: `sizes="100vw"`
  - Grid items: `sizes="(max-width: 768px) 50vw, 25vw"`
  - Half width: `sizes="(max-width: 768px) 100vw, 50vw"`

### Quality Settings

- Default (85): Good for most use cases
- High (90-95): Product detail images, hero images
- Lower (70-80): Thumbnails, background images

## Error Prevention

### Required Props

- `image`: Must be a valid Sanity image object with `asset` reference
- `alt`: Always provide meaningful alt text for accessibility

### When to Use Fill Mode vs Fixed Height

```tsx
// ✅ Use fixedHeight for exact pixel heights (preferred)
<div className="relative w-full overflow-hidden">
  <SanityImage image={image} fixedHeight={400} sizes="100vw" />
</div>

// ✅ Use fill for viewport-relative heights (responsive by nature)
<div className="h-svh relative overflow-hidden"> {/* viewport height needs to be responsive */}
  <SanityImage image={image} fill />
</div>

// ✅ Use aspectRatio prop instead of CSS aspect ratios (better performance)
<SanityImage image={image} aspectRatio="video" sizes="100vw" />

// ❌ Don't use arbitrary CSS heights with fill mode
<div className="h-[400px] relative">
  <SanityImage image={image} fill />
</div>
```

## When to Use getSanityImageData Utility

Use for non-standard cases where you need image URLs:

- Open Graph meta tags
- Background images in styled components
- API responses
- Third-party integrations

```tsx
const imageData = getSanityImageData(image, { width: 1200, height: 630 });
// Returns: { src, width, height, alt, placeholder }
```

## Component Development Workflow

1. **Determine layout needs**: Single size vs responsive breakpoints
2. **Choose approach**: aspectRatio, fixedHeight, or fill mode
3. **Plan breakpoints**: What aspect ratios work best for each screen size
4. **Implement multiple components**: One per breakpoint with CSS visibility
5. **Set sizes attribute**: Match your responsive layout
6. **Test performance**: Verify correct images are loaded per breakpoint

## Quick Reference

**Most common patterns:**

- Responsive hero: portrait mobile, cinema desktop
- Product grids: square aspect ratio
- Article images: square mobile, video desktop
- Carousels: portrait mobile, video tablet, fixed height desktop
- Simple content images: Use original dimensions with aspectRatio="photo"

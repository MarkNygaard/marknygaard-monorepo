# SanityImage Component Documentation

A high-performance React Server Component for rendering Sanity images with automatic format optimization, responsive breakpoints, and zero client-side JavaScript.

## Features

- 🚀 **React Server Component** - Zero JavaScript footprint
- 🖼️ **Auto format detection** - Serves WebP/AVIF/JPEG based on browser support
- 📱 **Responsive by default** - Generates srcset with intelligent breakpoints
- 🎯 **Hotspot & crop support** - Respects Sanity's focal point and crop settings
- 💨 **Performance optimized** - Lazy loading with priority loading option
- 🌫️ **Blur placeholder** - Smooth loading experience with low-quality placeholders
- 🔧 **Fill container mode** - Image fills entire parent container with proper cropping
- 📐 **Aspect ratio optimization** - Precise image generation for predefined aspect ratios

## Table of Contents

1. [Quick Start](#quick-start)
2. [Props Reference](#props-reference)
3. [Rendering Modes](#rendering-modes)
4. [Common Patterns](#common-patterns)
5. [Advanced Usage](#advanced-usage)
6. [Performance Guide](#performance-guide)
7. [Troubleshooting](#troubleshooting)
8. [Migration from next/image](#migration-from-nextimage)

## Quick Start

### Installation

```typescript
import { SanityImage } from "@/components/SanityImage";
```

### Basic Examples

```tsx
// Simple image
<SanityImage image={sanityImageObject} alt="Product photo" />

// Responsive hero with aspect ratio
<SanityImage
  image={heroImage}
  aspectRatio="video"
  priority={true}
  sizes="100vw"
  alt="Hero banner"
/>

// Product thumbnail
<SanityImage
  image={productImage}
  aspectRatio="square"
  sizes="(max-width: 768px) 50vw, 25vw"
  alt="Product thumbnail"
/>

// Fixed height banner
<SanityImage
  image={bannerImage}
  fixedHeight={500}
  sizes="100vw"
  alt="Banner image"
/>
```

## Props Reference

| Prop                | Type                | Default                                  | Description                                                                                                                           |
| ------------------- | ------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `image`             | `SanityImageObject` | **required**                             | Sanity image object with asset reference                                                                                              |
| `width`             | `number`            | original width                           | Target width in pixels                                                                                                                |
| `height`            | `number`            | original height                          | Target height in pixels                                                                                                               |
| `quality`           | `number`            | `85`                                     | Image quality (1-100)                                                                                                                 |
| `fit`               | `string`            | `"max"`                                  | Resize behavior: `"clip"`, `"crop"`, `"fill"`, `"fillmax"`, `"max"`, `"scale"`, `"min"`                                               |
| `bg`                | `string`            | `undefined`                              | Background color for transparent images (hex: `"ff0000"`)                                                                             |
| `alt`               | `string`            | `image.alt`                              | Alt text (falls back to image.alt)                                                                                                    |
| `className`         | `string`            | `undefined`                              | CSS classes                                                                                                                           |
| `sizes`             | `string`            | `undefined`                              | Responsive sizes attribute                                                                                                            |
| `srcSetBreakpoints` | `number[]`          | `[320, 480, 640, 768, 1024, 1280, 1536]` | Custom breakpoints for srcset                                                                                                         |
| `priority`          | `boolean`           | `false`                                  | Load image with high priority (above fold)                                                                                            |
| `showPlaceholder`   | `boolean`           | `true`                                   | Show blur placeholder while loading                                                                                                   |
| `fill`              | `boolean`           | `false`                                  | Image fills entire container without size constraints                                                                                 |
| `fixedHeight`       | `number`            | `undefined`                              | Fixed height in pixels maintained across all responsive breakpoints                                                                   |
| `aspectRatio`       | `AspectRatio`       | `undefined`                              | Predefined aspect ratio: `"square"` (1:1), `"video"` (16:9), `"photo"` (4:3), `"portrait"` (3:4), `"wide"` (3:2), `"cinema"` (2.35:1) |

## Rendering Modes

### Normal Mode (Default)

- Respects original image dimensions and aspect ratio
- Sets `max-width` to prevent oversizing
- Good for content images, product photos, thumbnails

### Fill Mode (`fill={true}`)

- Image covers the entire parent container
- Uses `object-fit: cover` for proper cropping
- Removes size constraints (`max-width`, `aspect-ratio`)
- Perfect for hero sections, backgrounds, carousel slides

```tsx
// Container must have defined height
<div className="relative h-svh overflow-hidden rounded-lg">
	<SanityImage image={heroImage} fill alt="Hero background" />
</div>
```

### Fixed Height Mode (`fixedHeight={number}`)

- Maintains exact height in pixels across all responsive breakpoints
- Width scales responsively while height stays constant
- Image fills container using `object-fit: cover`
- Perfect for banners, hero sections, or cards requiring consistent vertical space

```tsx
<SanityImage image={bannerImage} fixedHeight={500} sizes="100vw" alt="Consistent height banner" />
```

### Aspect Ratio Mode (`aspectRatio="ratio"`)

- Calculates exact image dimensions based on container width and aspect ratio
- Sanity generates images at precisely the right size for optimal performance
- Automatically uses `fit="crop"` for perfect container filling
- No CSS aspect ratio classes needed - dimensions are optimized at the source
- Can be combined with `width` prop to specify exact dimensions

```tsx
// Available aspect ratios
<SanityImage image={product} aspectRatio="square" />    // 1:1
<SanityImage image={video} aspectRatio="video" />       // 16:9
<SanityImage image={photo} aspectRatio="photo" />       // 4:3
<SanityImage image={portrait} aspectRatio="portrait" /> // 3:4
<SanityImage image={wide} aspectRatio="wide" />         // 3:2
<SanityImage image={cinema} aspectRatio="cinema" />     // 2.35:1

// With specific width - height calculated automatically
<SanityImage image={product} aspectRatio="square" width={400} />    // 400x400
<SanityImage image={video} aspectRatio="video" width={800} />       // 800x450
<SanityImage image={portrait} aspectRatio="portrait" width={300} /> // 300x400
```

## Common Patterns

### Hero Sections

```tsx
// Full viewport height hero
<section className="relative h-svh overflow-hidden">
  <SanityImage image={heroImage} fill priority={true} alt="Hero background" />
  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
    <h1 className="text-5xl font-bold text-white">Welcome</h1>
  </div>
</section>

// Fixed height hero with responsive aspect ratios
<div className="relative overflow-hidden">
  {/* Mobile: Portrait */}
  <SanityImage
    image={heroImage}
    aspectRatio="portrait"
    sizes="100vw"
    className="lg:hidden"
    priority
    alt="Mobile hero"
  />

  {/* Desktop: Cinema */}
  <SanityImage
    image={heroImage}
    aspectRatio="cinema"
    sizes="100vw"
    className="hidden lg:block"
    priority
    alt="Desktop hero"
  />
</div>
```

### Product Grids

```tsx
<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
	{products.map((product) => (
		<SanityImage
			key={product._id}
			image={product.image}
			aspectRatio="photo"
			sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
			className="w-full rounded-lg"
			alt={product.name}
		/>
	))}
</div>
```

### Carousel Slides

```tsx
<div className="relative overflow-hidden rounded-lg">
	{/* Mobile: Portrait */}
	<SanityImage
		image={slide.image}
		aspectRatio="portrait"
		sizes="100vw"
		className="md:hidden"
		priority={isFirstSlide}
		alt={slide.title}
	/>

	{/* Desktop: Fixed height */}
	<SanityImage
		image={slide.image}
		fixedHeight={700}
		sizes="100vw"
		className="hidden md:block"
		priority={isFirstSlide}
		alt={slide.title}
	/>
</div>
```

### Blog Content

```tsx
// Featured image
<div className="relative mb-8 overflow-hidden rounded-xl">
  <SanityImage
    image={article.featuredImage}
    aspectRatio="video"
    sizes="100vw"
    priority
    alt={article.title}
  />
</div>

// Inline content images
<SanityImage
  image={contentImage}
  width={700}
  className="my-8 rounded-lg"
  alt="Article illustration"
/>
```

## Advanced Usage

### Multiple Breakpoint Optimization

For optimal performance, render separate components for different screen sizes:

```tsx
// ✅ Optimal - Each breakpoint gets precisely sized images
<div className="relative overflow-hidden">
  <SanityImage
    image={heroImage}
    aspectRatio="square"
    sizes="100vw"
    className="lg:hidden"
    alt="Mobile hero"
  />

  <SanityImage
    image={heroImage}
    aspectRatio="wide"
    sizes="100vw"
    className="hidden lg:block"
    alt="Desktop hero"
  />
</div>

// ❌ Less optimal - Single oversized image cropped with CSS
<div className="aspect-square lg:aspect-[3/2] relative overflow-hidden">
  <SanityImage image={heroImage} fill alt="Hero" />
</div>
```

### getSanityImageData Utility

Use for custom implementations or meta tags:

```tsx
import { getSanityImageData } from "@/components/SanityImage";

// Generate image data for Open Graph
export async function generateMetadata({ params }) {
	const product = await getProduct(params.slug);
	const imageData = getSanityImageData(product.image, {
		width: 1200,
		height: 630,
	});

	return {
		openGraph: {
			images: imageData
				? [
						{
							url: imageData.src,
							width: imageData.width,
							height: imageData.height,
							alt: imageData.alt,
						},
					]
				: [],
		},
	};
}
```

### Custom Breakpoints

```tsx
<SanityImage
	image={bannerImage}
	width={1920}
	height={800}
	srcSetBreakpoints={[480, 768, 1024, 1366, 1920, 2560]}
	sizes="100vw"
	priority={true}
	alt="Large banner"
/>
```

## Performance Guide

### ✅ Best Practices

1. **Use aspect ratios for consistent layouts**

   ```tsx
   <SanityImage image={product} aspectRatio="square" />
   ```

2. **Multiple components for responsive designs**

   ```tsx
   <SanityImage image={hero} aspectRatio="portrait" className="lg:hidden" />
   <SanityImage image={hero} aspectRatio="cinema" className="hidden lg:block" />
   ```

3. **Priority loading for above-fold images only**

   ```tsx
   <SanityImage image={heroImage} priority={true} />
   ```

4. **Accurate sizes attribute**

   ```tsx
   <SanityImage image={productImage} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
   ```

5. **Choose appropriate rendering modes**

   ```tsx
   // Product photos - maintain aspect ratio
   <SanityImage image={productImage} />

   // Thumbnails - consistent dimensions
   <SanityImage image={thumbnailImage} aspectRatio="square" />

   // Hero banners - fill container
   <SanityImage image={bannerImage} fill />
   ```

### ❌ Avoid These Patterns

1. **Don't mix conflicting props**

   ```tsx
   // ❌ Don't use fit with aspectRatio
   <SanityImage image={img} aspectRatio="square" fit="max" />

   // ❌ Don't use fixedHeight with aspectRatio
   <SanityImage image={img} aspectRatio="video" fixedHeight={400} />
   ```

2. **Don't use priority for below-fold images**

   ```tsx
   // ❌ Gallery images below fold
   <SanityImage image={galleryImage} priority={true} />
   ```

3. **Don't use fill without defined container height**
   ```tsx
   // ❌ Container without height
   <div className="w-full">
   	<SanityImage image={heroImage} fill />
   </div>
   ```

## Troubleshooting

### Image Not Loading

- Verify the Sanity asset reference exists: `image?.asset?._ref`
- Check your `urlFor` configuration in `@/lib/sanity/image`
- Ensure proper CORS settings in Sanity project

### Blurry Images

- Increase `quality` prop (default is 85)
- Check if `width`/`height` match your CSS dimensions
- Verify srcset breakpoints align with your layout

### Fill Mode Not Working

- Ensure parent container has defined height (`h-[400px]`, `aspect-video`, etc.)
- Add `relative` positioning to parent container
- Check for CSS conflicts with `object-fit` or `max-width`

### Performance Issues

- Use `priority={true}` only for above-fold images
- Optimize `sizes` attribute for your layout
- Consider reducing `quality` for thumbnails
- Use multiple components instead of CSS cropping for responsive designs

## Migration from next/image

```tsx
// ❌ Client component with next/image
import Image from 'next/image';

<div className="relative h-64">
  <Image src={imageUrl} fill alt="Description" />
</div>

// ✅ Server component with SanityImage
import { SanityImage } from '@/components/SanityImage';

<SanityImage
  image={sanityImageObject}
  fixedHeight={256}
  sizes="100vw"
  alt="Description"
/>
```

## Sanity Schema Requirements

Your Sanity image fields should follow this structure:

```javascript
{
  name: 'image',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true, // Enable focal point selection
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessibility',
    }
  ]
}
```

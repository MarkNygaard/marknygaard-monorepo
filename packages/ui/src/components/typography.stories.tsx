import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Typography } from "@workspace/ui/typography"

/**
 * Typography component for displaying text with consistent styling across the application.
 * Supports various text variants and font families.
 */
const meta = {
  title: "ui/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "heading-large",
        "heading",
        "heading-small",
        "body-large",
        "body",
        "body-small",
        "caption",
      ],
    },
    font: {
      control: { type: "select" },
      options: ["serif", "sans"],
    },
    asChild: {
      control: { type: "boolean" },
    },
  },
  args: {
    children: "Sample Text",
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default typography variant with body text styling.
 */
export const Default: Story = {}

/**
 * Large heading variant with serif font for prominent titles.
 */
export const HeadingLargeSerif: Story = {
  args: {
    variant: "heading-large",
    font: "serif",
    children: "Heading Large Serif",
  },
}

/**
 * Large heading variant with sans-serif font for modern titles.
 */
export const HeadingLargeSans: Story = {
  args: {
    variant: "heading-large",
    font: "sans",
    children: "Heading Large Sans",
  },
}

/**
 * Standard heading variant for section titles.
 */
export const Heading: Story = {
  args: {
    variant: "heading",
    children: "Standard Heading",
  },
}

/**
 * Small heading variant for subsection titles.
 */
export const HeadingSmall: Story = {
  args: {
    variant: "heading-small",
    children: "Small Heading",
  },
}

/**
 * Large body text variant for emphasized content.
 */
export const BodyLarge: Story = {
  args: {
    variant: "body-large",
    children: "Large body text for emphasized content that needs more presence on the page.",
  },
}

/**
 * Standard body text variant for regular content.
 */
export const Body: Story = {
  args: {
    variant: "body",
    children: "Standard body text for regular content and paragraphs.",
  },
}

/**
 * Small body text variant for secondary information.
 */
export const BodySmall: Story = {
  args: {
    variant: "body-small",
    children: "Small body text for secondary information.",
  },
}

/**
 * Caption variant for labels and metadata with uppercase styling.
 */
export const Caption: Story = {
  args: {
    variant: "caption",
    children: "Caption Text",
  },
}

/**
 * Shows all typography variants together for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="heading-large" font="serif">
        Heading Large Serif - Sample Text
      </Typography>
      <Typography variant="heading-large" font="sans">
        Heading Large Sans - Sample Text
      </Typography>
      <Typography variant="heading">Heading - Sample Text</Typography>
      <Typography variant="heading-small">Heading Small - Sample Text</Typography>
      <Typography variant="body-large">
        Body Large - Lorem ipsum dolor sit amet consectetur adipiscing elit
      </Typography>
      <Typography variant="body">
        Body - Lorem ipsum dolor sit amet consectetur adipiscing elit
      </Typography>
      <Typography variant="body-small">
        Body Small - Lorem ipsum dolor sit amet consectetur
      </Typography>
      <Typography variant="caption">Caption - Uppercase styled text</Typography>
    </div>
  ),
}

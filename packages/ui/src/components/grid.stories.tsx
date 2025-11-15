import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Grid, GridItem } from "@workspace/ui/grid"

const meta: Meta<typeof Grid> = {
  title: "UI/Grid",
  component: Grid,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: { type: "boolean" },
      description: "Adds horizontal padding (lg:px-0.5) to the grid container",
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-50 p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

// Helper component for visual demonstration
const GridCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={`flex items-center justify-center rounded border py-6 ${className}`}>
    {children}
  </div>
)

export const Default: Story = {
  render: () => (
    <Grid>
      <GridItem>
        <GridCell>Default Layout (colSpan=18, colStart=7)</GridCell>
      </GridItem>
    </Grid>
  ),
}

export const WithPadding: Story = {
  render: () => (
    <Grid padding>
      <GridItem>
        <GridCell>Grid with padding prop</GridCell>
      </GridItem>
    </Grid>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <Grid>
      <GridItem colSpan="24" colStart="1">
        <GridCell>Full Width (colSpan=24, colStart=1)</GridCell>
      </GridItem>
    </Grid>
  ),
}

export const CenteredContent: Story = {
  render: () => (
    <Grid>
      <GridItem colSpan="12" colStart="7">
        <GridCell>Centered (colSpan=12, colStart=7)</GridCell>
      </GridItem>
    </Grid>
  ),
}

export const TwoColumns: Story = {
  render: () => (
    <Grid>
      <GridItem colSpan="11" colStart="1">
        <GridCell>Left (colSpan=11, colStart=1)</GridCell>
      </GridItem>
      <GridItem colSpan="11" colStart="13">
        <GridCell>Right (colSpan=11, colStart=13)</GridCell>
      </GridItem>
    </Grid>
  ),
}

export const ThreeColumns: Story = {
  render: () => (
    <Grid>
      <GridItem colSpan="8" colStart="1">
        <GridCell>Left</GridCell>
      </GridItem>
      <GridItem colSpan="8" colStart="9">
        <GridCell>Center</GridCell>
      </GridItem>
      <GridItem colSpan="8" colStart="17">
        <GridCell>Right</GridCell>
      </GridItem>
    </Grid>
  ),
}

export const AsymmetricLayout: Story = {
  render: () => (
    <Grid>
      <GridItem colSpan="6" colStart="2">
        <GridCell>Sidebar (6 colSpan)</GridCell>
      </GridItem>
      <GridItem colSpan="15" colStart="9">
        <GridCell>Main Content (15 colSpan)</GridCell>
      </GridItem>
    </Grid>
  ),
}

export const ImageTextLayout: Story = {
  name: "Image + Text Layout (Real-world Example)",
  render: () => (
    <Grid padding>
      <GridItem colSpan="12" colStart="1">
        <div className="flex aspect-video items-center justify-center rounded bg-gray-300">
          <span className="text-gray-600">Image (50%)</span>
        </div>
      </GridItem>
      <GridItem colSpan="6" colStart="18" className="flex flex-col justify-center space-y-4">
        <h2 className="font-bold text-2xl">Image Text Block</h2>
        <p className="text-gray-700">
          This demonstrates a common layout pattern with an image on the left and text content on
          the right.
        </p>
      </GridItem>
    </Grid>
  ),
}

export const MediaSizes: Story = {
  name: "Media Block Sizes",
  render: () => (
    <div className="space-y-8">
      {/* Small */}
      <div>
        <h3 className="mb-2 px-4 font-semibold text-lg">Small (8 colSpan, centered)</h3>
        <Grid>
          <GridItem colSpan="8" colStart="7">
            <GridCell>Small Media</GridCell>
          </GridItem>
        </Grid>
      </div>

      {/* Medium */}
      <div>
        <h3 className="mb-2 px-4 font-semibold text-lg">Medium (12 colSpan, centered)</h3>
        <Grid>
          <GridItem colSpan="12" colStart="7">
            <GridCell>Medium Media</GridCell>
          </GridItem>
        </Grid>
      </div>

      {/* Large */}
      <div>
        <h3 className="mb-2 px-4 font-semibold text-lg">Large (18 colSpan, centered)</h3>
        <Grid>
          <GridItem colSpan="18" colStart="7">
            <GridCell>Large Media</GridCell>
          </GridItem>
        </Grid>
      </div>

      {/* Full */}
      <div>
        <h3 className="mb-2 px-4 font-semibold text-lg">Full (24 colSpan)</h3>
        <Grid>
          <GridItem colSpan="24" colStart="1">
            <GridCell>Full Width Media</GridCell>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
}

export const ComplexLayout: Story = {
  name: "Complex Multi-Row Layout",
  render: () => (
    <div className="space-y-4">
      <Grid>
        <GridItem colSpan="24" colStart="1">
          <GridCell>
            <h1 className="font-bold text-2xl">Page Title</h1>
          </GridCell>
        </GridItem>
      </Grid>

      <Grid>
        <GridItem colSpan="15" colStart="1">
          <div className="flex aspect-video items-center justify-center rounded bg-gray-300">
            <span className="text-gray-600">Hero Image</span>
          </div>
        </GridItem>
        <GridItem colSpan="6" colStart="18" className="flex flex-col justify-center space-y-2">
          <h2 className="font-semibold text-xl">Featured Content</h2>
          <p className="text-gray-600 text-sm">Supporting text for the hero section.</p>
        </GridItem>
      </Grid>

      <Grid>
        <GridItem colSpan="8" colStart="1">
          <GridCell>Feature 1</GridCell>
        </GridItem>
        <GridItem colSpan="8" colStart="9">
          <GridCell>Feature 2</GridCell>
        </GridItem>
        <GridItem colSpan="8" colStart="17">
          <GridCell>Feature 3</GridCell>
        </GridItem>
      </Grid>
    </div>
  ),
}

export const GridOverlay: Story = {
  name: "24-Column Grid Visualization",
  render: () => (
    <Grid>
      {Array.from({ length: 24 }, (_, i) => (
        <GridItem
          // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is acceptable in this static example
          key={i}
          colSpan="1"
          colStart={
            (i + 1).toString() as
              | "1"
              | "2"
              | "3"
              | "4"
              | "5"
              | "6"
              | "7"
              | "8"
              | "9"
              | "10"
              | "11"
              | "12"
              | "13"
              | "14"
              | "15"
              | "16"
              | "17"
              | "18"
              | "19"
              | "20"
              | "21"
              | "22"
              | "23"
              | "24"
          }
        >
          <div className="flex h-24 items-center justify-center border border-blue-200 bg-blue-50 py-6 text-blue-600 text-xs">
            {i + 1}
          </div>
        </GridItem>
      ))}
    </Grid>
  ),
}

export const AsChildExample: Story = {
  name: "Using asChild Prop",
  render: () => (
    <Grid>
      <GridItem colSpan="12" colStart="7" asChild>
        <section className="rounded border border-purple-300 bg-purple-100 p-4">
          <h2 className="mb-2 font-semibold text-xl">Section Element</h2>
          <p>
            This GridItem uses asChild to render as a {`<section>`} instead of a {`<div>`}.
          </p>
        </section>
      </GridItem>
    </Grid>
  ),
}

import type { SanityAsset } from "@sanity/image-url/lib/types/types"
import { cn } from "@workspace/common/cn"
import { Typography } from "@workspace/ui/typography"
import type { PortableTextComponentProps, PortableTextProps } from "next-sanity"
import { PortableText } from "next-sanity"
import { SanityImage } from "@/components/SanityImage/SanityImage"

interface SanityImageValue extends SanityAsset {
  alt?: string
}

interface PortableRichTextProps {
  value: PortableTextProps["value"] | null
  className?: string
}

export function RichText({ value, className }: PortableRichTextProps) {
  if (!value) return null
  return (
    <div className={cn(className)}>
      <PortableText
        value={value}
        components={{
          marks: {
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">{children}</code>
            ),
          },
          block: {
            normal: ({ children }) => <p className="mb-4 font-light last:mb-0">{children}</p>,
            h1: ({ children }) => (
              <Typography variant="heading-large" asChild>
                <h1 className="py-1.5 text-4xl text-shadow-md leading-9 lg:text-5xl">{children}</h1>
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="heading-large" asChild>
                <h2>{children}</h2>
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="heading" asChild>
                <h3>{children}</h3>
              </Typography>
            ),
            h4: ({ children }) => (
              <Typography variant="heading" asChild>
                <h4>{children}</h4>
              </Typography>
            ),
            h5: ({ children }) => (
              <Typography variant="heading" asChild>
                <h5>{children}</h5>
              </Typography>
            ),
            h6: ({ children }) => (
              <Typography variant="heading" asChild>
                <h6>{children}</h6>
              </Typography>
            ),
            subtitle: ({ children }) => (
              <Typography variant="heading-small" className="py-1.5 text-lg text-shadow-md">
                {children}
              </Typography>
            ),
            inline: ({ children }) => <span>{children}</span>,
          },
          list: {
            bullet: ({ children }) => (
              <ul className="mb-4 list-inside list-disc space-y-1">{children}</ul>
            ),
            number: ({ children }) => (
              <ol className="mb-4 list-inside list-decimal space-y-1">{children}</ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => <li className="font-light">{children}</li>,
            number: ({ children }) => <li className="font-light">{children}</li>,
          },
          types: {
            image: ({ value }: PortableTextComponentProps<SanityImageValue>) => {
              if (!value?.asset) return null

              return (
                <div className="my-6">
                  <SanityImage
                    image={value}
                    alt={value.alt || ""}
                    className="h-auto w-full rounded-lg"
                  />
                </div>
              )
            },
          },
        }}
        onMissingComponent={(message, { nodeType, type }) =>
          console.warn("Missing PortableText component:", nodeType, type, message)
        }
      />
    </div>
  )
}

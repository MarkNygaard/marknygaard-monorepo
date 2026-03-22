import type { SanityAsset } from "@sanity/image-url"
import { cn } from "@workspace/common/cn"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@workspace/ui/dialog"
import { Typography } from "@workspace/ui/typography"
import type { PortableTextComponentProps, PortableTextProps } from "next-sanity"
import { PortableText } from "next-sanity"
import type { Language } from "prism-react-renderer"
import { SanityImage } from "@/components/SanityImage/SanityImage"
import SyntaxHighlight from "./SyntaxHighlight"

interface SanityImageValue extends SanityAsset {
  alt?: string
}

interface SanityCodeValue {
  code: string
  language: string
  filename?: string
  highlightedLines?: number[]
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
            link: ({ children, value }) => (
              <a
                href={value?.href}
                className="underline"
                {...(value?.blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {children}
              </a>
            ),
          },
          block: {
            normal: ({ children }) => <p className="mb-4 font-light last:mb-0">{children}</p>,
            h1: ({ children }) => (
              <Typography variant="heading-xlarge" className="mb-2" asChild>
                <h1>{children}</h1>
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="heading-large" className="mb-2" asChild>
                <h2>{children}</h2>
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="heading" className="mb-2" asChild>
                <h3>{children}</h3>
              </Typography>
            ),
            h4: ({ children }) => (
              <Typography variant="heading" className="mb-2" asChild>
                <h4>{children}</h4>
              </Typography>
            ),
            h5: ({ children }) => (
              <Typography variant="heading" className="mb-2" asChild>
                <h5>{children}</h5>
              </Typography>
            ),
            h6: ({ children }) => (
              <Typography variant="heading" className="mb-2" asChild>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="my-6 cursor-pointer">
                      <SanityImage
                        image={value}
                        alt={value.alt || ""}
                        className="h-auto w-full rounded-lg"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className="w-fit border-none bg-transparent p-0 shadow-none sm:max-w-fit"
                    style={{ maxWidth: "90vw" }}
                    showCloseButton={false}
                  >
                    <DialogClose>
                      <SanityImage
                        image={value}
                        alt={value.alt || ""}
                        className="h-auto rounded-lg"
                        style={{ maxHeight: "85vh", maxWidth: "90vw" }}
                        sizes="90vw"
                      />
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              )
            },
            code: ({ value }: PortableTextComponentProps<SanityCodeValue>) => {
              if (!value?.code) return null

              return (
                <div className="my-6">
                  <SyntaxHighlight
                    code={value.code}
                    language={value.language as Language}
                    highlightLines={value.highlightedLines}
                    showLineNumbers={value.code.split(/\r\n|\r|\n/).length > 10}
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

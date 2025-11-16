import { SanityImage } from "@/components/SanityImage"
import type { LAYOUT_QUERYResult } from "@/types/sanity"
import FooterEmojiAnimation from "./FooterEmojiAnimation"

type FooterProps = Partial<
  Pick<NonNullable<LAYOUT_QUERYResult["footer"]>, "links" | "copyrightText">
>

export function Footer({ links, copyrightText }: FooterProps) {
  console.log(copyrightText)
  return (
    <footer className="container mx-auto md:mb-10">
      <div className="container mx-auto flex flex-col items-center space-y-4 bg-primary/80 pt-12 pb-10 font-extralight md:max-w-6xl md:rounded-sm dark:border dark:border-border/50 dark:bg-muted/80">
        <ul className="p-4">
          <FooterEmojiAnimation />
        </ul>
        <ul className="flex p-4">
          {links?.map((link) => {
            if (!link.externalLink || !link.logo) return null

            return (
              <li key={link._key} className="mx-2">
                <a
                  href={link.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-all duration-300 ease-out hover:text-primary-foreground hover:ease-in dark:text-secondary-foreground/50 dark:hover:text-secondary-foreground"
                >
                  <SanityImage image={link.logo} width={24} height={24} />
                </a>
              </li>
            )
          })}
        </ul>
        <ul>
          <li>{copyrightText?.replace("{year}", `${new Date().getFullYear()}`)}</li>
        </ul>
      </div>
    </footer>
  )
}

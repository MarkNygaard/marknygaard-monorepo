import { cn } from "@workspace/common/cn"
import { Typography } from "@workspace/ui/components/typography"
import Link from "next/link"
import type { PagebuilderType } from "@/features/page-builder/types/pagebuilder"
import { SanityImage } from "../SanityImage"

type FeaturedPostsBlockProps = PagebuilderType<"featuredPostsBlock">

export function FeaturedPostsBlock({ title, posts, fadeIn, fadeInDelay }: FeaturedPostsBlockProps) {
  return (
    <div
      className={cn("py-4 pt-10", fadeIn && "animate-fade-in-up opacity-0")}
      style={fadeInDelay ? { animationDelay: `${fadeInDelay}s` } : undefined}
    >
      <div className="mb-6 font-medium text-3xl">{title}</div>

      <div className="mb-4 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-10">
        {posts?.map((post) => (
          <Link
            key={post._id}
            href={post.slug.current}
            className="mx-auto h-full w-fit pb-2 md:pb-0"
          >
            <div className="hover:-translate-y-1 h-full w-full rounded-xl transition-all duration-200 ease-in-out hover:shadow-md">
              <div className="translate-z-0 flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-border bg-secondary dark:bg-muted/90">
                <SanityImage image={post.coverImage} aspectRatio="cinema" />
                <Typography variant="body-large" className="p-4">
                  {post.title}
                </Typography>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="w-40">
        <Link href="/blog/">
          <div className="hover:-translate-y-0.5 rounded-md border-[1px] border-border p-3 text-muted-foreground/80 transition-all duration-200 ease-in-out hover:border-gray-300 hover:text-gray-700 hover:shadow-md dark:border-gray-700 dark:text-gray-500 dark:hover:border-gray-600 dark:hover:text-gray-300">
            Read all posts -&gt;
          </div>
        </Link>
      </div>
    </div>
  )
}

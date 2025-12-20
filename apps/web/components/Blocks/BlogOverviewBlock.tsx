import { format } from "date-fns"
import NextLink from "next/link"
import type { ALL_POSTS_QUERY_RESULT } from "@/types/sanity"
import CardSpotlight from "../Elements/CardSpotlight"
import { SanityImage } from "../SanityImage"

interface BlogOverviewBlockProps {
  posts?: ALL_POSTS_QUERY_RESULT
  index?: number
}

export function BlogOverviewBlock({ posts }: BlogOverviewBlockProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="mx-auto max-w-5xl py-8 text-center text-muted-foreground">
        No blog posts found
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      {posts.map((post) => (
        <NextLink key={post._id} href={post.slug.current}>
          <CardSpotlight>
            <div className="col-span-2 hidden w-full overflow-hidden sm:flex">
              {post.coverImage && <SanityImage image={post.coverImage} aspectRatio="cinema" />}
            </div>
            <div className="col-span-5 p-2 font-medium text-primary-foreground sm:col-span-3 dark:text-secondary-foreground">
              <div className="flex h-full flex-col space-y-2 p-4">
                <div className="font-semibold text-xl">{post.title}</div>
                <div className="grow font-normal text-sm">{post.excerpt}</div>
                <div className="font-light text-primary-foreground/50 text-xs dark:text-secondary-foreground/40">
                  {post.publishedAt && format(new Date(post.publishedAt), "MMMM do, yyyy")}
                </div>
              </div>
            </div>
          </CardSpotlight>
        </NextLink>
      ))}
    </div>
  )
}

import { format } from "date-fns"
import { Section } from "@/components/Blocks/Section/Section"
import SectionMenu from "@/components/Blocks/Section/SectionMenu"
import { Comment } from "@/components/Comment"
import { SanityImage } from "@/components/SanityImage"
import { sanityFetch } from "@/lib/sanity/live"
import { POST_QUERY } from "@/lib/sanity/queries"

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params

  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug: `blog/${slug}` },
  })

  return (
    <article>
      <div className="pb-4 sm:grid sm:grid-cols-3 sm:grid-rows-1 sm:gap-2">
        <div className="flex flex-col justify-between border border-border bg-primary p-5 font-light text-2xl md:text-3xl lg:text-4xl dark:bg-card">
          <div>{post?.title}</div>
          <div>
            <div className="text-primary-foreground/60 text-sm dark:text-secondary-foreground/40">
              {post?.publishedAt ? format(new Date(post.publishedAt), "MMMM do, yyyy") : ""}
            </div>
          </div>
        </div>
        <div className="relative flex border-[1px] border-border sm:col-span-2 dark:border">
          {post?.coverImage && <SanityImage image={post.coverImage} aspectRatio="cover" />}
        </div>
      </div>
      <div className="flex">
        <div className="w-full md:w-9/12 md:pr-3">
          {post?.pageBuilder?.map((section) => (
            <Section key={section._key} section={section} />
          ))}
          <Comment />
        </div>
        <aside className="hidden w-3/12 lg:block">
          <div className="sticky top-24 space-y-2">
            <div className="py-5 pl-2 text-xl">
              <div className="my-1 pt-2 font-semibold">Table of Contents</div>
              <SectionMenu post={post} />
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}

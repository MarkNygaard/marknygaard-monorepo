import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageBuilder } from "@/features/page-builder/components/PageBuilder"
import { sanityFetch } from "@/lib/sanity/live"
import { PAGE_QUERY } from "@/lib/sanity/queries"
import { formatMetaDataFromSanity } from "@/lib/seo/seo"

export const dynamic = "force-static"

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  })

  if (!page) return notFound()

  return await formatMetaDataFromSanity({
    data: page.seo,
    slug: page.slug.current,
    title: page.title,
  })
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  const { slug } = await params

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  })

  if (!page) notFound()

  return (
    <PageBuilder
      blocks={Array.isArray(page.pageBuilder) ? page.pageBuilder : []}
      documentId={page._id}
      documentType={page._type}
      posts={page.posts}
    />
  )
}

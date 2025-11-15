// import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageBuilder } from "@/features/page-builder/components/PageBuilder"
import { sanityFetch } from "@/lib/sanity/live"
import { HOMEPAGE_QUERY } from "@/lib/sanity/queries"
// import { formatMetaDataFromSanity } from "@/lib/seo/seo"

// export async function generateMetadata(): Promise<Metadata> {
//   const { data: page } = await sanityFetch({
//     query: HOMEPAGE_QUERY,
//   })

//   if (!page) return notFound()
//   return await formatMetaDataFromSanity({
//     data: page.seo,
//     slug: "/",
//     title: page.title,
//   })
// }

export default async function Page() {
  const { data: page } = await sanityFetch({
    query: HOMEPAGE_QUERY,
  })

  if (!page) notFound()

  return (
    <PageBuilder
      blocks={Array.isArray(page.pageBuilder) ? page.pageBuilder : []}
      documentId={page._id}
      documentType={page._type}
    />
  )
}

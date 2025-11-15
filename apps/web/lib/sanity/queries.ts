import { defineQuery } from "next-sanity"

const imageFragment = /* groq */ `
  asset-> {
    _id,
    url,
    altText,
    metadata {
      lqip,
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  "alt": coalesce(alt, ""),
  crop,
  hotspot
`

const seoFragment = /* groq */ `
  seo {
    _type,
    seoTitle,
    seoDescription,
    seoImage {
      asset-> {
        _id,
        url,
        altText,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt,
      crop,
      hotspot
    },
    seoIndexing,
    seoListVisibility
  }
`

const ogFragment = /* groq */ `
  og {
    ogTitle,
    ogDescription
  }
`

const richTextFragment = /* groq */ `
  ...,
  _type == "image" => {
    ${imageFragment}
  },
  markDefs[] {
    ...,
  }
`

const richTextBlock = /* groq */ `
  _type,
  _key,
  content[]{ ${richTextFragment} },
  blockTitle,
`

const pageBuilderFragment = /* groq */ `
  pageBuilder[]{
    _type == "richTextBlock" => {
      ${richTextBlock}
    }
  }
`

export const HOMEPAGE_QUERY = defineQuery(`
*[_type == "homePage"][0] {
  _id,
  _type,
  title,
  ${pageBuilderFragment},
  ${seoFragment},
  ${ogFragment},
  _createdAt,
  _updatedAt
}
`)

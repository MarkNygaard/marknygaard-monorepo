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

const linkFragment = /* groq */ `
  _type,
  _key,
  name,
  linkType,
  "openInNewTab": coalesce(openInNewTab, false),
  internalLink-> {
    _id,
    _type,
    title,
    slug {
      _type,
      current
    }
  },
  "externalLink": coalesce(externalLink, "")
`

const socialLinkFragment = /* groq */ `
  _key,
  logo {
    ${imageFragment}
  },
  externalLink
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

export const PAGE_QUERY = defineQuery(`
  *[_type == "page"][0] {
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

export const LAYOUT_QUERY = defineQuery(`
  {
    "header": *[_type == "header"][0] {
      _id,
      logo {
        ${imageFragment}
      },
      links[] {
        ${linkFragment}
      }
    },
    "footer": *[_type == "footer"][0] {
      _id,
      links[] {
        ${socialLinkFragment}
      },
      copyrightText
    }
  }
`)

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
  _type == "code" => {
    _key,
    _type,
    code,
    language,
    filename,
    highlightedLines
  },
  markDefs[] {
    ...,
  }
`

const richTextBlock = /* groq */ `
  _type,
  _key,
  content[]{ ${richTextFragment} },
  width,
  fadeIn,
  fadeInDelay,
`

const sectionBlock = /* groq */ `
  _type,
  _key,
  name,
  content[]{ ${richTextFragment} },
  sections[]{
    _type,
    _key,
    name,
    content[]{ ${richTextFragment} },
    sections[]{
      _type,
      _key,
      name,
      content[]{ ${richTextFragment} },
      sections[]{
        _type,
        _key,
        name,
        content[]{ ${richTextFragment} }
      }
    }
  }
`

const blogOverviewBlock = /* groq */ `
  _type,
  _key,
  title
`

const textImageBlock = /* groq */ `
  _type,
  _key,
  title,
  content[]{ ${richTextFragment} },
  image {
    ${imageFragment}
  },
  imagePosition,
  blockTitle,
`

const featuredPostsBlock = /* groq */ `
  _type,
  _key,
  title,
  posts[]-> {
    _id,
    title,
    slug {
      current
    },
    coverImage {
      ${imageFragment}
    },
    excerpt,
    author-> {
      _id,
      name,
      picture {
        ${imageFragment}
      }
    },
    publishedAt
  },
  fadeIn,
  fadeInDelay,
`

const postFragment = /* groq */ `
  _id,
  title,
  slug {
    current
  },
  coverImage {
    ${imageFragment}
  },
  excerpt,
  author-> {
    _id,
    name,
    picture {
      ${imageFragment}
    }
  },
  publishedAt
`

const pageBuilderFragment = /* groq */ `
  pageBuilder[]{
    _type == "richTextBlock" => {
      ${richTextBlock}
    },
    _type == "blogOverviewBlock" => {
      ${blogOverviewBlock}
    },
    _type == "textImageBlock" => {
      ${textImageBlock}
    },
    _type == "featuredPostsBlock" => {
      ${featuredPostsBlock}
    }
  }
`

const postPageBuilderFragment = /* groq */ `
  pageBuilder[]{
    _type == "sectionBlock" => {
      ${sectionBlock}
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
  svgIcon,
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
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug {
      _type,
      current
    },
    ${pageBuilderFragment},
    ${seoFragment},
    ${ogFragment},
    _createdAt,
    _updatedAt,
    "posts": select(
      count(pageBuilder[_type == "blogOverviewBlock"]) > 0 => *[_type == "post"] | order(publishedAt desc) {
        ${postFragment}
      }
    )
  }
`)

export const LAYOUT_QUERY = defineQuery(`
  {
    "header": *[_type == "header"][0] {
      _id,
      logo,
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

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug {
      _type,
      current
    },
    coverImage {
      ${imageFragment}
    },
    excerpt,
    author-> {
      _id,
      name,
      picture {
        ${imageFragment}
      }
    },
    publishedAt,
    ${postPageBuilderFragment},
    ${seoFragment},
    ${ogFragment},
    _createdAt,
    _updatedAt
  }
`)

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug {
      current
    },
    coverImage {
      ${imageFragment}
    },
    excerpt,
    author-> {
      _id,
      name,
      picture {
        ${imageFragment}
      }
    },
    publishedAt
  }
`)

export const GLOBAL_SEO_QUERY = defineQuery(`*[
  _type == "globalSeo"
][0] {
  _id,
  title,
  domain,
  code,
  seoIndexing,
  seoSuffix
}`)

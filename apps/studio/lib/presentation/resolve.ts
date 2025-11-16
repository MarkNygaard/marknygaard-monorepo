import { defineDocuments, defineLocations } from "sanity/presentation"

// Configures the "Used on x pages" banner
export const locations = {
  // Map document types to frontend routes
  homePage: defineLocations({
    select: {
      title: "title",
    },
    resolve: (doc) => {
      if (!doc) return { locations: [] }

      return {
        locations: [
          {
            title: doc.title || "Home Page",
            href: "/",
          },
        ],
      }
    },
  }),
  page: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => {
      if (!doc?.slug) return { locations: [] }

      return {
        locations: [
          {
            title: doc.title || "Untitled Page",
            href: `/${doc.slug}`,
          },
        ],
      }
    },
  }),
  post: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => {
      if (!doc?.slug) return { locations: [] }

      return {
        locations: [
          {
            title: doc.title || "Untitled Page",
            href: `/${doc.slug}`,
          },
        ],
      }
    },
  }),
}

// Configures documents presentation tool should open by default when navigating to an URL
export const mainDocuments = defineDocuments([
  {
    route: "/:slug",
    filter: "_type == 'page' | _type == 'post' && slug.current == $slug",
  },
  {
    route: "/",
    filter: '_type == "homePage"',
  },
])

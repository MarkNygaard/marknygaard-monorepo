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
}

// Configures documents presentation tool should open by default when navigating to an URL
export const mainDocuments = defineDocuments([
  {
    route: "/",
    filter: '_type == "homePage"',
  },
])

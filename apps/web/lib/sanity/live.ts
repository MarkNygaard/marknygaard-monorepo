import { defineLive } from "next-sanity/live"
import { client } from "./client"
import { token } from "./token"

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Live content is currently only available on the experimental API
    // https://www.sanity.io/docs/api-versioning
    apiVersion: "vX",
  }),
  serverToken: token,
  browserToken: token,
})

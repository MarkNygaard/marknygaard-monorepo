import { author } from "./author"
import { footer } from "./footer"
import { header } from "./header"
import { homePage } from "./homePage"
import { page } from "./page"
import { post } from "./post"

export const singletons = [homePage, header, footer]

export const documents = [page, post, author, ...singletons]

import { author } from "./author"
import { chatbotSettings } from "./chatbotSettings"
import { footer } from "./footer"
import { globalSeo } from "./globalSeo"
import { header } from "./header"
import { homePage } from "./homePage"
import { page } from "./page"
import { post } from "./post"

export const singletons = [homePage, header, footer, globalSeo, chatbotSettings]

export const documents = [page, post, author, ...singletons]

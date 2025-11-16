import { footer } from "./footer";
import { header } from "./header";
import { homePage } from "./homePage";
import { page } from "./page";


export const singletons = [homePage, header, footer];

export const documents = [
  page,
	...singletons,
];

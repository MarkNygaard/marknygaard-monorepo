import { homePage } from "./homePage";
import { page } from "./page";


export const singletons = [homePage];

export const documents = [
  page,
	...singletons,
];

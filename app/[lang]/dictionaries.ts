// dictionaries.ts
import "server-only";

// Exporting Dictionary type for reuse in other files
export type Dictionary = {
  [key: string]: string;
};

type DictionaryLoader = () => Promise<Dictionary>;

type Dictionaries = {
  [key: string]: DictionaryLoader;
};

const dictionaries: Dictionaries = {
  mn: () => import("./dictionaries/mn.json").then((module) => module.default as unknown as Dictionary),
  en: () => import("./dictionaries/en.json").then((module) => module.default as unknown as Dictionary),
};

// Export the function to get the dictionary based on locale
export const getDictionary = async (locale: string) => {
  const dictionaryLoader = dictionaries[locale];
  if (dictionaryLoader) {
    return dictionaryLoader();
  }
  throw new Error(`Dictionary for locale "${locale}" not found.`);
};

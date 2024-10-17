import "server-only";

type Dictionary = {
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

export const getDictionary = async (locale: string) => {
  const dictionaryLoader = dictionaries[locale];
  if (dictionaryLoader) {
    return dictionaryLoader();
  }
  throw new Error(`Dictionary for locale "${locale}" not found.`);
};

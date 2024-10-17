import "server-only";

type DictionaryLoader = () => Promise<any>; // You can specify a more specific type if you know the structure of your JSON
type Dictionaries = {
  [key: string]: DictionaryLoader;
};

const dictionaries: Dictionaries = {
  mn: () => import("./dictionaries/mn.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const dictionaryLoader = dictionaries[locale];
  if (dictionaryLoader) {
    return dictionaryLoader();
  }
  throw new Error(`Dictionary for locale "${locale}" not found.`);
};

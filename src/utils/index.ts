import { camelCase } from 'camel-case';
import { NestedObj } from '../types';
import { type TransformedToken } from 'style-dictionary';

export const RAW_TOKENS_BASE_FOLDER = 'raw-tokens/data';

export const RAW_SOURCE_FOLDER = `${RAW_TOKENS_BASE_FOLDER}/**/*.json`;
export const RAW_CORE_SOURCE_FOLDER = `${RAW_TOKENS_BASE_FOLDER}/core/**/*.json`;
export const BASE_VARIANT_SOURCE_INCLUDES = [
  `${RAW_TOKENS_BASE_FOLDER}/semantic/viewPort/mobile.json`,
  `${RAW_TOKENS_BASE_FOLDER}/semantic/color/light.json`,
];
export const QUILL_TAILWIND_BUILD_PATH = 'dist/quill-tailwind/';

export const makeNestedObject = <T extends readonly string[]>(
  obj: NestedObj<{ [key: string]: any }>,
  keys: T,
  value: string,
): void => {
  const lastIndex = keys.length - 1;
  for (let i = 0; i < lastIndex; ++i) {
    const key = camelCase(keys[i]);
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }

  // https://v2.tailwindcss.com/docs/upgrading-to-v2#update-default-theme-keys-to-default
  if (keys[lastIndex] === 'DEFAULT') {
    obj[keys[lastIndex]] = value;
  } else {
    obj[camelCase(keys[lastIndex])] = value;
  }
};

export const getCleanTokenPath = (tokenItem: TransformedToken, excludes: string[]) => {
  const cleanPath = tokenItem.path.filter((el) => !excludes.includes(el));
  return cleanPath;
};

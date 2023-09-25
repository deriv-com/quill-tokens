import { Format, Formatter, Named, TransformedToken } from 'style-dictionary';
import { QuillTokenType } from '../types';
import fs from 'fs';
import { template as LodashTemplate } from 'lodash';
import * as prettier from '@prettier/sync';

const tokenMap: Map<QuillTokenType, TransformedToken[]> = new Map([]);

const tokenNamesTemplateFile = fs.readFileSync('src/templates/token-names.template').toString();
const tokenNamesTemplate = LodashTemplate(tokenNamesTemplateFile);

const formatter: Formatter = ({ dictionary }) => {
  dictionary.allTokens.forEach((token) => {
    const tokenType = token.type as QuillTokenType;
    const currentTokens = tokenMap.get(tokenType) || [];
    tokenMap.set(tokenType, [...currentTokens, token]);
  });

  const tokenMapKeys = Array.from(tokenMap.keys());

  const finalNamesObject = {};

  tokenMapKeys.forEach((keyItem) => {
    const tempNames = [];
    const keyItemTokens = tokenMap.get(keyItem);

    keyItemTokens.forEach((keyItemTokensItem) => {
      if (keyItemTokensItem.attributes.tokenPath) {
        tempNames.push(keyItemTokensItem.attributes.tokenPath.join('-'));
      }
    });

    if (tempNames.length > 0) {
      finalNamesObject[keyItem] = tempNames;
    }
  });

  finalNamesObject['fontFamilies'] = ['heading', 'sans', 'mono', 'serif'];

  const result = tokenNamesTemplate({
    names: JSON.stringify(finalNamesObject, null, 2),
  });

  return prettier.format(result, {
    parser: 'typescript',
  });
};

export const TokenNamesFormatter: Named<Format> = {
  name: 'deriv/token-names',
  formatter: formatter,
};

import { Format, Formatter, Named, TransformedToken } from 'style-dictionary';
import { QuillTokenType } from '../types';
import { template as LodashTemplate } from 'lodash';
import * as prettier from '@prettier/sync';
import { makeNestedObject } from '../utils';
import * as fs from 'fs';

const tailwindCjsTemplateFile = fs.readFileSync('src/templates/tailwind.cjs.template').toString();
const tailwindEsmTemplateFile = fs.readFileSync('src/templates/tailwind.esm.template').toString();

const tailwindCjsTemplate = LodashTemplate(tailwindCjsTemplateFile);
const tailwindEsmTemplate = LodashTemplate(tailwindEsmTemplateFile);

const tokenMap: Map<QuillTokenType, TransformedToken[]> = new Map([]);

const getTokens = (tokenType: QuillTokenType): TransformedToken[] => {
  return tokenMap.get(tokenType) || [];
};

const formatTokenByTokenPath = (tokens: TransformedToken[]) => {
  const allTokenObj = tokens.reduce<Record<string, string>>((acc, cur) => {
    acc[cur?.attributes?.tokenPath.join('-')] = cur.value;
    return acc;
  }, {});

  return JSON.stringify(allTokenObj, null, 2);
};

const formatObjectTokens = (tokens: TransformedToken[]) => {
  const allTokenObj = tokens.reduce<Record<string, string>>((acc, cur) => {
    acc[cur?.attributes?.tokenPath.join('.')] = cur.value;
    return acc;
  }, {});

  const result = {};
  Object.keys(allTokenObj).forEach((key) => {
    const keys = key.split('.');
    makeNestedObject(result, keys, allTokenObj[key]);
  });

  return JSON.stringify(result, null, 2);
};

const Esmformatter: Formatter = ({ dictionary, options }) => {
  const shouldUseCoreVariables = options?.useCoreVariables || false;
  dictionary.allTokens.forEach((token) => {
    if (token.path.includes('semantic') || shouldUseCoreVariables) {
      token['value'] = `var(--${token.name})`;
    }
  });

  dictionary.allTokens.forEach((token) => {
    const tokenType = token.type as QuillTokenType;
    const currentTokens = tokenMap.get(tokenType) || [];
    tokenMap.set(tokenType, [...currentTokens, token]);
  });

  const colorTokens = formatObjectTokens(getTokens('color'));

  const fontFamilyTokens = formatTokenByTokenPath(getTokens('fontFamilies'));

  const spacingTokens = formatTokenByTokenPath([...getTokens('spacing'), ...getTokens('paragraphSpacing')]);

  const borderRadiusTokens = formatTokenByTokenPath(getTokens('borderRadius'));

  const borderWidthTokens = formatTokenByTokenPath(getTokens('borderWidth'));

  const boxShadowTokens = formatTokenByTokenPath(getTokens('boxShadow'));

  const opacityTokens = formatTokenByTokenPath(getTokens('opacity'));

  const fontSizeTokens = formatTokenByTokenPath(getTokens('fontSizes'));

  const fontWeightTokens = formatTokenByTokenPath(getTokens('fontWeights'));

  const lineHeightTokens = formatTokenByTokenPath(getTokens('lineHeights'));

  const result = tailwindEsmTemplate({
    colors: colorTokens,
    fontFamily: fontFamilyTokens,
    spacing: spacingTokens,
    borderRadius: borderRadiusTokens,
    borderWidth: borderWidthTokens,
    boxShadow: boxShadowTokens,
    opacity: opacityTokens,
    fontSize: fontSizeTokens,
    fontWeight: fontWeightTokens,
    lineHeight: lineHeightTokens,
    darkMode: 'class',
  });

  return prettier.format(result, {
    parser: 'typescript',
  });
};

const Cjsformatter: Formatter = ({ dictionary, options }) => {
  const shouldUseCoreVariables = options?.useCoreVariables || false;
  dictionary.allTokens.forEach((token) => {
    if (token.path.includes('semantic') || shouldUseCoreVariables) {
      token['value'] = `var(--${token.name})`;
    }
  });

  dictionary.allTokens.forEach((token) => {
    const tokenType = token.type as QuillTokenType;
    const currentTokens = tokenMap.get(tokenType) || [];
    tokenMap.set(tokenType, [...currentTokens, token]);
  });

  const colorTokens = formatObjectTokens(getTokens('color'));

  const spacingTokens = formatTokenByTokenPath([...getTokens('spacing'), ...getTokens('paragraphSpacing')]);

  const borderRadiusTokens = formatTokenByTokenPath(getTokens('borderRadius'));

  const borderWidthTokens = formatTokenByTokenPath(getTokens('borderWidth'));

  const boxShadowTokens = formatTokenByTokenPath(getTokens('boxShadow'));

  const opacityTokens = formatTokenByTokenPath(getTokens('opacity'));

  const fontSizeTokens = formatTokenByTokenPath(getTokens('fontSizes'));

  const fontWeightTokens = formatTokenByTokenPath(getTokens('fontWeights'));

  const lineHeightTokens = formatTokenByTokenPath(getTokens('lineHeights'));

  const result = tailwindCjsTemplate({
    colors: colorTokens,
    spacing: spacingTokens,
    borderRadius: borderRadiusTokens,
    borderWidth: borderWidthTokens,
    boxShadow: boxShadowTokens,
    opacity: opacityTokens,
    fontSize: fontSizeTokens,
    fontWeight: fontWeightTokens,
    lineHeight: lineHeightTokens,
    darkMode: 'class',
  });

  return prettier.format(result, {
    parser: 'typescript',
  });
};

export const TailwindCjsFormatter: Named<Format> = {
  name: 'deriv/tailwind-cjs-formatter',
  formatter: Cjsformatter,
};
export const TailwindEsmFormatter: Named<Format> = {
  name: 'deriv/tailwind-esm-formatter',
  formatter: Esmformatter,
};

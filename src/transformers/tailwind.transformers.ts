import { Named, Transform, TransformGroup } from 'style-dictionary';
import { QuillTokenType } from '../types';
import { getCleanTokenPath } from '../utils';

export const stringValueTransformer: Named<Transform> = {
  name: 'deriv/tw/string-value',
  type: 'value',
  transformer: (token) => {
    if (typeof token.value !== 'string') {
      return String(token.value);
    }
    return token.value;
  },
};

export const paragraphSpacingTransformer: Named<Transform> = {
  name: 'deriv/paragraph-spacing',
  type: 'value',
  matcher: (token) => token.type === 'paragraphSpacing' || token.type === 'lineHeights',
  transformer: (token) => {
    if (token.type === 'lineHeights' && token.value === 'auto') {
      return 'normal';
    }
    if (typeof token.value === 'string') {
      return token.value;
    }
    return `${token.value}px`;
  },
};

export const spacingNameTransformer: Named<Transform> = {
  name: 'deriv/spacing-name',
  type: 'name',
  matcher: (token) => token.type === 'spacing',
  transformer: (token) => token.path.join('-'),
};

export const mobileColorTransformer: Named<Transform> = {
  name: 'deriv/mobile-color',
  type: 'value',
  matcher:(token)=> token.type === 'color' && token.path.includes('semantic'),
  transformer: (token)=> String(token.value),
};

export const tokenPathTransformer: Named<Transform> = {
  name: 'deriv/token-path',
  type: 'attribute',
  transformer: (token) => {
    const tokenType = token.type as QuillTokenType;
    const attributes: {
      tokenPath?: Array<string>;
    } = {};

    const defaultIgnoreList = ['core', 'semantic'];
    switch (tokenType) {
      case 'spacing':
      case 'paragraphSpacing':
        attributes['tokenPath'] = getCleanTokenPath(token, ['spacing', ...defaultIgnoreList]);
        break;
      case 'borderRadius':
        attributes['tokenPath'] = getCleanTokenPath(token, ['borderRadius', ...defaultIgnoreList]);
        break;
      case 'borderWidth':
        attributes['tokenPath'] = getCleanTokenPath(token, ['borderWidth', ...defaultIgnoreList]);
        break;
      case 'boxShadow':
        attributes['tokenPath'] = getCleanTokenPath(token, ['elevation', 'shadow', ...defaultIgnoreList]);
        break;
      case 'fontSizes':
        attributes['tokenPath'] = getCleanTokenPath(token, ['fontSize', ...defaultIgnoreList]);
        break;
      case 'opacity':
        attributes['tokenPath'] = getCleanTokenPath(token, ['opacity', ...defaultIgnoreList]);
        break;
      case 'fontWeights':
        attributes['tokenPath'] = getCleanTokenPath(token, ['fontWeight', ...defaultIgnoreList]);
        break;
      case 'lineHeights':
        attributes['tokenPath'] = getCleanTokenPath(token, ['lineHeight', ...defaultIgnoreList]);
        break;
      case 'color':
        attributes['tokenPath'] = getCleanTokenPath(token, ['color', ...defaultIgnoreList]);
        break;
      case 'fontFamilies':
        attributes['tokenPath'] = getCleanTokenPath(token, ['core', 'fontFamily', ...defaultIgnoreList]);
      default:
        break;
    }
    return attributes;
  },
};

export const tailwindTransforms = [
  'deriv/paragraph-spacing',
  'deriv/spacing-name',
  'deriv/token-path',
  'deriv/tw/string-value',
];

export const tailwindTransferGroup: Named<TransformGroup> = {
  name: 'deriv/tailwind-tokens',
  transforms: tailwindTransforms,
};

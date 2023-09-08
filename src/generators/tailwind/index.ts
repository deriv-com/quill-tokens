import StyleDictionary from 'style-dictionary';
import { registerTransforms, transforms as TokenStudioTransforms } from '@tokens-studio/sd-transforms';
import {
  BASE_VARIANT_SOURCE_INCLUDES,
  QUILL_TAILWIND_BUILD_PATH,
  RAW_CORE_SOURCE_FOLDER,
  RAW_TOKENS_BASE_FOLDER,
} from '../../utils';
import { TailwindCjsFormatter, TailwindEsmFormatter } from '../../formatters/tailwind.formatter';
import {
  paragraphSpacingTransformer,
  spacingNameTransformer,
  stringValueTransformer,
  tailwindTransforms,
  tokenPathTransformer,
} from '../../transformers/tailwind.transformers';
import { makeFontStylesAction, makeStylesAction } from '../../actions/tailwind.actions';
import { desktopTargetFormatter } from '../../formatters/desktop-target.formatter';

registerTransforms(StyleDictionary);

StyleDictionary.registerTransform(paragraphSpacingTransformer);
StyleDictionary.registerTransform(spacingNameTransformer);
StyleDictionary.registerTransform(tokenPathTransformer);
StyleDictionary.registerFormat(TailwindCjsFormatter);
StyleDictionary.registerFormat(TailwindEsmFormatter);
StyleDictionary.registerAction(makeStylesAction);
StyleDictionary.registerAction(makeFontStylesAction);
StyleDictionary.registerFormat(desktopTargetFormatter);
StyleDictionary.registerTransform(stringValueTransformer);

export const CoreSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER],
  platforms: {
    core_css: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: '_core.css',
          format: 'css/variables',
          options: {
            outputReferences: false,
          },
        },
      ],
    },
  },
});

export const SemanticLightSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/color/light.json`],
  platforms: {
    semantic_light: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: '_light.css',
          format: 'css/variables',
          filter: (token) => token.path.includes('semantic'),
          options: {
            selector: 'html',
            outputReferences: false,
          },
        },
      ],
    },
  },
});

export const SemanticDarkSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/color/dark.json`],
  platforms: {
    semantic_dark: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: '_dark.css',
          format: 'css/variables',
          filter: (token) => token.path.includes('semantic'),
          options: {
            selector: 'html.dark',
            outputReferences: false,
          },
        },
      ],
    },
  },
});

export const SemanticMobileSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/viewPort/mobile.json`],
  platforms: {
    semantic_mobile: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: '_mobile.css',
          format: 'css/variables',
          filter: (token) => token.path.includes('semantic') && token.type !== 'typography',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
      ],
    },
  },
});

export const SemanticDesktopSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/viewPort/desktop.json`],
  platforms: {
    semantic_desktop: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: '_desktop.css',
          format: 'css/target-desktop',
          filter: (token) => token.path.includes('semantic') && token.type !== 'typography',
          options: {
            outputReferences: false,
          },
        },
      ],
    },
  },
});

export const TailWindEsmSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER],
  include: [...BASE_VARIANT_SOURCE_INCLUDES],
  platforms: {
    tailwind: {
      actions: ['deriv/tw/make-style'],
      transforms: [...TokenStudioTransforms, ...tailwindTransforms, 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: 'tailwind.config.js',
          format: 'deriv/tailwind-esm-formatter',
          options: {
            useCoreVariables: false,
          },
        },
      ],
    },
  },
});

export const TailWindCjsSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER],
  include: [...BASE_VARIANT_SOURCE_INCLUDES],
  platforms: {
    tailwind: {
      actions: ['deriv/tw/make-style', 'deriv/tw/make-font-style'],
      transforms: [...TokenStudioTransforms, ...tailwindTransforms, 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: 'tailwind.config.cjs',
          format: 'deriv/tailwind-cjs-formatter',
          options: {
            useCoreVariables: false,
          },
        },
      ],
    },
  },
});

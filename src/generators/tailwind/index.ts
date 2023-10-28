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
import { TokenNamesFormatter } from '../../formatters/token-names.fomatter';

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
StyleDictionary.registerFormat(TokenNamesFormatter);

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
            showFileHeader: false,
          },
        },
      ],
    },
  },
});

export const SemanticLightSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/theme/light.json`],
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
            showFileHeader: false,
          },
        },
      ],
    },
  },
});

export const SemanticDarkSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/theme/dark.json`],
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
            showFileHeader: false,
          },
        },
      ],
    },
  },
});

export const SemanticMobileSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/viewPort/default.json`],
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
            showFileHeader: false,
          },
        },
      ],
    },
  },
});

export const SemanticSmSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/viewPort/640-plus.json`],
  platforms: {
    semantic_sm: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: '_sm.css',
          format: 'css/target-desktop',
          filter: (token) => token.path.includes('semantic') && token.type !== 'typography',
          options: {
            outputReferences: false,
            showFileHeader: false,
            viewPort: 640,
          },
        },
      ],
    },
  },
});

export const SemanticMdSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/viewPort/768-plus.json`],
  platforms: {
    semantic_md: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: '_tablet.css',
          format: 'css/target-desktop',
          filter: (token) => token.path.includes('semantic') && token.type !== 'typography',
          options: {
            outputReferences: false,
            showFileHeader: false,
            viewPort: 768,
          },
        },
      ],
    },
  },
});

export const SemanticLgSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/viewPort/1024-plus.json`],
  platforms: {
    semantic_lg: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: '_lg.css',
          format: 'css/target-desktop',
          filter: (token) => token.path.includes('semantic') && token.type !== 'typography',
          options: {
            outputReferences: false,
            showFileHeader: false,
            viewPort: 1024,
          },
        },
      ],
    },
  },
});

export const SemanticXlSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/viewPort/1280-plus.json`],
  platforms: {
    semantic_xl: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: '_laptop.css',
          format: 'css/target-desktop',
          filter: (token) => token.path.includes('semantic') && token.type !== 'typography',
          options: {
            outputReferences: false,
            showFileHeader: false,
            viewPort: 1280,
          },
        },
      ],
    },
  },
});

export const Semantic2xlSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/semantic/viewPort/1440-plus.json`],
  platforms: {
    semantic_2xl: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: '_desktop.css',
          format: 'css/target-desktop',
          filter: (token) => token.path.includes('semantic') && token.type !== 'typography',
          options: {
            outputReferences: false,
            showFileHeader: false,
            viewPort: 1440,
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

export const TokenNamesSdConfig = StyleDictionary.extend({
  source: [RAW_CORE_SOURCE_FOLDER],
  include: [...BASE_VARIANT_SOURCE_INCLUDES],
  platforms: {
    tailwind: {
      transforms: [...TokenStudioTransforms, ...tailwindTransforms, 'name/cti/kebab'],
      buildPath: QUILL_TAILWIND_BUILD_PATH,
      files: [
        {
          destination: 'token-names.ts',
          format: 'deriv/token-names',
          options: {
            useCoreVariables: false,
          },
        },
      ],
    },
  },
});

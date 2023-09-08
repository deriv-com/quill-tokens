import {
  CoreSdConfig,
  SemanticDarkSdConfig,
  SemanticDesktopSdConfig,
  SemanticLightSdConfig,
  SemanticMobileSdConfig,
  TailWindEsmSdConfig,
  TailWindCjsSdConfig,
} from './src/generators/tailwind';

// Build Tailwind theme configuration and needed CSS variables
CoreSdConfig.buildAllPlatforms();
SemanticDarkSdConfig.buildAllPlatforms();
SemanticMobileSdConfig.buildAllPlatforms();
SemanticDesktopSdConfig.buildAllPlatforms();
SemanticLightSdConfig.buildAllPlatforms();
TailWindEsmSdConfig.buildAllPlatforms();
TailWindCjsSdConfig.buildAllPlatforms();

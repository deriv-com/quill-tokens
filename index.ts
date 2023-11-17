import {
  CoreSdConfig,
  SemanticDarkSdConfig,
  SemanticDarkMobileConfig,
  SemanticLightSdConfig,
  SemanticLightMobileConfig,
  SemanticMobileSdConfig,
  SemanticSmSdConfig,
  SemanticMdSdConfig,
  SemanticLgSdConfig,
  SemanticXlSdConfig,
  Semantic2xlSdConfig,
  TailWindEsmSdConfig,
  TailWindCjsSdConfig,
  TokenNamesSdConfig,
} from './src/generators/tailwind';

// Build Tailwind theme configuration and needed CSS variables
CoreSdConfig.buildAllPlatforms();
TokenNamesSdConfig.buildAllPlatforms();
SemanticDarkSdConfig.buildAllPlatforms();
SemanticDarkMobileConfig.buildAllPlatforms();
SemanticMobileSdConfig.buildAllPlatforms();
SemanticSmSdConfig.buildAllPlatforms();
SemanticMdSdConfig.buildAllPlatforms();
SemanticLgSdConfig.buildAllPlatforms();
SemanticXlSdConfig.buildAllPlatforms();
Semantic2xlSdConfig.buildAllPlatforms();
SemanticLightSdConfig.buildAllPlatforms();
SemanticLightMobileConfig.buildAllPlatforms();
TailWindEsmSdConfig.buildAllPlatforms();
TailWindCjsSdConfig.buildAllPlatforms();

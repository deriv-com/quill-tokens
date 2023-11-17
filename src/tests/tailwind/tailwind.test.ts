import {
  CoreSdConfig,
  SemanticDarkSdConfig,
  SemanticLightSdConfig,
  SemanticMobileSdConfig,
  SemanticSmSdConfig,
  SemanticMdSdConfig,
  SemanticLgSdConfig,
  SemanticXlSdConfig,
  Semantic2xlSdConfig,
  TailWindCjsSdConfig,
  TailWindEsmSdConfig,
} from '../../generators/tailwind';

describe('Tailwind Exports', () => {
  it('Should generate Core CSS variables properly', () => {
    const sdExport = CoreSdConfig.exportPlatform('core_css');
    expect(sdExport).toMatchSnapshot();
  });
  it('Should generate Light Theme Semantic CSS variables properly', () => {
    const sdExport = SemanticLightSdConfig.exportPlatform('semantic_light');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate Mobile Dark Theme Semantic variables properly', () => {
    const sdExport = SemanticDarkSdConfig.exportPlatform('semantic_mobile_flutter_dark');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate Mobile Light Theme Semantic variables properly', () => {
    const sdExport = SemanticLightSdConfig.exportPlatform('semantic_mobile_flutter_light');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate Dark Theme Semantic CSS variables properly', () => {
    const sdExport = SemanticDarkSdConfig.exportPlatform('semantic_dark');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate Mobile Semantic CSS variables properly', () => {
    const sdExport = SemanticMobileSdConfig.exportPlatform('semantic_mobile');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate SM Semantic CSS variables properly', () => {
    const sdExport = SemanticSmSdConfig.exportPlatform('semantic_sm');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate MD Semantic CSS variables properly', () => {
    const sdExport = SemanticMdSdConfig.exportPlatform('semantic_md');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate LG Semantic CSS variables properly', () => {
    const sdExport = SemanticLgSdConfig.exportPlatform('semantic_lg');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate XL Semantic CSS variables properly', () => {
    const sdExport = SemanticXlSdConfig.exportPlatform('semantic_xl');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate 2XL Semantic CSS variables properly', () => {
    const sdExport = Semantic2xlSdConfig.exportPlatform('semantic_2xl');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate Tailwind Theme Config properly for esm', () => {
    const sdExport = TailWindEsmSdConfig.exportPlatform('tailwind');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate Tailwind Theme Config properly for cjs', () => {
    const sdExport = TailWindCjsSdConfig.exportPlatform('tailwind');
    expect(sdExport).toMatchSnapshot();
  });
});

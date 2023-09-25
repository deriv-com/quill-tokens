import { Format, Named, formatHelpers } from 'style-dictionary';

export const desktopTargetFormatter: Named<Format> = {
  name: 'css/target-desktop',
  formatter: function ({ dictionary, options }) {
    const { outputReferences, viewPort = 640 } = options;
    return (
      `@media screen and (min-width: ${viewPort}px) { :root {\n` +
      formatHelpers.formattedVariables({
        format: 'css',
        dictionary,
        outputReferences,
      }) +
      '\n}}\n'
    );
  },
};

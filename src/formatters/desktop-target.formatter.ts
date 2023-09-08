import { Format, Named, formatHelpers } from 'style-dictionary';

export const desktopTargetFormatter: Named<Format> = {
  name: 'css/target-desktop',
  formatter: function ({ dictionary, options }) {
    const { outputReferences } = options;
    return (
      `@media screen and (min-width: 600px) { :root {\n` +
      formatHelpers.formattedVariables({
        format: 'css',
        dictionary,
        outputReferences,
      }) +
      '\n}}\n'
    );
  },
};

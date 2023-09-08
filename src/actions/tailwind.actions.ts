import { Action, Named } from 'style-dictionary';
import * as fs from 'fs';
import { QUILL_TAILWIND_BUILD_PATH } from '../utils';

export const makeStylesAction: Named<Action> = {
  name: 'deriv/tw/make-style',
  do: (dictionary, config) => {
    const hasCore = config?.files?.[0]?.options?.useCoreVariables || false;
    const files = ['_dark.css', '_mobile.css', '_desktop.css', '_light.css'];
    let result = hasCore ? `@import "./_core.css";\n` : '';

    files.forEach((fileItem) => {
      result += `@import "./${fileItem}";\n`;
    });
    fs.writeFileSync(`${QUILL_TAILWIND_BUILD_PATH}styles.css`, result);
  },
  undo: () => {
    fs.unlinkSync(`${QUILL_TAILWIND_BUILD_PATH}styles.css`);
  },
};

export const makeFontStylesAction: Named<Action> = {
  name: 'deriv/tw/make-font-style',
  do: (dictionary, config) => {
    const hasCore = config?.files?.[0]?.options?.useCoreVariables || false;
    const fonts = [
      "@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,100;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Ubuntu:ital,wght@0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');",
      "@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,100;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Ubuntu:ital,wght@0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');",
      "@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,100;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Ubuntu:ital,wght@0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');",
    ];
    let result = hasCore ? `@import "./_core.css";\n` : '';

    fonts.forEach((fontItem) => {
      result += `${fontItem}\n`;
    });
    fs.writeFileSync(`${QUILL_TAILWIND_BUILD_PATH}fonts.css`, result);
  },
  undo: () => {
    fs.unlinkSync(`${QUILL_TAILWIND_BUILD_PATH}fonts.css`);
  },
};

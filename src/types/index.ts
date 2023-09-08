export type QuillTokenType =
  | 'borderRadius' // done
  | 'borderWidth' // done
  | 'boxShadow' // done
  | 'color' // done
  | 'opacity' // done
  | 'spacing' // done
  | 'fontSizes' // done
  | 'fontFamilies' // done
  | 'fontWeights' // done
  | 'lineHeights' // done
  | 'textDecoration' // should be removed we don't need this
  | 'paragraphSpacing'; // done

export type NestedObj<T extends Record<string, unknown>> = {
  [P in keyof T]: Record<P, NestedObj<T>> | T[P];
};

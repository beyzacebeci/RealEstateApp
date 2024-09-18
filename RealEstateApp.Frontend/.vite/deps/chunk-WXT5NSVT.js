import {
  useTheme_default
} from "./chunk-TXE4L52T.js";
import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_identifier
} from "./chunk-CLM2DI5I.js";
import {
  require_react
} from "./chunk-KL4SNAOQ.js";
import {
  __toESM
} from "./chunk-PLDDJCW6.js";

// node_modules/@mui/material/styles/useTheme.js
var React = __toESM(require_react());
init_defaultTheme();
init_identifier();
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}

export {
  useTheme
};
//# sourceMappingURL=chunk-WXT5NSVT.js.map

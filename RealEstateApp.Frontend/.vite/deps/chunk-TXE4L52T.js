import {
  ThemeContext,
  createTheme_default,
  init_createTheme,
  init_resolveProps,
  init_styled_engine,
  resolveProps
} from "./chunk-CLM2DI5I.js";
import {
  require_react
} from "./chunk-KL4SNAOQ.js";
import {
  __toESM
} from "./chunk-PLDDJCW6.js";

// node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
init_resolveProps();
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}

// node_modules/@mui/system/esm/useThemeWithoutDefault.js
var React = __toESM(require_react());
init_styled_engine();
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme(defaultTheme = null) {
  const contextTheme = React.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}
var useThemeWithoutDefault_default = useTheme;

// node_modules/@mui/system/esm/useTheme.js
init_createTheme();
var systemDefaultTheme = createTheme_default();
function useTheme2(defaultTheme = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme);
}
var useTheme_default = useTheme2;

// node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme,
  themeId
}) {
  let theme = useTheme_default(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}

export {
  getThemeProps,
  useThemeWithoutDefault_default,
  useTheme_default,
  useThemeProps
};
//# sourceMappingURL=chunk-TXE4L52T.js.map

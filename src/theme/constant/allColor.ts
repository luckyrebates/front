import { colors } from '@mui/material';

// 生成 _variables.scss 的 color 内容
export function consoleColors() {
  const strs: string[] = [];
  type Colors = keyof typeof colors;
  const colorKeys = Object.keys(colors) as Colors[];
  colorKeys.forEach((colorKey) => {
    const colorType = colors[colorKey];
    type ColorTypeSymbolKey = keyof typeof colorType;
    const colorValueSymbolKeys = Object.keys(colorType) as ColorTypeSymbolKey[];
    colorValueSymbolKeys.forEach((colorValueSymbolKey) => {
      const colorValue = colors[colorKey][colorValueSymbolKey];
      const str = `$${colorKey}${colorValueSymbolKey}: '${colorValue}';`;
      strs.push(str);
    });
  });
  console.log(strs.join(''));
}

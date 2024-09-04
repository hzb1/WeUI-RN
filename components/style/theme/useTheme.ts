import { ColorSchemeName, useColorScheme } from 'react-native';

import dark from '@/components/style/theme/dark';
import { ThemeKey } from '@/components/style/theme/index';
import light from '@/components/style/theme/light';

const useTheme = (colorScheme?: ColorSchemeName): Record<ThemeKey, string> => {
  const _colorScheme = useColorScheme();
  const color = colorScheme || _colorScheme;
  return color === 'dark' ? dark : light;
};

export default useTheme;

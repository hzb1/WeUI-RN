import { useContext } from 'react';
import { ColorSchemeName } from 'react-native';

import { ThemeContext } from '@/components/Contexts';
import dark from '@/components/style/theme/dark';
import { ThemeKey } from '@/components/style/theme/index';
import light from '@/components/style/theme/light';

const useTheme = (colorScheme?: ColorSchemeName): Record<ThemeKey, string> => {
  const { theme } = useContext(ThemeContext);
  return theme === 'dark' ? dark : light;
};

export default useTheme;

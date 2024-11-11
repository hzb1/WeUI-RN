import { ReactNode, useState } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeContext, ThemeContextType } from '@/components/Contexts';

const Provider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState<ThemeContextType>(colorScheme || 'light');

  return (
    <>
      <ThemeContext.Provider
        value={{
          theme,
          onChangeTheme: setTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export default Provider;

import { ReactNode, useState } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeContext, ThemeContextType } from '@/components/Contexts';
import { PortalProvider } from '@/components/Portal/PortalProvider';

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
        <PortalProvider>{children}</PortalProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default Provider;

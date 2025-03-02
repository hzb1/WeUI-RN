import { ReactNode, useCallback, useState } from 'react';
import { useColorScheme, StatusBar } from 'react-native';

import { ThemeContext, ThemeContextType } from '@/components/Contexts';
import { PortalProvider } from '@/components/Portal/PortalProvider';

const Provider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState<ThemeContextType>(colorScheme || 'light');

  const onChangeTheme = useCallback((theme: ThemeContextType) => {
    // 设置状态栏字体颜色
    if (theme === 'light') {
      StatusBar.setBarStyle('dark-content', true);
    } else {
      StatusBar.setBarStyle('light-content', true);
    }
    setTheme(theme);
  }, []);

  return (
    <>
      <ThemeContext.Provider
        value={{
          theme,
          onChangeTheme,
        }}
      >
        <PortalProvider>{children}</PortalProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default Provider;

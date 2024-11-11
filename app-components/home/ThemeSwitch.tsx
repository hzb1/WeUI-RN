import Icons from '@expo/vector-icons/MaterialIcons';
import { useContext } from 'react';
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from 'react-native';

import { ThemeContext } from '@/components/Contexts';

const ThemeSwitch = ({
  style,
  size = 24,
  color = '#000',
}: {
  style?: StyleProp<ViewStyle>;
  size?: number;
  color?: string;
}) => {
  const { theme, onChangeTheme } = useContext(ThemeContext);

  const themeIcon = theme === 'light' ? 'light-mode' : 'dark-mode';

  return (
    <Pressable
      onPress={() => onChangeTheme(theme === 'light' ? 'dark' : 'light')}
      style={[
        {
          padding: 6,
          backgroundColor: '#eee',
          borderRadius: 50,
        },
        style,
      ]}
    >
      <Icons name={themeIcon} size={size} color={color} />
    </Pressable>
  );
};

export default ThemeSwitch;

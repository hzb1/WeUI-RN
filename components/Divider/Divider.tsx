import { View, ViewStyle, StyleSheet } from 'react-native';

import useTheme from '@/components/style/theme/useTheme';

// 分割线
const Divider = ({ style }: { style?: ViewStyle }) => {
  const themeStyle = useTheme();
  return (
    <View
      style={[
        {
          width: '100%',
          height: 1,
          borderStyle: 'solid',
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: themeStyle['FG-3'],
        },
        style,
      ]}
    />
  );
};

export default Divider;

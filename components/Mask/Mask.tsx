import { ReactNode } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

const Mask = ({
  children,
  onPress,
  style,
}: {
  children?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

export default Mask;

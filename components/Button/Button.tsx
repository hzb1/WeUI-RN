import { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

type ButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  type?: 'primary' | 'default';
  loading?: boolean;
};

const Button = (props: ButtonProps) => {
  const { children, onPress, style, disabled, type } = props;
  return (
    <Button onPress={onPress} style={style} disabled={disabled}>
      {children}
    </Button>
  );
};

export default Button;

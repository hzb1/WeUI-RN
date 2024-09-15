import { PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface ButtonProps extends PressableProps {
  // 类型
  type?: 'primary' | 'default' | 'warn';
  // 大小
  size?: 'default' | 'medium' | 'mini';
  overlay?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
  // 样式
  style?: StyleProp<ViewStyle>;
  // 按下时的样式
  pressedStyle?: StyleProp<ViewStyle>;
}

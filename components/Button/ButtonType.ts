import type { ReactNode } from 'react';
import {
  PressableProps,
  StyleProp,
  TextProps,
  ViewProps,
  TextStyle,
  PressableStateCallbackType,
} from 'react-native';

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
  // 按钮样式
  // style?: ViewProps['style'];
  // 按下时的按钮样式
  // pressedStyle?: ViewProps['style'];
  // 文字样式
  textStyle?:
    | TextProps['style']
    | ((state: PressableStateCallbackType) => StyleProp<TextStyle>);
  // 按下时的文字样式
  pressedTextStyle?: TextProps['style'];
}

import { ReactNode, isValidElement, Children } from 'react';
import { Text, TextProps } from 'react-native';

export interface MaybeTextProps {
  children?: string | ReactNode;
  style?: TextProps['style'];
}

const MaybeText = ({ children, style }: MaybeTextProps) => {
  return Children.map(children, (child) => {
    // 处理字符串
    if (typeof child === 'string') {
      return <Text style={style}>{child}</Text>;
    }

    // 处理有效 React 元素
    if (isValidElement(child)) {
      return child;
    }

    // 处理其他类型（如数字、空值）
    return <Text style={style}>{String(child)}</Text>;
  });
};

export default MaybeText;

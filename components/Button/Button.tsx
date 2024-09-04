import React, { type ReactNode } from 'react';
import { Pressable, PressableProps, Text, TextStyle } from 'react-native';
import LoadingSpinner from '@/components/Button/LoadingSpinner';

export interface ButtonProps extends PressableProps {
  // 类型
  type?: 'primary' | 'default' | 'warn';
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
}

const Button = ({
  children,
  onPress,
  style,
  disabled = false,
  loading = false,
  type = 'default',
}: ButtonProps) => {
  // const { children, onPress, style, disabled, type } = props;

  const renderStyle: ButtonProps['style'] = {
    width: 184,
    marginHorizontal: 'auto',
    backgroundColor: '#07c160',
    // @ts-ignore
    justifyContent: 'center',
    alignItems: 'center',
    // padding: [12, 24],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
  };

  return (
    <Pressable onPress={onPress} disabled={disabled} style={renderStyle}>
      <RenderLoading loading={loading} />
      <RenderChildren children={children} />
    </Pressable>
  );
};

const RenderLoading = ({ loading }: { loading: boolean }): ReactNode => {
  if (loading) {
    return <LoadingSpinner />;
  }
  return null;
};

const RenderChildren = ({ children }: { children: ReactNode }): ReactNode => {
  if (typeof children === 'string') {
    const textStyle: TextStyle = {
      color: '#fff',
      fontSize: 16,
    };
    return <Text style={textStyle}>{children}</Text>;
  }
  return children;
};

export default Button;

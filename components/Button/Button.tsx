import React, { type ReactNode } from 'react';
import { Pressable, Text, TextStyle, ColorValue } from 'react-native';

import { ButtonProps } from '@/components/Button/ButtonType';
import LoadingSpinner from '@/components/Button/LoadingSpinner';
import useButtonStyle from '@/components/Button/useButtonStyle';

const Button = ({
  children,
  onPress,
  disabled = false,
  overlay = false,
  loading = false,
  type = 'default',
  size = 'default',
  style,
  pressedStyle,
}: ButtonProps) => {
  // const { children, onPress, style, disabled, type } = props;
  // renderStyle, activeStyle
  const { buttonStyle, activeStyle, textStyle, android_ripple } =
    useButtonStyle({
      type,
      disabled,
      loading,
      style,
      pressedStyle,
      size,
      overlay,
    });

  const onStyle = ({ pressed }: { pressed: boolean }) => {
    if (pressed) {
      return [activeStyle, style];
    }
    return [buttonStyle, style];
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={onStyle}
      android_ripple={android_ripple}
    >
      {({ pressed }) => (
        <>
          <RenderLoading
            loading={loading}
            pressed={pressed}
            color={textStyle.color}
          />
          <RenderChildren pressed={pressed} textStyle={textStyle}>
            {children}
          </RenderChildren>
        </>
      )}
    </Pressable>
  );
};

const RenderLoading = ({
  loading,
  pressed,
  color,
}: {
  loading: boolean;
  pressed: boolean;
  color?: ColorValue;
}): ReactNode => {
  if (loading) {
    return <LoadingSpinner color={color} />;
  }
  return null;
};

const RenderChildren = ({
  children,
  textStyle,
}: {
  children: ReactNode;
  pressed: boolean;
  textStyle: TextStyle;
}): ReactNode => {
  if (React.isValidElement(children)) {
    return children;
  }
  return <Text style={textStyle}>{children}</Text>;
};

export default Button;

import React, { type ReactNode } from 'react';
import { Pressable, Text, TextStyle, ColorValue } from 'react-native';

import { ButtonProps } from '@/components/Button/ButtonType';
import LoadingSpinner from '@/components/Button/LoadingSpinner';
import getButtonStyle from '@/components/Button/getButtonStyle';
import getTextStyle from '@/components/Button/getTextStyle';
import useTheme from '@/components/style/theme/useTheme';

const Button = ({
  children,
  onPress,
  disabled = false,
  overlay = false,
  loading = false,
  type = 'default',
  size = 'default',
  style,
}: ButtonProps) => {
  const themeStyle = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) =>
        getButtonStyle({
          pressed: pressed && !loading,
          type,
          disabled,
          size,
          overlay,
          themeStyle,
          style,
        })
      }
    >
      {({ pressed }) => {
        const textStyle = getTextStyle({
          pressed: pressed && !loading,
          type,
          disabled,
          size,
          overlay,
          themeStyle,
        });
        return (
          <>
            <RenderChildren
              pressed={pressed}
              loading={loading}
              textStyle={textStyle}
            >
              {children}
            </RenderChildren>
          </>
        );
      }}
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

const RenderContent = ({
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

const RenderChildren = ({
  children,
  pressed,
  textStyle,
  loading,
}: {
  children: ReactNode;
  pressed: boolean;
  textStyle: TextStyle;
  loading: boolean;
}) => {
  return (
    <>
      <RenderLoading
        loading={loading}
        pressed={pressed}
        color={textStyle.color}
      />
      <RenderContent textStyle={textStyle} pressed={pressed}>
        {children}
      </RenderContent>
    </>
  );
};

export default Button;

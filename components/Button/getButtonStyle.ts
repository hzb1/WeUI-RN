// @ts-ignore
import Color from 'color';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';

import { ButtonProps } from '@/components/Button/ButtonType';
import { ThemeKey } from '@/components/style/theme';

const typeMap = {
  primary: 'btn_primary',
  default: 'btn_default',
  warn: 'btn_warn',
} as const;

const sizeMap = {
  default: 'btn_size_default',
  medium: 'btn_medium',
  mini: 'btn_mini',
} as const;

const overlayMap = {
  primary: 'btn_primary_overlay',
  default: 'btn_default_overlay',
  warn: 'btn_warn_overlay',
} as const;

const getButtonStyle = ({
  type,
  size,
  overlay,
  disabled,
  pressed,
  themeStyle,
  style: buttonStyle,
}: {
  type: 'primary' | 'default' | 'warn';
  size: NonNullable<ButtonProps['size']>;
  overlay: boolean;
  disabled: boolean;
  pressed: boolean;
  themeStyle: Record<ThemeKey, string>;
  style?: ButtonProps['style'];
}): ViewStyle => {
  const style = getStyles(pressed, themeStyle);
  const styleList: StyleProp<ViewStyle> = [
    style.btn,
    style[typeMap[type]],
    // style['btn_primary'],
    style[sizeMap[size]],
  ];

  if (overlay && disabled) {
    styleList.push({
      backgroundColor: 'hsla(0,0%,100%,.3)',
    });
  } else if (overlay && !disabled) {
    styleList.push(style[overlayMap[type]]);
  } else if (disabled) {
    styleList.push({
      backgroundColor: themeStyle['FG-5'],
    });
  }

  if (buttonStyle) {
    const _buttonStyle
      = typeof buttonStyle === 'function'
        ? buttonStyle({ pressed } as any)
        : buttonStyle;
    styleList.push(_buttonStyle);
  }

  return StyleSheet.flatten(styleList);
};

const getStyles = (pressed: boolean, themeStyle: Record<ThemeKey, string>) =>
  StyleSheet.create({
    btn: {
      width: 184,
      marginHorizontal: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      flexDirection: 'row',
      gap: 8,
    },

    // type
    btn_primary: {
      backgroundColor: pressed
        ? darken(themeStyle['BRAND'])
        : themeStyle['BRAND'],
    },
    btn_default: {
      backgroundColor: pressed ? themeStyle['FG-2'] : themeStyle['FG-5'],
    },
    btn_warn: {
      backgroundColor: pressed
        ? darken(themeStyle['RED-100'])
        : themeStyle['RED-100'],
    },

    // size
    btn_size_default: {},
    btn_medium: {
      paddingVertical: 10,
      paddingHorizontal: 24,
    },
    btn_mini: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 6,
      width: 'auto',
      // flexGrow: 1,
    },

    // disabled
    disabled: {
      backgroundColor: themeStyle['FG-5'],
    },

    // overlay
    btn_primary_overlay: {
      backgroundColor: pressed ? darken('#fff') : '#fff',
    },
    btn_default_overlay: {
      backgroundColor: pressed
        ? darken('hsla(0,0%,97%,.3)')
        : 'hsla(0,0%,97%,.3)',
    },
    btn_warn_overlay: {
      backgroundColor: pressed
        ? darken(themeStyle['RED-100'])
        : themeStyle['RED-100'],
    },

    // btn_overlay + disabled
    btn_overlay_disabled: {
      backgroundColor: 'hsla(0,0%,100%,.3)',
    },
  });

const darken = (color: string) => {
  return Color(color).darken(0.12).toString();
};

export default getButtonStyle;

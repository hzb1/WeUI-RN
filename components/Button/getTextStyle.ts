// @ts-ignore
// import Color from 'color';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import { ButtonProps } from '@/components/Button/ButtonType';
import { ThemeKey } from '@/components/style/theme';

const getTextStyle = ({
  type,
  size,
  overlay,
  disabled,
  pressed,
  themeStyle,
}: {
  type: 'primary' | 'default' | 'warn';
  size: NonNullable<ButtonProps['size']>;
  overlay: boolean;
  disabled: boolean;
  pressed: boolean;
  themeStyle: Record<ThemeKey, string>;
}): TextStyle => {
  const style = getStyles(pressed, themeStyle);
  const styleList: StyleProp<TextStyle> = [style.btn_text];

  if (size === 'medium') {
    styleList.push(style.btn_medium);
  } else if (size === 'mini') {
    styleList.push(style.btn_mini);
  }

  if (type === 'default') {
    styleList.push(style.btn_default);
  }

  if (overlay && disabled) {
    styleList.push(style.btn_overlay_disabled);
  } else if (overlay && !disabled) {
    if (type === 'default') {
      styleList.push(style.btn_default_overlay);
    } else if (type === 'primary') {
      styleList.push(style.btn_primary_overlay);
    } else if (type === 'warn') {
      styleList.push(style.btn_warn_overlay);
    }
  } else if (disabled) {
    styleList.push(style.btn_disabled);
  }

  return StyleSheet.flatten(styleList);
};

const getStyles = (pressed: boolean, themeStyle: Record<ThemeKey, string>) =>
  StyleSheet.create({
    btn_text: {
      fontSize: 17,
      fontWeight: '500',
      // fontWeight: 'bold',
      color: '#fff',
      lineHeight: 17 * 1.41176471,
    },
    btn_disabled: {
      color: themeStyle['FG-4'],
    },
    btn_default: {
      color: themeStyle['FG-0'],
    },

    // size
    btn_size_default: {},
    btn_medium: {
      fontSize: 14,
      // lineHeight: (themeStyle['BTN-HEIGHT-MEDIUM'] as number) - 20 / 14,
      // lineHeight: 40 - 20 / 14,
      lineHeight: 20,
    },
    btn_mini: {
      fontSize: 14,
      lineHeight: 14 * 1.42857,
    },

    // overlay
    btn_primary_overlay: {
      color: 'rgba(0,0,0,.9)',
    },
    btn_default_overlay: {
      color: '#fff',
    },
    btn_warn_overlay: {
      color: '#fff',
    },
    btn_overlay_disabled: {
      color: 'hsla(0,0%,97%,.3)',
    },
  });

// const darken = (color: string) => {
//   return Color(color).darken(0.12).toString();
// };

export default getTextStyle;

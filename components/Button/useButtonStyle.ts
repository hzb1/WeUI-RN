import { ButtonProps } from '@/components/Button/ButtonType';
import {
  ColorValue,
  PressableAndroidRippleConfig,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import useTheme from '@/components/style/theme/useTheme';
import { useMemo } from 'react';

const useButtonStyle = ({
  type,
  disabled,
  loading,
  size,
  overlay,
  style,
}: ButtonProps) => {
  const themeStyle = useTheme();

  const android_ripple = useMemo((): PressableAndroidRippleConfig => {
    return {
      color: 'rgba(0, 0, 0, 0.2)',
    };
  }, [themeStyle]);

  const textColor = useMemo<ColorValue>(() => {
    if (disabled) {
      if (overlay) return 'rgba(247,247,247,0.3)';
      return themeStyle['FG-4'];
    }

    if (overlay) {
      if (type === 'primary') {
        return 'rgba(0,0,0,0.9)';
      } else if (type === 'default') {
        return '#fff';
      } else if (type === 'warn') {
        return '#fff';
      }
    }

    if (type === 'default') {
      return themeStyle['FG-0'];
    }
    return '#fff';
  }, [disabled, type, overlay]);

  const textStyle: TextStyle = useMemo(() => {
    return {
      fontFamily: 'system-ui, -apple-system, "Helvetica Neue", sans-serif',
      color: textColor,
      fontSize: size === 'mini' ? 14 : 16,
      fontWeight: '500',
    };
  }, [textColor, size]);

  const backgroundColor = useMemo<ColorValue>(() => {
    if (disabled) {
      if (overlay) return 'rgba(255,255,255,0.3)';
      return themeStyle['FG-5'];
    }
    if (type === 'primary') {
      if (overlay) return '#fff';
      return themeStyle.BRAND;
    } else if (type === 'default') {
      if (overlay) return 'rgba(247,247,247,0.3)';
      return themeStyle['FG-5'];
    } else if (type === 'warn') {
      return themeStyle['RED-100'];
    }
    return '#fff';
  }, [themeStyle, disabled, type, overlay]);

  const height = useMemo(() => {
    if (size === 'mini') {
      return 32;
    }
    if (size === 'medium') {
      return 40;
    }
    return 48;
  }, [size]);

  const paddingStyle: ViewStyle = useMemo(() => {
    if (size === 'mini') {
      return {
        paddingHorizontal: 12,
        paddingVertical: 6,
      };
    } else if (size === 'medium') {
      return {
        paddingHorizontal: 24,
        paddingVertical: 10,
      };
    }
    return {
      paddingHorizontal: 24,
      paddingVertical: 12,
    };
  }, [size]);

  const buttonStyle: ViewStyle = useMemo(() => {
    return {
      ...styles.btn,
      ...paddingStyle,
      backgroundColor,
      height,
      minHeight: height,
      width: size === 'mini' ? 'auto' : 184,
      margin: size === 'mini' ? undefined : 'auto',
    };
  }, [backgroundColor, height, paddingStyle, size]);

  const buttonPressedStyle: ViewStyle = useMemo(() => {
    return { ...buttonStyle };
  }, [buttonStyle]);

  return {
    buttonStyle,
    activeStyle: buttonPressedStyle,
    textStyle,
    android_ripple,
  };
};

const styles = StyleSheet.create({
  btn: {
    width: 184,
    // margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
  },
  primaryType: {},
});

export default useButtonStyle;

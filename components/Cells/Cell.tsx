import { ReactNode } from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewProps,
  Pressable,
  PressableProps,
} from 'react-native';

import useTheme from '@/components/style/theme/useTheme';
import MaybeText from '@/components/utils/MaybeText';

const arrowIcon = `data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E`;

export interface CellProps extends PressableProps {
  // 标题
  title: ReactNode | string;
  // 副标题
  subTitle?: ReactNode | string;
  // 说明文字
  desc?: ReactNode | string;
  // 图标
  icon?: ReactNode;
  // 显示border
  border?: boolean;

  onPress?: () => void;
}

const Cell = ({
  title,
  subTitle,
  desc,
  icon,
  border = false,
  ...viewProps
}: CellProps) => {
  const styles = useStyles();

  //是否显示箭头
  const showArrow = !!viewProps.onPress;

  return (
    <Pressable
      {...viewProps}
      style={(state) => {
        if (showArrow && state.pressed) {
          return [styles.cell, { backgroundColor: '#f5f5f5' }];
        }
        return [styles.cell];
      }}
    >
      {icon && <View style={styles.cell__hd}>{icon}</View>}
      <View style={styles.container}>
        <View style={styles.cell__bd}>
          <MaybeText style={styles.title} children={title} />
          <MaybeText style={styles.subTitle} children={subTitle} />
        </View>
        <View style={styles.cell__ft}>
          <MaybeText style={styles.desc} children={desc} />
          {showArrow && (
            <Image source={{ width: 12, height: 24, uri: arrowIcon }} />
          )}
        </View>
        {border && <View style={[styles.beforeElement, { left: 0 }]}></View>}
      </View>
    </Pressable>
  );
};

const useStyles = () => {
  const themeStyle = useTheme();

  return StyleSheet.create({
    cell: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cell__hd: {
      marginRight: 16,
      width: 20,
      height: 20,
      flexShrink: 0,
    },
    cell__bd: {
      flex: 1,
    },
    cell__ft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      color: themeStyle['FG-0'],
      fontSize: 17,
      lineHeight: 17 * 1.41176,
    },
    subTitle: {
      color: themeStyle['FG-2'],
      paddingTop: 4,
      fontSize: 12,
      lineHeight: 12 * 1.41176,
    },
    desc: {
      color: themeStyle['FG-1'],
      fontSize: 17,
      lineHeight: 17 * 1.41176,
      textAlign: 'right',
    },
    beforeElement: {
      position: 'absolute',
      top: -16,
      left: -16,
      right: -16,
      // width: '100%',
      height: StyleSheet.hairlineWidth.valueOf(),
      // height: 1,
      backgroundColor: themeStyle['FG-3'],
    },
    arrow: {
      width: 12,
      height: 24,
    },
  });
};

export default Cell;

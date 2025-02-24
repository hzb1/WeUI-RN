import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Divider from '@/components/Divider/Divider';
import { Portal } from '@/components/Portal/PortalProvider';
import useTheme from '@/components/style/theme/useTheme';
// const styles = useStyles();

type ActionSheetOption = {
  // 标题
  title: string;
  // 副标题
  subTitle?: string;
};

export interface ActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  options: ActionSheetOption[];
  onSelect: (index: number, item: ActionSheetOption) => void | Promise<void>;
  onCancel?: () => void;
  onCloseAnimationEnd?: () => void;
}

const ActionSheet = (props: ActionSheetProps) => {
  const {
    onSelect,
    onCancel,
    options,
    title,
    open,
    onOpenChange,
    onCloseAnimationEnd,
  } = props;
  const styles = useStyles();

  const onPressItem = useCallback(
    async (index: number) => {
      await onSelect(index, options[index]);
      // setOpen(false);
    },
    [onSelect, options],
  );

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      onCloseAnimationEnd={onCloseAnimationEnd}
    >
      <View style={styles.actionSheet}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.menu}>
          {options.map((option, index) => (
            <View key={index}>
              <Divider />
              <Pressable
                onPress={() => onPressItem(index)}
                key={index}
                style={({ pressed }) => {
                  if (pressed) {
                    return [styles.cell, styles.cellActive];
                  }
                  return styles.cell;
                }}
              >
                <Text style={styles.cellText}>{option.title}</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => onCancel?.()}
          style={({ pressed }) => {
            if (pressed) {
              return [styles.cell, styles.cancel, styles.cellActive];
            }
            return [styles.cell, styles.cancel];
          }}
        >
          <Text style={styles.cellText}>取消</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
};

const useStyles = () => {
  const themeStyle = useTheme();
  return StyleSheet.create({
    actionSheet: {
      width: '100%',
      backgroundColor: themeStyle['BG-1'],
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      overflow: 'hidden',
    },
    title: {
      paddingHorizontal: 24,
      paddingVertical: 8,
      // height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeStyle['BG-2'],
    },
    titleText: {
      fontSize: 12,
      lineHeight: 40,
      color: themeStyle['FG-1'],
    },
    menu: {
      backgroundColor: themeStyle['BG-2'],
    },
    cell: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: themeStyle['BG-2'],
    },
    cellActive: {
      backgroundColor: themeStyle['BG-COLOR-ACTIVE'],
    },
    cellText: {
      fontSize: 17,
      color: themeStyle['FG-0'],
    },
    cancel: {
      marginTop: 8,
      backgroundColor: themeStyle['BG-2'],
    },
  });
};

type ActionSheetOpenProps = Omit<ActionSheetProps, 'open' | 'onOpenChange'>;

ActionSheet.open = ({ ...props }: ActionSheetOpenProps) => {
  const portalId = Portal.open({
    content: ({ open, onOpenChange }) => {
      return (
        <ActionSheet
          {...props}
          open={open}
          onOpenChange={onOpenChange}
          onCloseAnimationEnd={onCloseAnimationEnd}
        />
      );
    },
  });

  // 在关闭后的动画结束后，销毁组件
  const onCloseAnimationEnd = () => {
    Portal.unload(portalId);
  };

  // 关闭
  return () => {
    Portal.closeAndUnload(portalId);
  };
};

export default ActionSheet;

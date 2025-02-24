import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import DemoPage from '@/app/(demo)/components/DemoPage';
import ActionSheet from '@/components/ActionSheet/ActionSheet';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Button from '@/components/Button';

const ActionSheetDemo = () => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const onPressActionSheet = () => {
    const close = ActionSheet.open({
      title: '这是一个标题，可以为一行或者两行。',
      options: [
        {
          title: '示例菜单',
        },
        {
          title: '选项2',
          subTitle: '副标题',
        },
        {
          title: '负向菜单',
        },
      ],
      onSelect: (index, item) => {
        console.log('onSelect', index, item);
        close();
      },
      onCancel: () => {
        console.log('onCancel');
        close();
      },
    });
  };
  return (
    <DemoPage title={'ActionSheet'} desc={'弹出式菜单'}>
      <View style={styles.container}>
        <Button
          onPress={() => {
            setOpenBottomSheet(true);
          }}
        >
          BottomSheet {openBottomSheet ? '关闭' : '打开'}
        </Button>
        <Button onPress={onPressActionSheet}>ActionSheet</Button>
      </View>

      <BottomSheet open={openBottomSheet} onOpenChange={setOpenBottomSheet}>
        <View
          style={{
            padding: 24,
            backgroundColor: 'white',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <Text>Content</Text>
          <Text>Content</Text>
          <TouchableOpacity
            style={{ justifyContent: 'center', height: 80 }}
            onPress={() => setOpenBottomSheet(false)}
          >
            <Text>Pressable</Text>
          </TouchableOpacity>
          <Button onPress={() => setOpenBottomSheet(false)}>关闭</Button>
          <Text>Content</Text>
          <Text>Content</Text>
        </View>
      </BottomSheet>
    </DemoPage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});

export default ActionSheetDemo;

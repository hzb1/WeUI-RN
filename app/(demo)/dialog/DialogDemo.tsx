import { useState } from 'react';
import { View } from 'react-native';

import DemoPage from '@/app/(demo)/components/DemoPage';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog/Dialog';

const DialogDemo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const showDialogStyle1 = () => {
    setModalVisible(true);
  };

  const showDialogStyle2 = () => {
    setModalVisible2(true);
  };

  // 命令式
  const showConfirm = () => {
    const close = Dialog.confirm({
      title: '弹窗标题',
      content:
        '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      onConfirm: () => {
        console.log('confirm');
        close();
      },
      onCancel: () => {
        console.log('cancel');
        close();
      },
      onClose: () => {
        console.log('close');
        close();
      },
      onMaskPress: () => {
        console.log('mask press');
        close();
      },
    });
  };

  return (
    <DemoPage title={'Dialog'} desc={'对话框'}>
      <View>
        <View style={{ gap: 16 }}>
          <Button onPress={showDialogStyle1}>样式一</Button>
          <Button onPress={showDialogStyle2}>样式二</Button>
          <Button>样式三</Button>
        </View>
      </View>

      {/*样式一*/}
      <Dialog
        visible={modalVisible}
        title={'弹窗标题'}
        content={
          '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内'
        }
        onClose={() => setModalVisible(false)}
        onMaskPress={() => setModalVisible(false)}
        onConfirm={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      />

      {/*样式二*/}
      <Dialog
        visible={modalVisible2}
        content={
          '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内'
        }
        confirmType={'warn'}
        onClose={() => setModalVisible2(false)}
        onMaskPress={() => setModalVisible2(false)}
        onConfirm={() => setModalVisible2(false)}
        onCancel={() => setModalVisible2(false)}
      />
    </DemoPage>
  );
};

export default DialogDemo;

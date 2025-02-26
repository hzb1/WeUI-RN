import { useState } from 'react';
import { View } from 'react-native';

import DemoPage from '@/app/(demo)/components/DemoPage';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog/Dialog';
import { openConfirm } from '@/components/Dialog/methods';

const DialogDemo = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  // 命令式演示
  const showDialogStyle3 = () => {
    const close = openConfirm({
      title: '弹窗标题',
      content:
        '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      verticalAction: true, // 垂直操作栏
      onConfirm: () => {
        console.log('confirm');
        close();
      },
      onCancel: () => {
        console.log('cancel');
        close();
      },
    });
  };

  return (
    <DemoPage title={'Dialog'} desc={'对话框'}>
      <View>
        <View style={{ gap: 16 }}>
          <Button onPress={() => setIsOpen1(true)}>样式一</Button>
          <Button onPress={() => setIsOpen2(true)}>样式二</Button>
          <Button onPress={showDialogStyle3}>样式三</Button>
        </View>
      </View>

      {/*样式一*/}
      <Dialog
        open={isOpen1}
        title={'弹窗标题'}
        content={
          '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内'
        }
        onClose={() => setIsOpen1(false)}
        onConfirm={() => setIsOpen1(false)}
        onCancel={() => setIsOpen1(false)}
      />

      {/*样式二*/}
      <Dialog
        open={isOpen2}
        content={
          '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内'
        }
        confirmType={'warn'}
        closeOnMaskPress={false}
        onClose={() => setIsOpen2(false)}
        onConfirm={() => setIsOpen2(false)}
        onCancel={() => setIsOpen2(false)}
      />
    </DemoPage>
  );
};

export default DialogDemo;

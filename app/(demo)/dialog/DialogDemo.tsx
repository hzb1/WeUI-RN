import { useState } from 'react';
import { View, StyleSheet, Modal, Text, Pressable } from 'react-native';

import DemoPage from '@/app/(demo)/components/DemoPage';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog/Dialog';
import Mask from '@/components/Mask';
import useTheme from '@/components/style/theme/useTheme';

const DialogDemo = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showDialog = () => {
    setModalVisible(true);
  };

  return (
    <DemoPage title={'Dialog'} desc={'对话框'}>
      <View>
        <View style={{ gap: 16 }}>
          <Button onPress={showDialog}>样式一</Button>
          <Button>样式二</Button>
          <Button>样式三</Button>
        </View>
      </View>

      <Dialog visible={modalVisible} />
    </DemoPage>
  );
};

export default DialogDemo;

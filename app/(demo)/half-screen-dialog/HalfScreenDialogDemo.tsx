import EvilIcons from '@expo/vector-icons/EvilIcons';
import Icons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';

import DemoPage from '@/app/(demo)/components/DemoPage';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import useTheme from '@/components/style/theme/useTheme';

const HalfScreenDialogDemo = () => {
  const [isOpen1, setIsOpen1] = useState(false);

  const styles = useStyles();

  return (
    <DemoPage title={'Half-screen Dialog'} desc={'半屏组件'}>
      <View>
        <View style={{ gap: 16 }}>
          <Button onPress={() => setIsOpen1(true)}>样式一</Button>
        </View>

        <Modal
          open={isOpen1}
          onClose={() => {
            setIsOpen1(false);
          }}
          contentPosition={'bottom'}
          duration={300}
        >
          <View style={styles['half-screen-dialog']}>
            <View style={styles['half-screen-dialog__hd']}>
              <View style={styles['half-screen-dialog__hd__side']}>
                <EvilIcons name="close" size={24} color="black" />
              </View>
            </View>
            <ScrollView style={styles['half-screen-dialog__bd']}>
              <Text style={styles.contentText}>可放自定义内容</Text>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </DemoPage>
  );
};

const { height, width } = Dimensions.get('screen');

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    'half-screen-dialog': {
      paddingHorizontal: 24,
      minHeight: 255,
      maxHeight: '75%',
      backgroundColor: theme['BG-2'],
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      width,
    },
    'half-screen-dialog__hd': {
      minHeight: 64,
      flexShrink: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    'half-screen-dialog__bd': {
      flex: 1,
    },
    'half-screen-dialog__hd__side': {
      position: 'relative',
      left: -8,
    },
    contentText: {
      marginTop: 24,
      marginBottom: 250,
      color: theme['FG-0'],
      fontSize: 14,
    },
  });
};

export default HalfScreenDialogDemo;

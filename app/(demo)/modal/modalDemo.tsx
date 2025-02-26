import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import DemoPage from '@/app/(demo)/components/DemoPage';
import Button from '@/components/Button';
import Modal from '@/components/Modal/Modal';
import { openModal } from '@/components/Modal/methods';

const ModalDemo = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  // 函数式调用
  const onOpen = () => {
    const close = openModal({
      children: (
        <View style={styles.modal1}>
          <Text>这是一个弹窗</Text>
          <Button size={'mini'} onPress={() => close()}>
            关 闭
          </Button>
        </View>
      ),
    });
  };

  return (
    <DemoPage title={'Modal'} desc={'弹窗'}>
      <View>
        <View style={{ gap: 16 }}>
          <Button onPress={() => setOpen1(true)}>基本使用</Button>
          <Button onPress={() => setOpen2(true)}>基本使用二</Button>
          <Button onPress={() => setOpen3(true)}>基本使用三</Button>
          <Button onPress={onOpen}>函数式调用</Button>
        </View>

        <Modal
          open={open1}
          onClose={() => {
            setOpen1(false);
          }}
        >
          <View style={styles.modal1}>
            <Text>这是一个弹窗</Text>
            <Button size={'mini'} onPress={() => setOpen1(false)}>
              关 闭
            </Button>
          </View>
        </Modal>

        <Modal
          open={open2}
          onClose={() => {
            setOpen2(false);
          }}
          contentPosition={'bottom'}
        >
          <View style={styles.modal2}>
            <Text>这是一个弹窗2</Text>
            <Button size={'mini'} onPress={() => setOpen2(false)}>
              关 闭
            </Button>
          </View>
        </Modal>

        <Modal
          open={open3}
          onClose={() => {
            setOpen3(false);
          }}
          contentPosition={'top'}
        >
          <View style={styles.modal3}>
            <Text>这是一个弹窗3</Text>
            <Button size={'mini'} onPress={() => setOpen3(false)}>
              关 闭
            </Button>
          </View>
        </Modal>
      </View>
    </DemoPage>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  modal1: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    borderRadius: 12,
  },
  modal2: {
    width: windowWidth,
    height: 200,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modal3: {
    width: windowWidth,
    height: 200,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default ModalDemo;

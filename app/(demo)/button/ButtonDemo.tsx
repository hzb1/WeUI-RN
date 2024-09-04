import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import DemoPage from '@/app/(demo)/components/DemoPage';
import Button from '@/components/Button';

const ButtonDemo = () => {
  return (
    <DemoPage title={'Button'} desc={'按钮'}>
      <View style={styles.container}>
        <ButtonSpArea>
          <Button type={'primary'}>主要操作</Button>
          <Button type={'primary'} loading={true}></Button>
          <Button type={'primary'} loading>
            主要操作
          </Button>
        </ButtonSpArea>
      </View>
    </DemoPage>
  );
};

const ButtonSpArea = ({ children }: { children: ReactNode }) => {
  return (
    <View
      style={{
        marginHorizontal: 'auto',
        marginVertical: 15,
        padding: 15,
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ButtonDemo;

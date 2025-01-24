import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DemoPage from '@/app/(demo)/components/DemoPage';
import Input from '@/components/Input';

const InputDemo = () => {
  const [value, setValue] = useState('');

  return (
    <DemoPage title={'Input'} desc={'输入框'}>
      <View style={styles.container}>
        <Input value={value} onChangeText={(v) => setValue(v)} />
      </View>
    </DemoPage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputDemo;

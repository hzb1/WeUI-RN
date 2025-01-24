import { TextInput, TextInputProps, StyleSheet } from 'react-native';

interface InputProps extends TextInputProps {
  color?: string;
}

const Input = (props: InputProps) => {
  return (
    <TextInput
      {...props}
      placeholder={'请输入'}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 0,
    // height: 24,
    // fontSize: 12,
    textAlign: 'left',
  },
});

export default Input;

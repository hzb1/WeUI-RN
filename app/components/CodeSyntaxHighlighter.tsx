import { View } from 'react-native'; // 7.0.1
// @ts-ignore
import SyntaxHighlighter from 'react-native-syntax-highlighter'; // 2.0.0
// @ts-ignore
import { vs2015, darcula } from 'react-syntax-highlighter/styles/prism';
const CodeSyntaxHighlighter = ({ code }: { code: string }) => {
  return (
    <View
      style={{
        backgroundColor: '#E87A90',
        height: '100%',
      }}
    >
      <SyntaxHighlighter
        style={darcula}
        customStyle={{ padding: 12, margin: 0 }}
        language="javascript"
        fontSize={12}
        highlighter="prism"
      >
        {code}
      </SyntaxHighlighter>
    </View>
  );
};

export default CodeSyntaxHighlighter;

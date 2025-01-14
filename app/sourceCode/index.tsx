import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import CodeSyntaxHighlighter from '@/app/components/CodeSyntaxHighlighter';
import sourceCodeMap from '@/assets/demoCode.json';

const SourceCode = () => {
  const title = useLocalSearchParams().title as any;

  // @ts-ignore
  const code = sourceCodeMap[title] || '';

  return (
    <View>
      <CodeSyntaxHighlighter code={code} />
    </View>
  );
};

export default SourceCode;

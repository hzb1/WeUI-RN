import { ScrollView, StyleSheet, Platform } from 'react-native';
import CodeHighlighter from 'react-native-code-highlighter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import useTheme from '@/components/style/theme/useTheme';

const CodeSyntaxHighlighter = ({ code }: { code: string }) => {
  const styles = useStyles();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.scroll}>
      <CodeHighlighter
        hljsStyle={androidstudio}
        scrollViewProps={{
          contentContainerStyle: [
            styles.codeContainer,
            {
              paddingTop: insets.top + 12,
              paddingBottom: insets.bottom + 12,
              paddingLeft: insets.left + 12,
              paddingRight: insets.right + 12,
            },
          ],
        }}
        textStyle={styles.text}
        language="typescript"
      >
        {code}
      </CodeHighlighter>
    </ScrollView>
  );
};

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      height: '100%',
    },
    scroll: {
      ...(Platform.select({
        native: {},
        default: {
          height: '100vh',
        },
      }) as any),
    },
    // text: {
    //   fontSize: 12,
    //   color: theme['FG-0'],
    // },
    codeContainer: {
      minWidth: '100%',
      // padding: 16,
      // minWidth: '100%',
    },
    text: {
      fontSize: 14,
      lineHeight: 14 * 1.4,
      color: theme['FG-0'],
    },
  });
};

export default CodeSyntaxHighlighter;

import { View } from 'react-native';

import CodeSyntaxHighlighter from '@/app/components/CodeSyntaxHighlighter';

const codeDefault = `
import { ReactNode } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import DemoPage from '@/app/(demo)/components/DemoPage';
import Button from '@/components/Button';

const ButtonDemo = () => {
  return (
    <DemoPage title={'Button'} desc={'按钮'}>
      <View style={styles.container}>
        <ButtonSpArea>
          {/* 主要操作 start */}
          <Button type={'primary'}>主要操作</Button>
          <Button type={'primary'} loading={true}></Button>
          <Button type={'primary'} loading>
            主要操作
          </Button>
          <Button type={'primary'} disabled={true}>
            主要操作
          </Button>
          {/* 主要操作 end */}

          {/* 次要操作 start */}
          <Button type={'default'}>次要操作</Button>
          <Button loading={true}></Button>
          <Button loading>次要操作</Button>
          <Button disabled={true}>次要操作</Button>
          {/* 次要操作 end */}

          {/* 警示操作 start */}
          <Button type={'warn'}>警示操作</Button>
          <Button type={'warn'} loading></Button>
          <Button type={'warn'} loading>
            警示操作
          </Button>
          <Button type={'warn'} disabled={true}>
            警示操作
          </Button>
          {/* 警示操作 end */}
        </ButtonSpArea>

        <ButtonSpArea>
          <Button type={'primary'} size={'medium'}>
            medium 按钮
          </Button>
          <Button type={'default'} size={'medium'}>
            medium 按钮
          </Button>
          <Button type={'warn'} size={'medium'}>
            medium 按钮
          </Button>
        </ButtonSpArea>

        <ButtonSpArea style={styles.overlay}>
          <Button type={'primary'} overlay>
            overlay 按钮
          </Button>
          <Button type={'default'} overlay>
            overlay 按钮
          </Button>
          <Button type={'warn'} overlay>
            overlay 按钮
          </Button>
        </ButtonSpArea>

        <ButtonSpArea style={styles.overlay}>
          <Button type={'primary'} overlay disabled>
            overlay 按钮
          </Button>
          <Button type={'default'} overlay disabled>
            overlay 按钮
          </Button>
          <Button type={'warn'} overlay disabled>
            overlay 按钮
          </Button>
        </ButtonSpArea>

        <ButtonSpArea
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <Button
            type={'primary'}
            size={'mini'}
            style={{ marginHorizontal: 0 }}
          >
            按钮
          </Button>
          <Button
            type={'default'}
            size={'mini'}
            style={{ marginHorizontal: 0 }}
          >
            按钮
          </Button>
          <Button type={'warn'} size={'mini'} style={{ marginHorizontal: 0 }}>
            按钮
          </Button>
        </ButtonSpArea>

        <ButtonSpArea>
          <Button
            type={'primary'}
            style={({ pressed }) => {
              return {
                width: 'auto',
                height: 44,
                paddingHorizontal: 18,
                backgroundColor: pressed
                  ? '#1A79C5FF'
                  : 'rgba(33,150,243,1.00)',
              };
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              自定义样式
            </Text>
          </Button>
        </ButtonSpArea>
      </View>
    </DemoPage>
  );
};

const ButtonSpArea = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: any;
}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          marginHorizontal: 'auto',
          marginBottom: 15,
          padding: 15,
          flexDirection: 'column',
          gap: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  overlay: {
    backgroundColor: '#07c160',
  },
});

export default ButtonDemo;
`;

const SourceCode = () => {
  return (
    <View>
      <CodeSyntaxHighlighter code={codeDefault} />
    </View>
  );
};

export default SourceCode;

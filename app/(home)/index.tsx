import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import CollapsibleCard from '@/app-components/home/CollapsibleCard';
import ParallaxScrollView from '@/app-components/home/ParallaxScrollView';

type Item = {
  title: string;
  iconUrl: string;
  items: { name: string; url: string }[];
};

const Index = () => {
  const router = useRouter();

  // 获取屏幕的高度和宽度
  const { height: screenHeight } = Dimensions.get('window');

  // 使用 useSafeAreaInsets 钩子获取安全区域插图
  const insets = useSafeAreaInsets();

  // 计算不包含安全区域的高度
  const contentHeight = screenHeight - insets.top - insets.bottom;

  // 当前打开的卡片
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  const data: Item[] = [
    {
      title: '表单',
      iconUrl: 'https://weui.io/images/icon_nav_form.png',
      items: [
        {
          name: 'Button',
          url: '/button',
        },
        {
          name: 'Form',
          url: 'https://weui.io/0.4.x/#/example/button',
        },
        {
          name: 'Input',
          url: 'https://weui.io/0.4.x/#/example/input',
        },
        {
          name: 'List',
          url: 'https://weui.io/0.4.x/#/example/list',
        },
        {
          name: 'Slider',
          url: 'https://weui.io/0.4.x/#/example/slider',
        },
        {
          name: 'Uploader',
          url: 'https://weui.io/0.4.x/#/example/uploader',
        },
      ],
    },
    {
      title: '基础组件',
      iconUrl: 'https://weui.io/images/icon_nav_layout.png',
      items: [
        {
          name: 'Article',
          url: 'https://weui.io/0.4.x/#/example/article',
        },
        {
          name: 'Badge',
          url: 'https://weui.io/0.4.x/#/example/badge',
        },
        {
          name: 'Flex',
          url: 'https://weui.io/0.4.x/#/example/flex',
        },
        {
          name: 'Footer',
          url: 'https://weui.io/0.4.x/#/example/footer',
        },
        {
          name: 'Gallery',
          url: 'https://weui.io/0.4.x/#/example/gallery',
        },
        {
          name: 'Grid',
          url: 'https://weui.io/0.4.x/#/example/grid',
        },
        {
          name: 'Icons',
          url: 'https://weui.io/0.4.x/#/example/icons',
        },
        {
          name: 'Loading',
          url: 'https://weui.io/0.4.x/#/example/loadmore',
        },
        {
          name: 'Loadmore',
          url: 'https://weui.io/0.4.x/#/example/loadmore',
        },
        {
          name: 'Panel',
          url: 'https://weui.io/0.4.x/#/example/panel',
        },
        {
          name: 'Preview',
          url: 'https://weui.io/0.4.x/#/example/preview',
        },
        {
          name: 'Progress',
          url: 'https://weui.io/0.4.x/#/example/progress',
        },
        {
          name: 'Steps',
          url: 'https://weui.io/0.4.x/#/example/steps',
        },
      ],
    },
    {
      title: '操作反馈',
      iconUrl: 'https://weui.io/images/icon_nav_feedback.png',
      items: [
        {
          name: 'Actionsheet',
          url: 'https://weui.io/0.4.x/#/example/actionsheet',
        },
        {
          name: 'Dialog',
          url: 'https://weui.io/0.4.x/#/example/dialog',
        },
        {
          name: 'Half-screen Dialog',
          url: 'https://weui.io/0.4.x/#/example/half-screen-dialog',
        },
        {
          name: 'Msg',
          url: 'https://weui.io/0.4.x/#/example/msg',
        },
        {
          name: 'Picker',
          url: 'https://weui.io/0.4.x/#/example/picker',
        },
        {
          name: 'Toast',
          url: 'https://weui.io/0.4.x/#/example/toast',
        },
      ],
    },
    {
      title: '导航相关',
      iconUrl: 'https://weui.io/images/icon_nav_nav.png',
      items: [
        {
          name: 'Navbar',
          url: 'https://weui.io/0.4.x/#/example/navbar',
        },
        {
          name: 'Tabbar',
          url: 'https://weui.io/0.4.x/#/example/tabbar',
        },
      ],
    },
    {
      title: '搜索相关',
      iconUrl: 'https://weui.io/images/icon_nav_search.png',
      items: [
        {
          name: 'Search Bar',
          url: 'https://weui.io/0.4.x/#/example/search-bar',
        },
      ],
    },
    {
      title: '层级规范',
      iconUrl: 'https://weui.io/images/icon_nav_z-index.png',
      items: [],
    },
  ];

  const onOpenChange = (title: string, open: boolean) => {
    // console.warn('onOpenChange', open)
    setOpenTitle(open ? title : null);
  };

  const onClickItem = (item: Item['items'][number]) => {
    router.push(item.url);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { minHeight: contentHeight }]}>
        <ParallaxScrollView
          headerImage={
            <View style={styles.head}>
              <Image
                style={styles.title}
                source={{
                  uri: 'https://weui.io/images/logo.png',
                }}
              />
              <Text style={styles.desc}>
                WeUI
                是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。
              </Text>
            </View>
          }
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <View style={styles.body}>
              <View style={styles.lists}>
                {data.map((item) => (
                  <CollapsibleCard
                    {...item}
                    isOpen={openTitle === item.title}
                    key={item.title}
                    onOpenChange={(open) => onOpenChange(item.title, open)}
                    onPress={onClickItem}
                  />
                ))}
              </View>
            </View>
            <View style={styles.footer}>
              <Image
                style={{ width: 84, height: 19 }}
                source={{ uri: 'https://weui.io/images/icon_footer_link.png' }}
              ></Image>
            </View>
          </View>
        </ParallaxScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    backgroundColor: '#ededed',
    fontSize: 16,
    position: 'relative',
  },
  head: {
    padding: 40,
  },
  title: {
    width: 62,
    height: 21,
    marginBottom: 15,
  },
  desc: {
    color: 'rgba(0, 0, 0, 0.55)',
    fontSize: 14,
    marginTop: 4,
    lineHeight: 22.4,
  },
  body: {
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#ededed',
  },
  lists: {
    marginBottom: 20,
    gap: 8,
  },
  footer: {
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: 'center',
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Index;

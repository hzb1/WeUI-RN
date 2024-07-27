import {
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  UIManager,
  Platform,
  LayoutAnimation,
} from 'react-native';
export type CollapsibleCardProps = {
  isOpen: boolean;
  title: string;
  iconUrl: string;
  items: { name: string; url: string }[];
  onOpenChange?: (open: boolean) => void;
  onPress?: (item: { name: string; url: string }) => void;
};

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CollapsibleCard = ({
  items,
  isOpen,
  title,
  iconUrl,
  onOpenChange,
  onPress,
}: CollapsibleCardProps) => {
  // const bodyHeight = items.length * 56;
  // const height = isOpen ? 'auto' : 0;
  // }, [bodyHeight, heightAnim, isOpen, items.length]);

  const onClickHeader = () => {
    // LayoutAnimation.configureNext({
    //   ...LayoutAnimation.Presets.easeInEaseOut,
    //   duration: 300,
    // });
    LayoutAnimation.easeInEaseOut();
    onOpenChange && onOpenChange(!isOpen);
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={[
            styles.header,
            {
              opacity: isOpen ? 0.5 : 1,
            },
          ]}
          onPress={onClickHeader}
        >
          <Text style={styles.title}>{title}</Text>
          <Image
            style={styles.icon}
            source={{
              uri: iconUrl,
            }}
          />
        </Pressable>
        <Animated.View style={[styles.body]}>
          {isOpen &&
            items.map((item) => {
              return (
                <Pressable
                  style={styles.cell}
                  key={item.name}
                  onPress={() => {
                    onPress && onPress(item);
                  }}
                >
                  <View style={styles.cellContent}>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </Pressable>
              );
            })}
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  body: {
    display: 'flex',
    overflow: 'hidden',
  },
  cell: {
    width: '100%',
    paddingHorizontal: 20,
  },
  cellContent: {
    width: '100%',
    // backgroundColor: '#333',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    height: 56,
    flexShrink: 0,
    paddingVertical: 16,
  },
  name: {
    fontSize: 17,
    // lineHeight: 22,
    // color: '#333',
  },
});

export default CollapsibleCard;

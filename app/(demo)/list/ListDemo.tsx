import { View, StyleSheet, Image } from 'react-native';

import DemoPage from '@/app/(demo)/components/DemoPage';
import CellGroup from '@/components/Cells/CellGroup';

const iconUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAA
VFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eH
f39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W7
2FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw
7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4Acb
XmYAAAAASUVORK5CYII=
`;

const ListDemo = () => {
  return (
    <DemoPage title={'List'} desc={'列表'}>
      <View style={styles.container}>
        <CellGroup
          title={'带说明的列表项'}
          options={[{ title: '标题文字', desc: '说明文字' }]}
        />

        <CellGroup
          title={'带图标、说明的列表项'}
          options={[
            {
              title: '标题文字',
              icon: <Image source={{ width: 20, height: 20, uri: iconUrl }} />,
              desc: '说明文字',
            },
            {
              title: '标题文字',
              icon: <Image source={{ width: 20, height: 20, uri: iconUrl }} />,
              desc: '说明文字',
            },
          ]}
        />

        <CellGroup
          title={'带跳转的列表项'}
          options={[
            { title: '标题文字', subTitle: '副标题', onPress: () => {} },
            { title: '标题文字', subTitle: '副标题', onPress: () => {} },
          ]}
        />
      </View>
    </DemoPage>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ListDemo;

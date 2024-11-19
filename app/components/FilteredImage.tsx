import React from 'react';
import { View, Image, ImageProps } from 'react-native';

interface Props extends ImageProps {
  amount?: number;
}

const FilteredImage = ({ amount = 100, ...imageProps }: Props) => (
  <View>
    <Image {...imageProps} />
  </View>
);

export default FilteredImage;

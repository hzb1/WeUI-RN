import { ReactNode, Children } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import Cell, { CellProps } from '@/components/Cells/Cell';
import CellsTitle from '@/components/Cells/CellsTitle';
import useTheme from '@/components/style/theme/useTheme';

interface CellsProps extends ViewProps {
  title?: ReactNode | string;
  options: CellProps[];
}

const CellGroup = ({ options, title, ...viewProps }: CellsProps) => {
  const styles = useStyles();
  return (
    <>
      {title && <CellsTitle>{title}</CellsTitle>}
      <View {...viewProps} style={[styles.Cells, viewProps.style]}>
        {options.map((option, index) => {
          return <Cell key={index} {...option} border={index !== 0} />;
        })}
      </View>
    </>
  );
};

const useStyles = () => {
  const themeStyle = useTheme();

  return StyleSheet.create({
    Cells: {
      backgroundColor: themeStyle['BG-2'],
      overflow: 'hidden',
    },
  });
};

export default CellGroup;

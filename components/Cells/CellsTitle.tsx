import { ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import useTheme from '@/components/style/theme/useTheme';
import MaybeText from '@/components/utils/MaybeText';

interface CellsTitleProps extends ViewProps {
  children?: ReactNode | string;
}

const CellsTitle = ({ children, ...viewProps }: CellsTitleProps) => {
  const styles = useStyles();
  return (
    <View {...viewProps} style={[styles.cellsTitle, viewProps.style]}>
      <MaybeText style={styles.text}>{children}</MaybeText>
    </View>
  );
};

const useStyles = () => {
  const themeStyle = useTheme();

  return StyleSheet.create({
    cellsTitle: {
      marginTop: 16,
      marginBottom: 3,
      paddingHorizontal: 16,
    },
    text: {
      color: themeStyle['FG-1'],
      fontSize: 14,
      lineHeight: 14 * 1.4,
    },
  });
};

export default CellsTitle;

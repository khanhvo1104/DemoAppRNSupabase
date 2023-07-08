import React from 'react';
import {StyleSheet, Text as BaseText} from 'react-native';

import {useTheme} from '../../themes';
import type {Theme} from '../../themes';

type TitleProps = {
  children: React.ReactNode;
};

export const Title = ({children}: TitleProps) => {
  const {theme} = useTheme();

  return <BaseText style={styles(theme).text}>{children}</BaseText>;
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.mainTextColor,
      fontSize: 50,
    },
  });

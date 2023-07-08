import React from 'react';
import {StyleSheet, Text as BaseText} from 'react-native';

import {useTheme} from '../../themes';
import type {Theme} from '../../themes';

type TextProps = {
  children: React.ReactNode;
};

export const Text = ({children}: TextProps) => {
  const {theme} = useTheme();

  return <BaseText style={styles(theme).text}>{children}</BaseText>;
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.mainTextColor,
      fontSize: 20,
    },
  });

import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import React from 'react';

import {useTheme} from '../../themes';
import type {Theme} from '../../themes';

export const Input: React.FC<TextInputProps> = props => {
  const {theme} = useTheme();
  return <TextInput style={styles(theme).input} {...props} />;
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      color: theme.colors.mainTextColor,
      borderColor: theme.colors.mainTextColor,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
  });

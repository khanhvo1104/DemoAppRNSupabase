import React, {useCallback} from 'react';
import {Alert, Linking, Text, StyleSheet, Pressable} from 'react-native';

import {useTheme} from '../../themes';
import type {Theme} from '../../themes';
interface LinkProps {
  url: string;
  children: string;
}

export const Link: React.FC<LinkProps> = ({url, children}) => {
  const {theme} = useTheme();
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <Pressable onPress={handlePress}>
      <Text style={styles(theme).link}>{children}</Text>
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    link: {
      color: theme.colors.primary,
    },
  });

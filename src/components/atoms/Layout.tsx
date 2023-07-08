import React, {useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
} from 'react-native';

import {useTheme} from '../../themes';
import type {Theme} from '../../themes';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({children}: LayoutProps) => {
  const {theme} = useTheme();
  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    const statusBarStyle = theme.colors.statusBar as StatusBarStyle;
    StatusBar.setBarStyle(statusBarStyle);
  }, [theme]);

  if (isAndroid) {
    return (
      <View style={styles(theme).layoutAndroid}>
        <StatusBar />
        {children}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles(theme).layoutIOS}>
      <StatusBar />
      {children}
    </SafeAreaView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    layoutAndroid: {
      flex: 1,
      paddingTop: 25,
      backgroundColor: theme.colors.mainBackground,
    },
    layoutIOS: {
      flex: 1,
      backgroundColor: theme.colors.mainBackground,
    },
  });

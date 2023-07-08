import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {LoginScreen} from '../screens/auth/LoginScreen';

export type AuthStackParamList = {
  Login: undefined;
};

export type AuthNavProps<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

const Stack = createNativeStackNavigator();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

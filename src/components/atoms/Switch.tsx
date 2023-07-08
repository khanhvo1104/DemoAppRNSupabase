import React from 'react';
import {Switch as RNSwitch} from 'react-native';

import {useTheme} from '../../themes';

export const Switch: React.FC = () => {
  const {isDarkMode, setDarkMode} = useTheme();

  return (
    <RNSwitch
      onValueChange={switchState => setDarkMode(switchState)}
      value={isDarkMode}
    />
  );
};

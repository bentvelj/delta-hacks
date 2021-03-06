import { Switch, useColorMode } from '@chakra-ui/react';
import React from 'react';

interface ColorToggleProps {}

export const ColorToggle: React.FC<ColorToggleProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Switch id="lightdark" size="lg" onChange={toggleColorMode}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Switch>
  );
};

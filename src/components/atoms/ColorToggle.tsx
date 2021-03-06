import { Switch, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';
import styled from 'styled-components';

interface ColorToggleProps {}

export const ColorToggle: React.FC<ColorToggleProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  if(colorMode === "light") {
    return (
      <FlexContainer>
        <StyledWrapper><SunIcon/></StyledWrapper>
        <StyledWrapper><StyledSwitch id="lightdark" size="lg" onChange={toggleColorMode}/></StyledWrapper>
      </FlexContainer>
    );
  }

  return (
    <FlexContainer>
        <StyledWrapper><MoonIcon/></StyledWrapper>
        <StyledWrapper><StyledSwitch id="lightdark" size="lg" onChange={toggleColorMode}/></StyledWrapper>
      </FlexContainer>
  );
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
`;

const StyledWrapper = styled.div`

`;

const StyledSwitch = styled(Switch)`
  margin-left: 7px;
`;

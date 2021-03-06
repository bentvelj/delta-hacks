import { Switch, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';
import styled from 'styled-components';

interface ColorToggleProps {}

export const ColorToggle: React.FC<ColorToggleProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <FlexContainer className="color-toggle-container">
      <StyledWrapper>
        {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
      </StyledWrapper>
      <StyledWrapper>
        <StyledSwitch id="lightdark" size="lg" onChange={toggleColorMode} />
      </StyledWrapper>
    </FlexContainer>
  );
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledWrapper = styled.div``;

const StyledSwitch = styled(Switch)`
  margin-left: 10px;
`;

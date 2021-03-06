import { theme, Switch, useColorMode } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import { ColorToggle } from '../atoms/ColorToggle';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <StyledContainer className="container">
      <StyledInnerContainer>
        <StyledText theme={theme}>Delta Hacks!</StyledText>
        <StyledToggleWrapper>
          <ColorToggle />
        </StyledToggleWrapper>
      </StyledInnerContainer>
    </StyledContainer>
  );
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled(FlexContainer)`
  width: 100%;
  height: 150px;
`;

const StyledInnerContainer = styled(FlexContainer)`
  height: 75%;
  width: 75%;
  position: relative;
  flex-wrap: wrap;
`;

const StyledToggleWrapper = styled.div`
  position: absolute;
  right: 40px;
`;

const StyledText = styled.h1`
  font-weight: bold;
  color: ${theme.colors.teal[200]};
  font-size: ${theme.fontSizes['6xl']};
`;

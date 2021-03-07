import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { useColorModeValue } from "@chakra-ui/react"

interface LogoProps {}

export const Logo: React.FC<LogoProps> = () => {
  const colour = useColorModeValue(theme.colors.gray[50], 'black');

  return (
    <StyledLogoWrapper>
      <StyledText color={colour}>COVID in Canada</StyledText>
    </StyledLogoWrapper>
  );
};

const StyledLogoWrapper = styled.div`
  /* width: 400px; */
`;

const StyledText = styled.h1`
  font-weight: bold;
  font-size: ${theme.fontSizes['5xl']};
`;

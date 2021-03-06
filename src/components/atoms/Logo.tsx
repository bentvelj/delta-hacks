import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <StyledLogoWrapper>
      <StyledText>Covid Mapper</StyledText>
    </StyledLogoWrapper>
  );
};

const StyledLogoWrapper = styled.div`
  /* width: 400px; */
`;

const StyledText = styled.h1`
  font-weight: bold;
  color: ${theme.colors.gray[50]};
  font-size: ${theme.fontSizes['5xl']};
`;

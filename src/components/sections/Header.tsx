import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { ColorToggle } from '../atoms/ColorToggle';
import { MenuItem } from '../atoms/MenuItem';
import { Menu } from '../containers/Menu';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <StyledContainer className="container">
      <StyledInnerContainer>
        <StyledLogoWrapper>
          <StyledText>Covid Mapper</StyledText>
        </StyledLogoWrapper>
        <Menu />
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
  min-height: 200px;
`;

const StyledInnerContainer = styled(FlexContainer)`
  height: 75%;
  width: 80%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledLogoWrapper = styled.div`
  width: 400px;
`;

const StyledText = styled.h1`
  font-weight: bold;
  color: ${theme.colors.teal[200]};
  font-size: ${theme.fontSizes['5xl']};
`;

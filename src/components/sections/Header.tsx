import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { ColorToggle } from '../atoms/ColorToggle';
import { MenuItem } from '../atoms/MenuItem';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <StyledContainer className="container">
      <StyledInnerContainer>
        <StyledText>Covid Mapper</StyledText>
        <StyledMenuWrapper>
          <MenuItem type="github" />
          <ColorToggle />
        </StyledMenuWrapper>
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
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
`;

const StyledText = styled.h1`
  font-weight: bold;
  color: ${theme.colors.teal[200]};
  font-size: ${theme.fontSizes['5xl']};
`;

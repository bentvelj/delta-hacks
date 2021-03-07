import React from 'react';
import styled from 'styled-components';
import { Logo } from '../atoms/Logo';
import { Menu } from '../containers/Menu';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <StyledContainer className="container">
      <StyledInnerContainer>
        <Logo />
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
  min-height: 150px;
`;

const StyledInnerContainer = styled(FlexContainer)`
  height: 75%;
  width: 80%;
  flex-wrap: wrap;
  justify-content: space-between;

  /* @media (max-width: 760px) {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  } */
`;

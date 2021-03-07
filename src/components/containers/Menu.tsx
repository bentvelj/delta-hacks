import React from 'react';
import styled from 'styled-components';
import { ColorToggle } from '../atoms/ColorToggle';
import { MenuItem } from '../atoms/MenuItem';

export const Menu: React.FC = ({}) => {
  return (
    <StyledMenuContainer>
      <MenuItem type="github" />
      <MenuItem type="API" />
      <ColorToggle />
    </StyledMenuContainer>
  );
};

const StyledMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 250px;

  /* @media (max-width: 760px) {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  } */
`;

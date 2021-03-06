import React from 'react';
import styled from 'styled-components';
import { ColorToggle } from '../atoms/ColorToggle';
import { MenuItem } from '../atoms/MenuItem';

export const Menu: React.FC = ({}) => {
  return (
    <StyledMenuContainer>
      <MenuItem type="github" />
      <MenuItem type="docs" />
      <StyledToggleWrapper>
        <ColorToggle />
      </StyledToggleWrapper>
    </StyledMenuContainer>
  );
};

const StyledMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 200px;
`;

const StyledToggleWrapper = styled.div`
  margin-left: 10px;
`;

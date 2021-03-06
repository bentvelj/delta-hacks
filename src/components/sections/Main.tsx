import React from 'react';
import styled from 'styled-components';
import { Projection } from '../atoms/Projection';
import { InfoContainer } from '../containers/InfoContainer';

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  return (
    <StyledContainer>
      <InfoContainer />
      <Projection />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

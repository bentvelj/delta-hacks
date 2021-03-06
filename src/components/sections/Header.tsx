import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import styled from 'styled-components';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <StyledContainer className="container">
      <StyledInnerContainer>
        <Text fontSize="6xl" colorScheme="blue" >Delta Hacks!</Text>
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
  height: 200px;
`;

const StyledInnerContainer = styled(FlexContainer)`
  height: 75%;
  width: 75%;
`;

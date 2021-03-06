import React from 'react';
import styled from 'styled-components';
import { theme } from '@chakra-ui/react';

interface SliderPanelProps {

}

export const SliderPanel: React.FC<SliderPanelProps> = ({ }) => {
  return (
    <StyledContainer>
      <StyledInnerContainer theme={theme}>
        <label>Slider</label>
      </StyledInnerContainer>
    </StyledContainer>
  );
}

const FlexContainer = styled.div`

  display: flex;
  
`;

const StyledContainer = styled(FlexContainer)`
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
`;

const StyledInnerContainer = styled(FlexContainer)`
  width: 75%;
  height: 100%;
  background-color: ${theme.colors.gray[100]};
  border-radius: 10px;
  padding: 40px;
`;
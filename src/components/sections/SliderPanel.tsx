import React from 'react'
import styled from 'styled-components'

interface SliderPanelProps {

}

export const SliderPanel: React.FC<SliderPanelProps> = ({ }) => {
  return (
    <StyledContainer>
      <label>Slider</label>
    </StyledContainer>
  );
}

const FlexContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled(FlexContainer)`
  width: 100%;
`;
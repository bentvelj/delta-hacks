import React from 'react';
import styled from 'styled-components';
import { ColorMode, theme, useColorMode } from '@chakra-ui/react';

interface SliderPanelProps {}

export const SliderPanel: React.FC<SliderPanelProps> = ({}) => {
  const { colorMode } = useColorMode();

  return (
    <StyledContainer>
      <StyledInnerContainer colorMode={colorMode}>
        <label>Slider</label>
      </StyledInnerContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
`;

const StyledInnerContainer = styled.div<{ colorMode: ColorMode }>`
  display: flex;
  width: 75%;
  height: 100%;
  background-color: ${({ colorMode }) =>
    colorMode === 'light' ? theme.colors.gray[100] : theme.colors.gray[700]};
  border-radius: 10px;
  padding: 40px;
`;

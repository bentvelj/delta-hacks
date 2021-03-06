import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorMode, theme, useColorMode,  Slider, SliderTrack, SliderFilledTrack, SliderThumb, } from '@chakra-ui/react';

interface SliderPanelProps {}

export const SliderPanel: React.FC<SliderPanelProps> = ({}) => {
  const { colorMode } = useColorMode();
  const [ date, changeDate ] = useState();

  return (
    <StyledContainer>
      <StyledInnerContainer colorMode={colorMode}>
        <Slider aria-label="slider-ex-2" colorScheme="pink" defaultValue={30} onChangeEnd={(val) => console.log(val)}>
          <SliderTrack>
            <SliderFilledTrack/>
          </SliderTrack>

          <SliderThumb/>
        </Slider>
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

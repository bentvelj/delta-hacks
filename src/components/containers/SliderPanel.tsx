import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ColorMode,
  theme,
  useColorMode,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

interface SliderPanelProps {}

export const SliderPanel: React.FC<SliderPanelProps> = ({}) => {
  const { colorMode } = useColorMode();
  const [date, changeDate] = useState();
  const [value, setValue] = useState(30);

  return (
    <StyledContainer>
      <StyledInnerContainer colorMode={colorMode}>
        <StyledInfoWrapper>Value = {value}</StyledInfoWrapper>
        <Slider
          aria-label="slider-ex-2"
          colorScheme="teal"
          defaultValue={30}
          onChange={(val) => setValue(val)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
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
  flex-direction: column;
  width: 75%;
  height: 100%;
  background-color: ${({ colorMode }) =>
    colorMode === 'light' ? theme.colors.gray[100] : theme.colors.gray[700]};
  border-radius: 10px;
  padding: 20px;
`;

const StyledInfoWrapper = styled.div``;

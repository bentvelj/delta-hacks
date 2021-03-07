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
  const [ sliderPercantage, changeSliderPercantage ] = useState(100);

  const startDate = new Date("1/25/2020")
  const presentDate = new Date();

  const diffOfTimeFromFirstToPresent = Math.abs(presentDate.getTime() - startDate.getTime());
  const diffOfDaysFromFirstToPresent = Math.ceil(diffOfTimeFromFirstToPresent / (1000 * 60 * 60 * 24)); 

  const diffOfDaysFromFirstToSelected = (sliderPercantage / 100) * diffOfDaysFromFirstToPresent;
  const diffOfTimeFromFirstToSelected = diffOfDaysFromFirstToSelected * (1000 * 60 * 60 * 24);

  const selectedDate = new Date(startDate.getTime() + diffOfTimeFromFirstToSelected);

  return (
    <StyledContainer>
      <StyledInnerContainer colorMode={colorMode}>
        <StyledInfoWrapper>Date Selected: {selectedDate.toDateString()}</StyledInfoWrapper>
        <Slider
          aria-label="slider-ex-2"
          colorScheme="teal"
          defaultValue={sliderPercantage}
          onChange={(value) => changeSliderPercantage(value)}
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

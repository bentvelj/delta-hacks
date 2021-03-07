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
import calculateDate from '../../utils/calculateDate';
import calculatePercentage from '../../utils/calculatePercentage';
import { useColorModeValue } from "@chakra-ui/react"

interface SliderPanelProps {
  handleSliderChange: (date: string) => Promise<void>;
}

export const SliderPanel: React.FC<SliderPanelProps> = ({
  handleSliderChange
}) => {
  const presentDatePercentage = calculatePercentage();
  const { colorMode } = useColorMode();
  const [sliderPercantage, changeSliderPercantage] = useState(presentDatePercentage);

  const colour = useColorModeValue(theme.colors.gray[300], theme.colors.gray[700]);

  const selectedDate = calculateDate(sliderPercantage);
  const formattedSelectedDate =
    selectedDate.getDate() +
    '-' +
    (selectedDate.getMonth() + 1) +
    '-' +
    selectedDate.getFullYear();

  const onSlideChange = () => {
    handleSliderChange(formattedSelectedDate);
  };

  return (
    <StyledContainer>
      <StyledInnerContainer colorMode={colorMode} style={{backgroundColor: colour}}>
        <StyledInfoWrapper>
          Date Selected: {selectedDate.toDateString()}
        </StyledInfoWrapper>
        <Slider
          aria-label="slider-ex-2"
          colorScheme={sliderPercantage <= presentDatePercentage ? "teal" : "red"}
          defaultValue={presentDatePercentage}
          onChange={(value) => changeSliderPercantage(value)}
          onMouseUp={() => onSlideChange()}
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
  margin-bottom: 15px;
`;

const StyledInnerContainer = styled.div<{ colorMode: ColorMode }>`
  display: flex;
  flex-direction: column;
  width: 75%;
  max-width: 1400px;
  height: 100%;
  border-radius: 10px;
  padding: 20px;
  box-shadow: ${theme.shadows.lg};
`;

const StyledInfoWrapper = styled.div``;

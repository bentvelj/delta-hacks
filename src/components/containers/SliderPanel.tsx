import React, { useEffect, useState } from 'react';
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

interface SliderPanelProps {
  // onDateChange: (formattedSelectedDate: string) => void;
  handleSlideChange: (date: string) => Promise<void>;
}

export const SliderPanel: React.FC<SliderPanelProps> = ({
  handleSlideChange,
}) => {
  const { colorMode } = useColorMode();
  const [sliderPercantage, changeSliderPercantage] = useState(100);

  const selectedDate = calculateDate(sliderPercantage);
  const formattedSelectedDate =
    selectedDate.getDate() +
    '-' +
    (selectedDate.getMonth() + 1) +
    '-' +
    selectedDate.getFullYear();

  const onSlideChange = (value: number) => {
    changeSliderPercantage(value);
    handleSlideChange(formattedSelectedDate);
  };

  // useEffect(() => {
  //   onDateChange(formattedSelectedDate);
  // });

  return (
    <StyledContainer>
      <StyledInnerContainer colorMode={colorMode}>
        <StyledInfoWrapper>
          Date Selected: {selectedDate.toDateString()}
        </StyledInfoWrapper>
        <Slider
          aria-label="slider-ex-2"
          colorScheme="teal"
          defaultValue={sliderPercantage}
          onChange={(value) => onSlideChange(value)}
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
  background-color: ${({ colorMode }) =>
    colorMode === 'light' ? theme.colors.gray[100] : theme.colors.gray[700]};
  border-radius: 10px;
  padding: 20px;
  box-shadow: ${theme.shadows.lg};
`;

const StyledInfoWrapper = styled.div``;

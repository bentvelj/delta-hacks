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
  onDateChange: (formattedSelectedDate: string) => void;
}

export const SliderPanel: React.FC<SliderPanelProps> = ({ onDateChange }) => {
  const { colorMode } = useColorMode();
  const [sliderPercantage, changeSliderPercantage] = useState(100);

  const selectedDate = calculateDate(sliderPercantage);
  const formattedSelectedDate =
    selectedDate.getDate() +
    '-' +
    (selectedDate.getMonth() + 1) +
    '-' +
    selectedDate.getFullYear();
    
  console.log('formateed date', formattedSelectedDate);
  console.log('selected date', selectedDate.toString());

  useEffect(() => {
    onDateChange(formattedSelectedDate);
  });

  // onDateChange(formattedSelectedDate);
  /* fetch(`https://api.opencovid.ca/timeseries?stat=cases&loc=prov&date=01-09-2020`)
            .then(response => response.json())
            .then(function (data) {

                let lat = data.results[0].geometry.location.lat;
                let lng = data.results[0].geometry.location.lng;
                obj.setState({ location: { latitude: lat, longitude: lng } })
            })
            .catch(err => {
                console.log(err)
            }) */

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

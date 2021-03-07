import { randomInt } from 'd3-random';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getAllJSDocTags } from 'typescript';
import { ButtonEvent, ProvinceName } from '../../utils/types';
import { Projection } from '../atoms/Projection';
import { InfoContainer } from '../containers/InfoContainer';
import { SliderPanel } from '../containers/SliderPanel';

interface MainProps {
  // arr: string[];
}

export const Main: React.FC<MainProps> = ({}) => {
  const [province, setProvince] = useState<string>('ontario');
  const [date, setDate] = useState<string>('11-09-2000');
  // const [numbersList, changeNumbersList] = useState<number[]>([]);

  // const getData = () => {
  //   var arr = [];
  //   for (var i = 0; i >= 12; i++) {
  //     arr.push(Math.floor(Math.random() * 100));
  //   }
  //   changeNumbersList(arr);
  // };

  const handleClick = (event: ButtonEvent, geo: any) => {
    setProvince(geo.properties.gn_name);
  };

  const handleDateChangeEvent = (date: string) => {
    console.log(date);
    setDate(date);
    // getData();
  };

  fetch(`https://api.opencovid.ca/timeseries?stat=cases&loc=prov&date=01-09-2020`)
            .then(response => response.json())
            .then(function (data) {

                let lat = data.results[0].geometry.location.lat;
                let lng = data.results[0].geometry.location.lng;
                obj.setState({ location: { latitude: lat, longitude: lng } })
            })
            .catch(err => {
                console.log(err)
  })

  return (
    <>
      <StyledContainer>
        <Projection onHover={handleClick} province={province} />
        <InfoContainer province={province} />
      </StyledContainer>

      <SliderPanel onDateChange={handleDateChangeEvent}></SliderPanel>
    </>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 1746px) {
    flex-direction: column;
  }
`;

import { Button } from '@chakra-ui/react';
import { randomInt } from 'd3-random';
import React, { useState, useEffect } from 'react';
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
  const [numberList, changeNumbersList] = useState<number[]>([]);
  const [caseGradient, setCaseGradient] = useState<boolean>(false);
  // const [numbersList, changeNumbersList] = useState<number[]>([]);

  // const getData = () => {
  //   var arr = [];
  //   for (var i = 0; i >= 12; i++) {
  //     arr.push(Math.floor(Math.random() * 100));
  //   }
  //   changeNumbersList(arr);
  // };

  const handleClick = (event: ButtonEvent, geo: any) => {
    console.log(geo.properties.gn_name);
    setProvince(geo.properties.gn_name);
  };

  const handleDateChangeEvent = (date: string) => {
    console.log(date);
    setDate(date);
  };

  useEffect(() => {
    changeNumbersList(getProvinceValues());
  }, [date]);
  const handleToggler = () => {
    console.log(caseGradient);
    setCaseGradient(!caseGradient);
  };

  let provinceAbbreviation;

  switch(province) {
    case 'Ontario':
      provinceAbbreviation = 'ON';
      break;
    case 'Manitoba':
      provinceAbbreviation = 'MB';
      break;
    case 'Saskatchewan':
      provinceAbbreviation = 'SK';
      break;
    case 'Alberta':
      provinceAbbreviation = 'AB';
      break;
    case 'British Columbia':
      provinceAbbreviation = 'BC';
      break;
    case 'Yukon':
      provinceAbbreviation = 'YT';
      break;
    case 'Northwest Territories':
      provinceAbbreviation = 'NT';
      break;
    case 'Nunavut':
      provinceAbbreviation = 'NU';
      break;
    case 'Newfoundland and Labrador':
      provinceAbbreviation = 'NL';
      break;
    case 'Prince Edward Island':
      provinceAbbreviation = 'PE';
      break;
    case 'Nova Scotia':
      provinceAbbreviation = 'NS';
      break;
    case 'New Brunswick':
      provinceAbbreviation = 'NB';
      break;
    case 'Quebec':
      provinceAbbreviation = 'QC';
      break;
    default:
      provinceAbbreviation = "ON";
  }

  let activeCases;
  let culminativeCases;
  let culminativeDeaths;
  let culminativeRecovered;

  console.log(`https://api.opencovid.ca/timeseries?loc=${provinceAbbreviation}&date=${date}`)

  let dateArray = date.split("-");
  let selectedDateObject = new Date(parseInt(dateArray[2]), parseInt(dateArray[1]) - 1, parseInt(dateArray[0]));  

  if(selectedDateObject.getTime() < Date.now()) {
    fetch(`https://api.opencovid.ca/timeseries?loc=${provinceAbbreviation}&date=${date}`).then(response => response.json()).then(function (data) {
      //console.log(data.active[0]);
      activeCases = data.active[0].active_cases;
      culminativeCases = data.active[0].cumulative_cases;
      culminativeDeaths = data.active[0].cumulative_deaths;
      culminativeRecovered = data.active[0].cumulative_recovered;   
    }).catch(err => console.log(err));

    console.log(activeCases);
    console.log(culminativeCases);
    console.log(culminativeDeaths);
    console.log(culminativeRecovered);
  }

  return (
    <>
      <StyledContainer>
        <Projection
          onHover={handleClick}
          province={province}
          caseGradient={caseGradient}
          numberList={numberList}
        />
        <InfoContainer
          province={province}
          onTogglerClick={handleToggler}
          caseGradient={caseGradient}
        />
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

function getProvinceValues(): number[] {
  let arr: number[] = [];
  for (let i = 0; i <= 12; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  // console.log(arr);
  return arr;
}

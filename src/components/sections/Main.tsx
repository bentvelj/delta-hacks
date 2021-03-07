import { Button } from '@chakra-ui/react';
import { randomInt } from 'd3-random';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllJSDocTags } from 'typescript';
import { generateAbbrev } from '../../utils/generateAbbrev';
import { ButtonEvent, ProvinceName } from '../../utils/types';
import { Projection } from '../atoms/Projection';
import { InfoContainer } from '../containers/InfoContainer';
import { SliderPanel } from '../containers/SliderPanel';

interface MainProps {
  // arr: string[];
}

export interface ICovidData {
    activeCases: number,
    dailyCases: number,
    culminativeCases: number,
    dailyDeaths: number,
    culminativeDeaths: number,
    dailyTested: number,
    culminativeTested: number,
    culminativeRecovered: number
}

export const Main: React.FC<MainProps> = ({}) => {
  const [province, setProvince] = useState<string>('ontario');
  const [date, setDate] = useState<string>('11-09-2000');
  const [numberList, changeNumbersList] = useState<number[]>([]);
  const [caseGradient, setCaseGradient] = useState<boolean>(false);

  const [covidData, setCovidData] = useState<ICovidData>({
    activeCases: 0,
    dailyCases: 0,
    culminativeCases: 0,
    dailyDeaths: 0,
    culminativeDeaths: 0,
    dailyTested: 0,
    culminativeTested: 0,
    culminativeRecovered: 0
  });

  const handleClick = (event: ButtonEvent, geo: any) => {
    console.log(geo.properties.gn_name);
    setProvince(geo.properties.gn_name);
  };

  const handleDateChangeEvent = (date: string) => {
    console.log(date);
    setDate(date);
  };

  const handleToggler = () => {
    console.log(caseGradient);
    setCaseGradient(!caseGradient);
  };

  // API STUFF ============================================================

  const onSlide = async () => {
    let provinceAbbreviation = generateAbbrev(province); // generate abbreviations

    let dateArray = date.split('-');
    let selectedDateObject = new Date(
      parseInt(dateArray[2]),
      parseInt(dateArray[1]) - 1,
      parseInt(dateArray[0])
    );

    if (selectedDateObject.getTime() < Date.now()) {
      const response = await fetch(
        `https://api.opencovid.ca/timeseries?loc=${provinceAbbreviation}&date=${date}`
      );
      const data = await response.json();
      setCovidData({
        activeCases: data.active[0].active_cases,
        dailyCases: data.cases[0].cases,
        culminativeCases: data.active[0].cumulative_cases,
        dailyDeaths: data.mortality[0].deaths,
        culminativeDeaths: data.active[0].cumulative_deaths,
        dailyTested: data.testing[0].testing,
        culminativeTested: data.testing[0].cumulative_testing,
        culminativeRecovered: data.active[0].cumulative_recovered,
      });
    }
  };

  useEffect(() => {
    changeNumbersList(getProvinceValues());
  }, [date]);

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
          covidData={covidData}
          province={province}
          onTogglerClick={handleToggler}
          caseGradient={caseGradient}
        />
      </StyledContainer>

      <SliderPanel
        onDateChange={handleDateChangeEvent}
        onSlideChangeTwo={onSlide}
      ></SliderPanel>
    </>
  );
};

/**
 * styled -------------------------------------------------------
 */
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

import React, { useState } from 'react';
import styled from 'styled-components';
import { generateAbbrev } from '../../utils/generateAbbrev';
import { ButtonEvent } from '../../utils/types';
import { Legend } from '../atoms/Legend';
import { Projection } from '../atoms/Projection';
import { InfoContainer } from '../containers/InfoContainer';
import { SliderPanel } from '../containers/SliderPanel';

interface MainProps {
  // arr: string[];
}

export interface ICovidData {
  activeCases: number | string;
  dailyCases: number | string;
  culminativeCases: number | string;
  dailyDeaths: number | string;
  culminativeDeaths: number | string;
  dailyTested: number | string;
  culminativeTested: number | string;
  culminativeRecovered: number | string;
}

export const Main: React.FC<MainProps> = () => {
  const [province, setProvince] = useState<string>('Ontario');
  const [date, setDate] = useState<string>('11-09-2000');
  const [numberlist, changeNumbersList] = useState<number[]>([]);
  const [casegradient, setcasegradient] = useState<boolean>(false);
  const [covidData, setCovidData] = useState<ICovidData>({
    activeCases: 0,
    dailyCases: 0,
    culminativeCases: 0,
    dailyDeaths: 0,
    culminativeDeaths: 0,
    dailyTested: 0,
    culminativeTested: 0,
    culminativeRecovered: 0,
  });

  const populaitons: number[] = [
    4371000,
    5071000,
    776827,
    521542,
    38780,
    971395,
    44826,
    14570000,
    156947,
    8485000,
    1174000,
    35874,
    1369000,
  ];
  let population;

  console.log(province);

  switch (province) {
    case 'Alberta': {
      population = populaitons[0];
      break;
    }
    case 'British Columbia': {
      population = populaitons[1];
      break;
    }
    case 'New Bruinswick': {
      population = populaitons[2];
      break;
    }
    case 'Newfoundland and Labrador': {
      population = populaitons[3];
      break;
    }
    case 'Nunavut': {
      population = populaitons[4];
      break;
    }
    case 'Nova Scotia': {
      population = populaitons[5];
      break;
    }
    case 'Northwest Territories': {
      population = populaitons[6];
      break;
    }
    case 'Ontario': {
      population = populaitons[7];
      break;
    }
    case 'Prince Edward Island': {
      population = populaitons[8];
      break;
    }
    case 'Quebec': {
      population = populaitons[9];
      break;
    }
    case 'Saskatchewan': {
      population = populaitons[10];
      break;
    }
    case 'Yukon': {
      population = populaitons[11];
      break;
    }
    case 'Manitoba': {
      population = populaitons[12];
      break;
    }
    default: {
      population = populaitons[0];
      break;
    }
  }

  const handleClick = (event: ButtonEvent, geo: any) => {
    setProvince(geo.properties.gn_name);
    onSlide(date);
  };

  const handleToggler = () => {
    setcasegradient(!casegradient);
  };

  // API STUFF ============================================================

  const onSlide = async (date: string) => {
    setDate(date);
    let provinceAbbreviation = generateAbbrev(province); // generate abbreviations

    let dateArray = date.split('-');
    let selectedDateObject = new Date(
      parseInt(dateArray[2]),
      parseInt(dateArray[1]) - 1,
      parseInt(dateArray[0])
    );

    if (selectedDateObject.getTime() < Date.now() - 1000 * 60 * 60 * 24) {
      const response = await fetch(
        `https://api.opencovid.ca/timeseries?loc=${provinceAbbreviation}&date=${date}`
      );

      const data = await response.json();

      let activeCases,
        dailyCases,
        dailyTested,
        dailyDeaths,
        culminativeCases,
        culminativeTested,
        culminativeDeaths,
        culminativeRecovered;

      try {
        activeCases = data.active[0].active_cases;
      } catch (error) {
        activeCases = 0;
      }
      try {
        dailyCases = data.cases[0].cases;
      } catch (error) {
        dailyCases = 0;
      }
      try {
        dailyTested = data.testing[0].testing;
      } catch (error) {
        dailyTested = 0;
      }
      try {
        dailyDeaths = data.mortality[0].deaths;
      } catch (error) {
        dailyDeaths = 0;
      }
      try {
        culminativeCases = data.active[0].cumulative_cases;
      } catch (error) {
        culminativeCases = 0;
      }
      try {
        culminativeTested = data.testing[0].cumulative_testing;
      } catch (error) {
        culminativeTested = 0;
      }
      try {
        culminativeDeaths = data.active[0].cumulative_deaths;
      } catch (error) {
        culminativeDeaths = 0;
      }
      try {
        culminativeRecovered = data.active[0].cumulative_recovered;
      } catch (error) {
        culminativeRecovered = 0;
      }

      setCovidData({
        activeCases: activeCases,
        dailyCases: dailyCases,
        culminativeCases: culminativeCases,
        dailyDeaths: dailyDeaths,
        culminativeDeaths: culminativeDeaths,
        dailyTested: dailyTested,
        culminativeTested: culminativeTested,
        culminativeRecovered: culminativeRecovered,
      });

      const responseCountry = await fetch(
        `https://api.opencovid.ca/timeseries?loc=prov&date=${date}`
      );
      const dataCountry = await responseCountry.json();
      console.log(dataCountry);
      changeNumbersList(getProvinceValues(dataCountry.active));
    }
  };

  return (
    <>
      <StyledContainer>
        {casegradient ? <Legend></Legend> : ''}
        <Projection
          onHover={handleClick}
          province={province}
          casegradient={casegradient}
          numberlist={numberlist}
        />
        <InfoContainer
          covidData={covidData}
          province={province}
          population={population}
          onTogglerClick={handleToggler}
          casegradient={casegradient}
        />
      </StyledContainer>

      <SliderPanel handleSliderChange={onSlide}></SliderPanel>
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

function getProvinceValues(dataCountry: any): number[] {
  let arr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  console.log(dataCountry);
  for (let item of dataCountry) {
    // console.log(item);
    let pop = 0;
    let cases = item.active_cases;
    let location = 0;
    if (item.province !== 'Repatriated') {
      switch (item.province) {
        case 'Alberta': {
          pop = 4371000;
          location = 2;
          break;
        }
        case 'BC': {
          pop = 5071000;
          location = 3;
          break;
        }

        case 'New Brunswick': {
          pop = 776827;
          location = 9;
          break;
        }
        case 'NL': {
          pop = 521542;
          location = 11;
          break;
        }
        case 'Nunavut': {
          pop = 38780;
          location = 4;
          break;
        }
        case 'Nova Scotia': {
          pop = 971395;
          location = 10;
          break;
        }
        case 'NWT': {
          pop = 44826;
          location = 5;
          break;
        }
        case 'Ontario': {
          pop = 14570000;
          location = 7;
          break;
        }
        case 'PEI': {
          pop = 156947;
          location = 12;
          break;
        }
        case 'Quebec': {
          pop = 8485000;
          location = 8;
          break;
        }
        case 'Saskatchewan': {
          pop = 1174000;
          location = 1;
          break;
        }
        case 'Yukon': {
          pop = 35874;
          location = 6;
          break;
        }
        case 'Manitoba': {
          pop = 1369000;
          location = 0;
          break;
        }
        default: {
          //manitoba values
          console.log(item);
          pop = 1369000;
          location = 0;
          break;
        }
      }
      // console.log(location, pop, cases);
      arr[location] = getScore(pop, cases);
    }
  }
  console.log(arr);
  return arr;
}

function getScore(pop: number, cases: number) {
  return (cases / (pop * 0.004)) * 100;
}

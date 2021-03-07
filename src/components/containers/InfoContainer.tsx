import { ColorMode, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { CaseToggle } from '../atoms/CaseToggle';
import { ProvinceMarkers } from '../atoms/ProvinceMarkers';
import { ICovidData } from '../sections/Main';

interface InfoContainerProps {
  province: string;
  population: number;
  onTogglerClick: () => void;
  casegradient: boolean;
  covidData: ICovidData;
}

export const InfoContainer: React.FC<InfoContainerProps> = ({
  province,
  population,
  casegradient,
  onTogglerClick,
  covidData,
}) => {
  const { colorMode } = useColorMode();
  const colour = useColorModeValue(theme.colors.gray[300], theme.colors.gray[700]);

  return (
    <StyledContainer colorMode={colorMode} style={{backgroundColor: colour}}>
      <ProvinceMarkers
        name={province}
        population={population}
        covidData={covidData}
      />
      <CaseToggle
        casegradient={casegradient}
        onTogglerClick={onTogglerClick}
      ></CaseToggle>
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ colorMode: ColorMode }>`
  width: 450px;
  height: 400px;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: ${theme.shadows.lg};
  @media (max-width: 1746px) {
    width: 75%;
    height: auto;
    margin-bottom: 10px;
  }
`;

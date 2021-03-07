import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonEvent, ProvinceName } from '../../utils/types';
import { Projection } from '../atoms/Projection';
import { InfoContainer } from '../containers/InfoContainer';
import { SliderPanel } from '../containers/SliderPanel';

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const [province, setProvince] = useState<string>('ontario');
  const [date, setDate] = useState<string>('11-09-2000');
  const [caseGradient, setCaseGradient] = useState<boolean>(false);

  const handleClick = (event: ButtonEvent, geo: any) => {
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

  return (
    <>
      <StyledContainer>
        <Projection onHover={handleClick} province={province} />
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

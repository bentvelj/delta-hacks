import React from 'react';
import styled from 'styled-components';

interface ProvinceMarkersProps {
  name: string;
  population: number;
  cases: number;
}

export const ProvinceMarkers: React.FC<ProvinceMarkersProps> = ({
  name,
  population,
  cases,
}) => {
  return (
    <StyledProviceDisplay>
      <h3>{name}</h3>
      <label>Population: {population}</label>
      <label>{cases}</label>
    </StyledProviceDisplay>
  );
};

const StyledProviceDisplay = styled.div`
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 40%;
  margin: 10px;
  border-radius: 5px;
`;

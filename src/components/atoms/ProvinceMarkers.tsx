import React from 'react';

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
    <div>
      <label>{name}</label>
      <label>{population}</label>
      <label>{cases}</label>
    </div>
  );
};

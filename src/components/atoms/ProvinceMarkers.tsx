import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { Text } from '@chakra-ui/react';

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
      <StyledTitle>Province Data</StyledTitle>
      <StyledKey>Name: </StyledKey>
      <StyledValue>{name}</StyledValue>
      <br />
      <StyledKey>Population: </StyledKey>
      <StyledValue>{population}</StyledValue>
      <br />
      <StyledKey>Cases: </StyledKey>
      <StyledValue>{cases}</StyledValue>
    </StyledProviceDisplay>
  );
};

const StyledProviceDisplay = styled.div`
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const StyledTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: bold;
  margin-bottom: 14px;
`;

const StyledKey = styled(Text)`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.gray[300]};
  font-weight: bold;
  display: inline;
`;

const StyledValue = styled(Text)`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.gray[300]};
  font-weight: normal;
  display: inline;
  text-transform: capitalize;
`;

import { ColorMode, useColorMode } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { ProvinceMarkers } from '../atoms/ProvinceMarkers';

interface InfoContainerProps {
  province: string;
}

export const InfoContainer: React.FC<InfoContainerProps> = ({province}) => {
  const { colorMode } = useColorMode();
  return <StyledContainer colorMode={colorMode}>
    <ProvinceMarkers name={province} population={100} cases={30}/>
  </StyledContainer>;
};

const StyledContainer = styled.div<{ colorMode: ColorMode }>`
  width: 450px;
  height: 400px;
  border-radius: 10px;
  box-shadow: ${theme.shadows.lg};
  background-color: ${({ colorMode }) =>
    colorMode === 'light' ? theme.colors.gray[100] : theme.colors.gray[700]};
  
  @media (max-width: 1746px) {
    width: 75%;
    height: auto;
    margin-bottom: 10px;
  }
`;

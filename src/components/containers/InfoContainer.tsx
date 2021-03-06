import { ColorMode, useColorMode } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

interface InfoContainerProps {}

export const InfoContainer: React.FC<InfoContainerProps> = ({}) => {
  const { colorMode } = useColorMode();
  return <StyledContainer colorMode={colorMode}></StyledContainer>;
};

const StyledContainer = styled.div<{ colorMode: ColorMode }>`
  width: 450px;
  height: 650px;
  margin-top: 50px;
  border-radius: 10px;
  box-shadow: ${theme.shadows.lg};
  background-color: ${({ colorMode }) =>
    colorMode === 'light' ? theme.colors.gray[100] : theme.colors.gray[700]};
`;

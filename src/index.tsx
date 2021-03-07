import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Header } from './components/sections/Header';
import { Main } from './components/sections/Main';
import theme from './theme';

const AppWrapper = styled.div`
  min-width: 925px;
`;

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AppWrapper>
        <Header />
        <Main />
      </AppWrapper>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

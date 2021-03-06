import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/sections/Header';
import { SliderPanel } from './components/SliderPanel';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Header />
      <SliderPanel />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

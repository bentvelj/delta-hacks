import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Projection } from './components/atoms/Projection';
import { Header } from './components/sections/Header';
import { SliderPanel } from './components/sections/SliderPanel';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <Header />
      <Projection />
      <SliderPanel />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

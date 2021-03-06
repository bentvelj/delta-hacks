import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/sections/Header';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Header/>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

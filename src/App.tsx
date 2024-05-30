import React from 'react';

import 'animate.css';

import 'swiper/css';
import 'swiper/css/bundle';

import '@src/component/i18n/init';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { RouterConfig } from '@src/router/index';
import { Web3ModalProvider } from '@src/component/wallconnect/web3ModalProvider';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './theme/index.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <Web3ModalProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={10}
          autoHideDuration={5 * 1000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <RouterConfig />
        </SnackbarProvider>
      </ThemeProvider>
    </Web3ModalProvider>
  );
}

export default App;

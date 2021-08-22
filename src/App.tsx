import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Home from './scenes/Home';
import Detail from './scenes/Detail/Detail';
import { ThemeProvider, Theme, StyledEngineProvider } from '@material-ui/core/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginPage from './scenes/LoginPage';
import AuthProvider from './providers/AuthProvider';
import EditEntry from './scenes/EditEntry';
import AddEntry from './scenes/AddEntry';
import ErrorProvider from './providers/ErrorProvider';
import ErrorModal from './scenes/ErrorModal';
import { ROUTES } from './consts';
import Settings from './scenes/Settings/Settings';
import TagEditor from './scenes/TagEditor/TagEditor';
import CurrentEntryProvider from './providers/CurrentEntryProvider';

declare module '@material-ui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <ErrorProvider>
            <CurrentEntryProvider>
              <Router>
                <Home path={ROUTES.HOME} />
                <Settings path={ROUTES.SETTINGS} />
                <TagEditor path={ROUTES.TAGS} />
                <LoginPage path={ROUTES.LOGIN} />
                <AddEntry path={ROUTES.ADD_ENTRY} />
                <EditEntry path={ROUTES.EDIT_ENTRY} />
                <Detail path={ROUTES.DETAIL} />
              </Router>
              <ErrorModal />
            </CurrentEntryProvider>
          </ErrorProvider>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

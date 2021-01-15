import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Home from './scenes/Home';
import Detail from './scenes/Detail/Detail';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginPage from './scenes/LoginPage';
import AuthProvider from './providers/AuthProvider';
import EditEntry from './scenes/EditEntry';
import AddEntry from './scenes/AddEntry';
import ErrorProvider from './providers/ErrorProvider';
import ErrorModal from './scenes/ErrorModal';
import useRestoreFromBackup from './services/useRestoreFromBackup';
import { ROUTES } from './consts';
import Settings from './scenes/Settings/Settings';
import TagEditor from './scenes/TagEditor/TagEditor';

export default function App() {
  useRestoreFromBackup();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ErrorProvider>
          <Router className="something">
            <Home path={ROUTES.HOME} />
            <Settings path={ROUTES.SETTINGS} />
            <TagEditor path={ROUTES.TAGS} />
            <AddEntry path="add" />
            <Detail path={ROUTES.DETAIL} />
            <EditEntry path="edit" />
            <LoginPage path={ROUTES.LOGIN} />
          </Router>
          <ErrorModal />
        </ErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

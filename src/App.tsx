import React from 'react';
import './App.css';
import { Router, Location } from '@reach/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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

const FadeTransitionRouter = (props: any) => (
  <Location>
    {({ location }) => (
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.key} classNames="fade" timeout={200}>
          {/* the only difference between a router animation and
              any other animation is that you have to pass the
              location to the router so the old screen renders
              the "old location" */}
          <Router location={location} className="router">
            {props.children}
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
);

export default function App() {
  useRestoreFromBackup();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ErrorProvider>
          <div className="app">
            <FadeTransitionRouter>
              <Home path={ROUTES.HOME} />
              <Detail path={ROUTES.DETAIL} />
              <LoginPage path={ROUTES.LOGIN} />
              <AddEntry path="add" />
              <EditEntry path="edit" />
              <Settings path={ROUTES.SETTINGS} />
              <TagEditor path={ROUTES.TAGS} />
            </FadeTransitionRouter>
          </div>
          <ErrorModal />
        </ErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

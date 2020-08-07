import React from 'react';
import './App.css';
import { Router, Location } from '@reach/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './scenes/Home';
import Detail from './scenes/Detail';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginPage from './scenes/LoginPage';
import AddEntry from './scenes/AddEntry/AddEntry';
import AuthProvider from './providers/AuthProvider';

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <div className="app">
          <FadeTransitionRouter>
            <Home path="/" />
            <Detail path="detail" />
            <LoginPage path="login" />
            <AddEntry path="add" />
          </FadeTransitionRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

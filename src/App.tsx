import React from 'react';
import './App.css';
import { Router, Link, Location } from '@reach/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './scenes/Home';
import Detail from './scenes/Detail';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';

const FadeTransitionRouter = (props: any) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
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
  </ThemeProvider>
);

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Page 1</Link>
        <Link to="detail">Detail</Link>
      </nav>

      <FadeTransitionRouter>
        <Home path="/" />
        <Detail path="detail" />
      </FadeTransitionRouter>
    </div>
  );
}

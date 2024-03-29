import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { useAuth } from '../../providers/AuthProvider';
// import { ROUTES } from '../../consts';
import store from '../store';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import { useAuth } from '../providers/AuthProvider';
import AppHeader from '../components/AppHeader';
import { Link } from '@reach/router';
import PageWidth from '../components/PageWidth';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
      // Process result. This will not trigger on merge conflicts.
      // On success redirect to signInSuccessUrl.
      return false;
    },
  },
};

export default function LoginPage(_: any) {
  const authStatus = useAuth();

  // useEffect(() => {
  //   if (authStatus === 'loggedIn') {
  //     navigate('/');
  //   }
  // }, [authStatus]);

  return (
    <PageWidth>
      <AppHeader>
        <Link to="/">Home</Link>
      </AppHeader>
      <p>Auth status: {authStatus}</p>
      {/*<button onClick={firebase.loginWithGoogle}>Login</button>*/}
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={store.auth} />
      <Button variant="outlined" onClick={() => store.auth.signOut()}>
        Sign out
      </Button>
    </PageWidth>
  );
}

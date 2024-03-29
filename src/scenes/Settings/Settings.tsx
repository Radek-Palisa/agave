import React from 'react';
import AppHeader from '../../components/AppHeader';
import { ROUTES } from '../../consts';
import BackButton from '../../components/BackButton';
import { Link, RouteComponentProps } from '@reach/router';
import PageWidth from '../../components/PageWidth';

export default function Settings(_: RouteComponentProps) {
  return (
    <PageWidth>
      <AppHeader>
        <BackButton to={ROUTES.HOME} />
        <span>Settings</span>
        <span />
      </AppHeader>
      <Link to={ROUTES.LOGIN}>Login</Link>
      <br />
      <br />
      <Link to={ROUTES.TAGS}>Edit labels</Link>
    </PageWidth>
  );
}

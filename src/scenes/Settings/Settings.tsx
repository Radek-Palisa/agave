import React from 'react';
import NavHeader from '../../components/NavHeader';
import { ROUTES } from '../../consts';
import BackButton from '../../components/BackButton';
import { Link, RouteComponentProps } from '@reach/router';

export default function Settings(_: RouteComponentProps) {
  return (
    <div className="page">
      <NavHeader>
        <BackButton to={ROUTES.HOME} />
        <span>Settings</span>
        <span />
      </NavHeader>
      <Link to={ROUTES.TAGS}>Edit labels</Link>
    </div>
  );
}

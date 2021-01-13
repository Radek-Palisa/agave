import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import Markdown from '../../components/Markdown';
import NavHeader from '../../components/NavHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DetailMenu } from './components/DetailMenu';
import { Entry } from '../../types';
import DetailDateTitle from './components/DetailDateTitle';
import { ROUTES } from '../../consts';

type Props = RouteComponentProps<{
  location: {
    state?: Entry;
  };
}>;

export default function Detail({ location }: Props) {
  return (
    <div className="page">
      <NavHeader>
        <Link to={ROUTES.HOME} state={{ id: location?.state?.id }}>
          <ArrowBackIcon />
        </Link>
        <DetailDateTitle date={location?.state?.date} />
        <DetailMenu itemData={location?.state} />
      </NavHeader>
      <div style={{ padding: '16px 20px 16px' }}>
        <h1>{location?.state?.title || 'No title'}</h1>
        <Markdown text={location?.state?.text || ''} />
      </div>
    </div>
  );
}

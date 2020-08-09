import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import Markdown from '../../components/Markdown';
import NavHeader from '../../components/NavHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DetailMenu } from './components/DetailMenu';
import { Entry } from '../../types';
import DetailDateTitle from './components/DetailDateTitle';

type Props = RouteComponentProps<{
  location: {
    state?: Entry;
  };
}>;

export default function Detail({ location }: Props) {
  return (
    <div className="page">
      <NavHeader>
        <Link to="/">
          <ArrowBackIcon />
        </Link>
        <DetailDateTitle date={location?.state?.date} />
        <DetailMenu itemData={location?.state} />
      </NavHeader>

      <Markdown text={location?.state?.text || ''} />
    </div>
  );
}

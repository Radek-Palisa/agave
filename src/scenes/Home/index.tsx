import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import DayEntry from '../../components/DayEntry';
import useGetEntriesOnMount from '../../services/useGetEntriesOnMount';
import MonthDelimiter from '../../components/MonthDelimiter';
import NavHeader from '../../components/NavHeader';
import { Typography } from '@material-ui/core';

export default function Home(props: RouteComponentProps) {
  const months = useGetEntriesOnMount();

  return (
    <div className="page">
      <NavHeader>
        <Link to="login">Login</Link>
        <Link to="add">Add</Link>
      </NavHeader>
      {months.data &&
        months.data.map(({ month, year, days }) => (
          <div key={`${month}-${year}`}>
            {days.map(({ day, entries }: any) => (
              <DayEntry key={day} day={day} entries={entries} />
            ))}
            <MonthDelimiter month={month} year={year} />
          </div>
        ))}
      {months.error && (
        <Typography variant="body1" color="error">
          {months.error.message}
        </Typography>
      )}
      {/* <Typography variant="h3">Heading3 48px</Typography>
      <Typography variant="h4">Heading4 34px</Typography>
      <Typography variant="h5">Heading5 24px</Typography>
      <Typography variant="h6">Heading6 20px</Typography>
      <Typography variant="subtitle1">Subtitle1 16px</Typography>
      <Typography variant="subtitle2">Subtitle2 14px</Typography>
      <Typography variant="body1">body1 16px</Typography>
      <Typography variant="body2">body2 14px</Typography>
      <Typography variant="button">Button 14px</Typography>
      <br />
      <Typography variant="caption">Caption 12px</Typography>
      <br />
      <Typography variant="overline">Overline 10px</Typography> */}
    </div>
  );
}

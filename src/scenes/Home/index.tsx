import React, { useEffect } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import DayEntry from '../../components/DayEntry';
import useGetEntriesOnMount from '../../services/useGetEntriesOnMount';
import MonthDelimiter from '../../components/MonthDelimiter';
import NavHeader from '../../components/NavHeader';
import { Divider, makeStyles } from '@material-ui/core';
import { ROUTES } from '../../consts';
import ErrorText from '../../components/ErrorText';
import Logo from '../../components/Logo';

type Props = RouteComponentProps<{
  location: {
    state?: {
      id: string;
    };
  };
}>;

const useStyles = makeStyles({
  entriesRoot: {
    overflow: 'scroll',
    height: 'calc(100vh - 60px - 56px)',
  },
});

export default function Home({ location }: Props) {
  const classes = useStyles();
  const monthEntries = useGetEntriesOnMount();
  const locationState = location?.state;

  useEffect(() => {
    if (monthEntries.data && locationState?.id) {
      const element = document.getElementById(locationState.id);
      element?.scrollIntoView();
    }
  }, [monthEntries, locationState]);

  return (
    <div className="page">
      <NavHeader noMargin>
        <Logo />
      </NavHeader>
      <div className={classes.entriesRoot}>
        {/* <div key={`upsala`} style={{ paddingTop: 16 }}>
          <div style={{ fontFamily: 'Raleway', fontWeight: 500, fontSize: 16 }}>
            <DayEntry
              day={3}
              entries={[
                {
                  id: '0',
                  text:
                    'Rekordní množství pozitivních testů na covid-19 se v pátek ukázal především u lidí mladší a střední generace. Většina z nich navíc ani nevykazuje příznaky nemoci. V Praze, kde je hlášeno nejvíc nových případů, jsou stále nízké počty nakažených mezi rizikovými osobami, tedy zejména seniory. V sobotu na to v České televizi upozornila hlavní hygienička Jarmila Rážová.',
                  date: new Date(),
                  tags: [],
                },
              ]}
            />
          </div>
          <Divider />
          <div style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
            <DayEntry
              day={3}
              entries={[
                {
                  id: '0',
                  text:
                    'Rekordní množství pozitivních testů na covid-19 se v pátek ukázal především u lidí mladší a střední generace. Většina z nich navíc ani nevykazuje příznaky nemoci. V Praze, kde je hlášeno nejvíc nových případů, jsou stále nízké počty nakažených mezi rizikovými osobami, tedy zejména seniory. V sobotu na to v České televizi upozornila hlavní hygienička Jarmila Rážová.',
                  date: new Date(),
                  tags: [],
                },
              ]}
            />
          </div>
          <Divider />
          <div style={{ fontFamily: 'Cabin', fontSize: 17, letterSpacing: 'normal' }}>
            <DayEntry
              day={3}
              entries={[
                {
                  id: '0',
                  text:
                    'Rekordní množství pozitivních testů na covid-19 se v pátek ukázal především u lidí mladší a střední generace. Většina z nich navíc ani nevykazuje příznaky nemoci. V Praze, kde je hlášeno nejvíc nových případů, jsou stále nízké počty nakažených mezi rizikovými osobami, tedy zejména seniory. V sobotu na to v České televizi upozornila hlavní hygienička Jarmila Rážová.',
                  date: new Date(),
                  tags: [],
                },
              ]}
            />
          </div>
          <Divider />
          <div style={{ fontFamily: 'Noto Sans', fontSize: 16 }}>
            <DayEntry
              day={3}
              entries={[
                {
                  id: '0',
                  text:
                    'Rekordní množství pozitivních testů na covid-19 se v pátek ukázal především u lidí mladší a střední generace. Většina z nich navíc ani nevykazuje příznaky nemoci. V Praze, kde je hlášeno nejvíc nových případů, jsou stále nízké počty nakažených mezi rizikovými osobami, tedy zejména seniory. V sobotu na to v České televizi upozornila hlavní hygienička Jarmila Rážová.',
                  date: new Date(),
                  tags: [],
                },
              ]}
            />
          </div>
          <Divider />
          <div style={{ fontFamily: 'Libre Baskerville', fontSize: 15, lineHeight: 1.6 }}>
            <DayEntry
              day={3}
              entries={[
                {
                  id: '0',
                  text:
                    'Rekordní množství pozitivních testů na covid-19 se v pátek ukázal především u lidí mladší a střední generace. Většina z nich navíc ani nevykazuje příznaky nemoci. V Praze, kde je hlášeno nejvíc nových případů, jsou stále nízké počty nakažených mezi rizikovými osobami, tedy zejména seniory. V sobotu na to v České televizi upozornila hlavní hygienička Jarmila Rážová.',
                  date: new Date(),
                  tags: [],
                },
              ]}
            />
          </div>
          <Divider />
        </div> */}
        {monthEntries.data &&
          monthEntries.data.map(({ month, year, days }) => (
            <div key={`${month}-${year}`}>
              <MonthDelimiter month={month} year={year} />
              {days.map(({ day, entries }, index) => (
                <React.Fragment key={day}>
                  <DayEntry day={day} entries={entries} />
                  {index !== days.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
          ))}
        {monthEntries.error && <ErrorText errorMessage={monthEntries.error.message} />}
      </div>
    </div>
  );
}

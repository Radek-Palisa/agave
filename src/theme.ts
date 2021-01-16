import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: {
      appHeaderHeight: number;
    };
  }
  interface ThemeOptions {
    custom: {
      appHeaderHeight: number;
    };
  }
}

const theme = createMuiTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        fontSize: 26,
        // '@media (min-width: 960px)': {
        //   fontSize: 26,
        // },
      },
      fontSizeLarge: {
        fontSize: 29,
      },
    },
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: 17,
        },
        body: {
          fontSize: '1rem',
          lineHeight: 1.5,
          letterSpacing: 'normal',
          // https://developers.google.com/web/updates/2017/11/overscroll-behavior
          overscrollBehaviorY: 'none',
        },
      },
    },
  },
  custom: {
    appHeaderHeight: 60,
  },
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: '#F4E7D3',
    },
    background: {
      default: '#FFF',
    },
    text: {
      primary: '#324050',
    },
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    htmlFontSize: 17,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      letterSpacing: 'normal',
      fontSize: 26,
      color: '#333',
      lineHeight: 1.2,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '3.8125rem',
      letterSpacing: '-0.00819em',
    },
    h3: {
      letterSpacing: '0em',
    },
    h4: {
      letterSpacing: '0.00735em',
    },
    h5: {
      letterSpacing: '0em',
    },
    h6: {
      letterSpacing: '0.0075em',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 1.2,
    },
    subtitle1: {
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: 'normal',
      color: '#324050',
    },
    body2: {
      letterSpacing: '0.01071em',
    },
    button: {
      letterSpacing: '0.02857em',
    },
    caption: {
      letterSpacing: '0.03333em',
    },
    overline: {
      letterSpacing: '0.08333em',
    },
  },
});

export default theme;

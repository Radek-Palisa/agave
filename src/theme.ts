import { createMuiTheme } from '@material-ui/core/styles';
import { purple, blue } from '@material-ui/core/colors';

// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface Theme {}
//   interface ThemeOptions {}
// }

const theme = createMuiTheme({
  overrides: {
    MuiDivider: {
      root: {
        borderColor: '#F4E7D3',
        marginBottom: '1rem',
      },
    },
    MuiCssBaseline: {
      '@global': {
        body: {
          // letterSpacing: '0.03125em',
          letterSpacing: '0.00938em',
        },
      },
    },
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
    // font-family: 'Cabin' !important;
    /* font-family: 'Raleway' !important;
    font-family: 'Libre Baskerville', serif; */

    fontFamily: 'Montserrat, Helvetica Neue, Arial, sans-serif',
    fontSize: 16,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '6.0625rem',
      letterSpacing: '-0.01546em',
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
      letterSpacing: '0.00938em',
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

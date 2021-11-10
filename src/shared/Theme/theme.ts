import { createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import { darkScrollbar as scrollbar } from '@mui/material';


const light = {
  track: '#f5f5f5',
  thumb: '#adadad',
  active: '#959595'
};

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      dark: "#f5f5f5",
      main: "#304ffe",
      light: "#fff"
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff'
    }
  },
  // spacing: 10,
  shape: {
    borderRadius: "10px"
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: scrollbar(light),
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'text',
        // size: 'large'
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        variant: 'outlined',
        size: 'large'
      }
    }
  },
  // typography:{

  // }
})

export default theme;
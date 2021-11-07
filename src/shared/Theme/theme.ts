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
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: scrollbar(light),
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'outlined'
      }
    }
  },
  // typography:{

  // }
})

export default theme;
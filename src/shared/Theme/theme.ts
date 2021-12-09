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
    borderRadius: 4
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: scrollbar(light),
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'medium',
        variant: 'outlined',
      }
    },
    MuiSelect: {
      defaultProps: {
        size: 'medium'
      }
    },
    MuiButton: {
      defaultProps: {
        sx: {
          borderRadius: ({ shape }) => Number(shape.borderRadius)/2
        }
      },
    },

    MuiSvgIcon: {
      defaultProps: {
        color: 'inherit',
      }
    },
    MuiIconButton: {
      defaultProps: {
        color: 'primary'
      }
    }
  },
  // typography:{

  // }
})

export default theme;
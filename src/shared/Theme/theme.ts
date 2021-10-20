import { createTheme } from '@mui/material/styles';
import { red, blue, indigo } from '@mui/material/colors';


// const theme = createTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary:{
      dark: "#f5f5f5",
      main: "#304ffe",
      light: "#fff"
    }
  },
  // typography:{

  // }
})

export default theme;
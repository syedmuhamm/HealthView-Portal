import 'styled-components';
import { Theme } from '@mui/material/styles';

declare module 'styled-components' {
  // Extend styled-components' DefaultTheme with MUI Theme
  export interface DefaultTheme extends Theme {}
}

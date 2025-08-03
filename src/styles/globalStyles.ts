import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  // CSS variables for JS access
  :root {
    --font-family-primary: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    --mobile-breakpoint: 600px;
    --tablet-breakpoint: 900px;
  }

  // Only keeping styles that need to be dynamic based on theme
  body {
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
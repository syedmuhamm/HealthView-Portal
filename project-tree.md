HealthView-Portal/
├── public/
│   └── index.html             # Basic HTML template with root <div id="root"> for React to mount
│
├── src/
│   ├── index.tsx              # React entry point, renders App inside ThemeProvider and GlobalStyles
│   ├── App.tsx                # Main App component setting up React Router routes
│   │
│   ├── styles/
│   │   ├── theme.ts           # Material UI custom theme configuration (colors, typography)
│   │   └── globalStyles.ts    # Global CSS styles using styled-components' createGlobalStyle
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx    # Login page component with user authentication form
│   │   └── DashboardPage.tsx  # Dashboard component showing blood pressure charts and stats
│   │
│   ├── api/
│   │   └── api.ts             # Mock API service simulating backend calls for data fetching
│   │
│   ├── context/
│   │   └── AuthContext.tsx    # React Context managing user authentication state globally
│   │
│   ├── components/            # Reusable UI components (buttons, forms, charts, etc.)
│   │
│   ├── utils/                 # Utility functions/helpers used across the app
│   │
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions and interfaces
│   │
│   └── theme.d.ts             # Type declarations for styled-components to extend MUI theme
│
└── package.json               # Project dependencies, scripts, and metadata

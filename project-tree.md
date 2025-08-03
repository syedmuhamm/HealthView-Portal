HealthView-Portal/
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Exact dependency versions
├── project-tree.md            # Documentation of project structure
├── public/                    # Static assets
│   ├── favicon.ico            # Site icon
│   ├── index.html             # Main HTML template
│   └── manifest.json          # PWA configuration
├── README.md                  # Project documentation
├── screenshots/               # Application screenshots
│   ├── dashboard_with_intervals.png  # Dashboard with interval controls
│   ├── dashboard_with_log.png        # Dashboard with log scale
│   └── login_view.png                # Login screen
├── src/                       # Source code
│   ├── api/
│   │   └── api.ts             # Mock API service with login and blood pressure endpoints
│   ├── App.tsx                # Main app component with routing
│   ├── components/            # Reusable components
│   │   ├── BloodPressureChart.tsx     # Interactive chart visualization
│   │   ├── BloodPressureStats.tsx     # Statistics display panel
│   │   ├── ChartControls.tsx          # Chart configuration controls
│   │   ├── DashboardHeader.tsx        # Dashboard header with logout
│   │   └── DashboardView.tsx          # Main dashboard content view
│   ├── context/
│   │   └── AuthContext.tsx    # Authentication state management
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAsync.ts        # Async operation handling
│   │   ├── useBloodPressureData.ts    # Blood pressure data management
│   │   └── useLocalStorage.ts         # Local storage persistence
│   ├── index.tsx              # React entry point with providers
│   ├── pages/                 # Page components
│   │   ├── DashboardPage.tsx  # Dashboard page container
│   │   └── LandingPage.tsx    # Login/landing page
│   ├── styles/                # Styling
│   │   ├── components/            # Component-specific styles
│   │   │   ├── _blood-pressure-chart.scss
│   │   │   ├── _blood-pressure-stats.scss
│   │   │   ├── _chart-controls.scss
│   │   │   ├── _dashboard-header.scss
│   │   │   └── _dashboard-view.scss
│   │   ├── pages/
│   │   │   ├── _dashboard-page.scss
│   │   │   └── _landing-page.scss
│   │   ├── _variables.scss        # Design tokens and variables
│   │   ├── _mixins.scss           # Reusable mixins
│   │   ├── _typography.scss       # Font styles
│   │   ├── _layout.scss           # Global layout rules
│   │   └── main.scss              # Main SCSS entry point
│   │   ├── globalStyles.ts    # Global CSS styles
│   │   └── theme.ts           # Material UI theme configuration
│   ├── theme.d.ts             # Type declarations for styled-components
│   ├── types/                 # Type definitions
│   │   ├── index.ts           # Main type exports
│   │   └── models.ts          # Data models and interfaces
│   └── utils/                 # Utility functions (currently empty)
└── tsconfig.json              # TypeScript configuration
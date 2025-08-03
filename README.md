# Clinical Study Portal – Participant Dashboard

![Login View](/screenshots/login_view.png)
![Dashboard View](/screenshots/dashboard_view.png)
![Log Scale View](/screenshots/dashboard_view_tablet.png)

A fully responsive, production-ready **React + TypeScript** application for clinical study participants to monitor and interact with their blood pressure data in real-time. Built with modern development standards, this portal emphasizes accessibility, usability, and scalability.

---

## Highlights

### Authentication
- Secure mock login flow using JWT
- Form validation via **Formik** and **Yup**
- Accepts any valid email format with password ≥ 6 characters
- Persistent sessions using `localStorage`

### Real-Time Data Visualization
- Live polling of randomized blood pressure readings
- Dynamic histogram chart using **Recharts**
- Intuitive controls:
  - Range filter (default: 80–140 mmHg)
  - Toggle between linear/logarithmic scales
  - Adjustable polling intervals (2s–30s)

### Modern Tech Stack
- **React 18** with functional components
- **TypeScript** (strict mode) for full type safety
- **Material-UI v5** for theming and accessibility
- Global state via React Context API
- Custom hooks for asynchronous workflows
- WCAG 2.1 AA accessibility compliance
- Mobile-first, fully responsive layout

---

## Getting Started

### Prerequisites
- Node.js **16+**
- npm **8+** or yarn **1.22+**

### Installation
```bash
git clone git@github.com:syedmuhamm/HealthView-Portal.git
cd HealthView-Portal
npm install      # or yarn install
npm start        # or yarn start
```

---

## Project Structure

```
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
│   │   ├── globalStyles.ts    # Global CSS styles
│   │   └── theme.ts           # Material UI theme configuration
│   ├── theme.d.ts             # Type declarations for styled-components
│   ├── types/                 # Type definitions
│   │   ├── index.ts           # Main type exports
│   │   └── models.ts          # Data models and interfaces
│   └── utils/                 # Utility functions (currently empty)
└── tsconfig.json              # TypeScript configuration
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari ≥ 14
- Mobile Chrome / Safari

---

## Notes for Reviewers

- 🔄 All API interactions are **mocked** and simulate network latency  
- 🧪 Data is **randomly generated** per request for demonstration  
- 🧼 Focused on **React + TypeScript best practices**, not backend auth  
- 🧱 Strong architecture foundation for scaling real clinical systems  

---

## Contributing

While this is an evaluation/demo project, suggestions and improvements are welcome. Open a GitHub Issue or submit a Pull Request.

---

Built with ❤️ by [Syed Muhammad Zulqarnain](https://github.com/syedmuhamm)

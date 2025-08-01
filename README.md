# Clinical Study Portal - Participant Dashboard

![App Screenshot](/screenshots/login_view.png)
![App Screenshot](/screenshots/dashboard_with_intervals.png)
![App Screenshot](/screenshots/dashboard_with_log.png)

A responsive React-based portal for clinical study participants to view their blood pressure data, built with TypeScript and modern web technologies.

## ✨ Features

- **Secure Login Flow**
  - Email/password authentication: any pattern of email and good enough password is enough to login. 
  - Form validation with Formik/Yup
  - Mock JWT token generation

- **Real-time Data Visualization**
  - Interactive blood pressure histogram (Recharts)
  - Auto-refresh every 5 seconds (configurable)
  - Logarithmic scale toggle
  - Dynamic value range filtering

- **Senior-Level Engineering**
  - TypeScript strict typing
  - Responsive Material-UI components
  - Context API for state management
  - Proper error boundaries
  - Accessibility (a11y) compliant

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm v8+

### Installation

```bash
git clone git@github.com:syedmuhamm/HealthView-Portal.git
cd HealthView-Portal
npm install

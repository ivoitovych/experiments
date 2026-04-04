# Orange Anonymization Front-End

Orange Anonymization is a sophisticated web platform designed for secure PII (Personally Identifiable Information) and PHI (Protected Health Information) detection and anonymization. It empowers organizations to handle sensitive data responsibly by identifying, masking, and generating synthetic alternatives to private information.

## 🚀 Features

- **Automated PII Detection:** Real-time identification of sensitive entities including names, dates, SSNs, locations, and email addresses.
- **Advanced Anonymization:** Securely mask or de-identify sensitive data using customizable strategies.
- **Synthetic Data Generation:** Create privacy-preserving synthetic datasets that maintain the statistical properties of the original data without compromising privacy.
- **Analytics Dashboard:** Comprehensive visualization of anonymization trends, entity distributions, and processing metrics using interactive charts.
- **Audit & Compliance:** Detailed tracking of data processing activities to ensure regulatory compliance.
- **Multi-language Support:** Fully internationalized interface supporting multiple locales via i18next.
- **Responsive Design:** A modern, polished UI built with Material UI and Tailwind CSS, optimized for all device sizes.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [Material UI (MUI) v7](https://mui.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Emotion](https://emotion.sh/)
- **Data Fetching:** [Axios](https://axios-http.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup) validation
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Internationalization:** [i18next](https://www.i18next.com/)

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## ⚙️ Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-repo/orange-anonymization-fe.git
    cd orange-anonymization-fe
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your API configuration:

    ```env
    VITE_API_URL=https://api.your-service.com
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```text
src/
├── assets/         # Static assets (images, icons, etc.)
├── components/     # Reusable UI components
├── constants/      # App-wide constants and route definitions
├── hooks/          # Custom React hooks
├── i18n.ts         # Internationalization setup
├── layouts/        # Page layout wrappers (Main, Auth)
├── pages/          # Full page components (Landing, Dashboard, etc.)
├── routes/         # Route configuration and guards
├── services/       # API service layers
├── store/          # Redux store and slices
├── styles/         # Global styles and theme configuration
├── types/          # TypeScript interfaces and types
└── utils/          # Helper functions and utilities
```

## 📜 Available Scripts

- `npm run dev`: Starts the development server with HMR.
- `npm run build`: Compiles the application for production.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run preview`: Locally previews the production build.

## 📄 License

This project is private and confidential.

# Modern Software Engineer Portfolio

A premium, dark-mode portfolio built with **React**, **TypeScript**, **Framer Motion**, and **Sanity CMS**.

## Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Environment Setup
Create a `.env` file in the root directory (or use the existing one) and add your Sanity credentials:

```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_ORG_ID=your_org_id (optional for fetching)
```

### 3. Installation
```bash
npm install
```

### 4. Running the Project
To start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 5. Building for Production
```bash
npm run build
```

## Features
- **Sanity GROQ**: Consolidated fetching with memoization.
- **Glassmorphism UI**: High-end aesthetic with Tailwind v4.
- **Responsive**: Mobile-first design.
- **Animations**: Smooth sections with Framer Motion.

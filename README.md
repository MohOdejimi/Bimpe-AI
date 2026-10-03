# Oja Frontend

A responsive React frontend for **Oja**, built to help users set up and launch an AI-powered business prospecting workflow.

Built with **React, Vite and React Router**. Frontend only, no backend or auth needed to run.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints in your terminal. To make a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  main.jsx            entry point (router + styles)
  App.jsx             routes and shared form state
  constants.js        brand name, routes, default form values
  components/
    Header.jsx
    Footer.jsx
    NavItem.jsx
    EngineTag.jsx
    Field.jsx
    Switch.jsx
  pages/
    SetupPage.jsx     "/"
    ScoutingPage.jsx  "/scouting"
  styles/
    index.css
```

## Backend integration

The setup form uses React state and is ready to be connected to an endpoint:

```http
POST /api/scout/start
```

```json
{
  "name": "Chizu",
  "whatTheySell": "Websites for restaurants",
  "targetCustomer": "Restaurants in Lagos",
  "phone": "+234 812 345 6789",
  "highIntentOnly": true
}
```

Form fields start empty and show placeholders. Call it from `startScout` in `src/App.jsx`.

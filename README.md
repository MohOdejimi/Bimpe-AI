# AI Sales Scout — Frontend

A responsive React frontend for **AI Sales Scout**, built to help users set up and launch an AI-powered business prospecting/scouting workflow.

Built with **React, Vite, and Tailwind CSS**, based on the supplied Scout Setup reference.

## Features

* High-fidelity Scout Setup interface based on the supplied reference
* Responsive navigation, header, and footer
* Editable business setup form
* High Buyer Propensity toggle
* Scout launch interaction and scouting screen
* Clean frontend-only architecture
* No authentication required
* No backend dependency

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the Vite URL displayed in your terminal.

## Backend Integration

The setup form currently uses React state and is ready to be connected to a backend endpoint:

```http
POST /api/scout/start
```

Example request body:

```json
{
  "name": "Chizu",
  "whatTheySell": "Websites for restaurants",
  "targetCustomer": "Restaurants in Lagos",
  "phone": "+234 812 345 6789"
}
```

The frontend does not currently require this backend endpoint to run.

## Tech Stack

* React
* Vite
* Tailwind CSS
* JavaScript

## Project Scope

This repository contains the **frontend implementation** for the AI Sales Scout setup and scouting experience.

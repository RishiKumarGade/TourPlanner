<p align="center">
    <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" align="center" width="30%">
</p>
<p align="center"><h1 align="center">TOURPLANNER</h1></p>
<p align="center">
	<em>AI-powered customizable trip planner using Gemini API</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/RishiKumarGade/TourPlanner?style=default&logo=opensourceinitiative&logoColor=white&color=00ffe9" alt="license">
	<img src="https://img.shields.io/github/last-commit/RishiKumarGade/TourPlanner?style=default&logo=git&logoColor=white&color=00ffe9" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/RishiKumarGade/TourPlanner?style=default&color=00ffe9" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/RishiKumarGade/TourPlanner?style=default&color=00ffe9" alt="repo-language-count">
</p>

---

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#-usage)
  - [🧪 Testing](#-testing)
- [📌 Project Roadmap](#-project-roadmap)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

**TourPlanner** is a smart, AI-driven travel planning application built using the **Gemini API**. It helps users create detailed, cost-estimated itineraries tailored to their desired destinations. Each destination is represented as an editable node in a dynamic visual flow, allowing full customization. Users can request AI updates, add or remove places, and generate multiple plans using a chat-based session interface similar to ChatGPT.

---

## 👾 Features

- 🔮 **AI-Powered Itineraries** — Automatically generate trips with Gemini API based on user input.
- 🧠 **Dynamic Chat Sessions** — Each planning session is stored as a unique chat with editable trip history.
- 📍 **Visual Node Flow** — Destinations are displayed as interactive nodes (add, remove, edit).
- 💬 **AI Interaction** — Ask the AI to update the trip dynamically (e.g., add a beach or reduce costs).
- 💸 **Cost Estimation** — Includes travel and activity cost estimates for better planning.
- ⚡ **Instant Feedback** — Real-time edits and AI responses.
- 🧑‍💻 **Modern Stack** — Built with React + TypeScript + TailwindCSS + Vite for blazing-fast performance.

---

## 📁 Project Structure

```sh
└── TourPlanner/
    ├── README.md
    ├── eslint.config.js         # ESLint configuration for code linting
    ├── index.html               # Main HTML entry point
    ├── package-lock.json        # Auto-generated dependency lock file
    ├── package.json             # Project metadata and dependencies
    ├── postcss.config.js        # PostCSS plugin configuration
    ├── src
    │   ├── App.tsx              # Main app layout and routing
    │   ├── components
    │   │   ├── TourFlow.tsx     # Visual representation of the tour as a flow
    │   │   └── TourNode.tsx     # Individual editable node in the tour
    │   ├── helpers
    │   │   ├── generateResponse.js  # Handles Gemini API interaction
    │   │   └── generateTourPlan.ts  # Processes and structures AI response
    │   ├── index.css            # Tailwind base styles
    │   ├── main.tsx             # Application entry point
    │   ├── pages
    │   │   ├── Explore.tsx      # Discover suggested locations
    │   │   ├── Home.tsx         # Homepage with new plan button
    │   │   └── PlanDetails.tsx  # View/edit a selected tour plan
    │   ├── store
    │   │   └── index.ts         # Global state management (likely with Zustand or Redux)
    │   ├── types
    │   │   └── index.ts         # Custom TypeScript type definitions
    │   └── vite-env.d.ts        # Vite environment types
    ├── tailwind.config.js       # TailwindCSS configuration
    ├── tsconfig.app.json        # TS config for app build
    ├── tsconfig.json            # Root TS config
    ├── tsconfig.node.json       # Node-specific TS config
    └── vite.config.ts           # Vite bundler configuration
```

---

### 📂 Project Index

<details open>
<summary><b><code>TOURPLANNER/</code></b></summary>

- **`postcss.config.js`** – Tailwind/PostCSS plugin setup.
- **`tsconfig.node.json`** – Node-specific TS config.
- **`package-lock.json`** – Dependency tree snapshot.
- **`tsconfig.json`** – Project-wide TS config.
- **`tailwind.config.js`** – Tailwind theme and plugin customizations.
- **`tsconfig.app.json`** – App-specific TS config override.
- **`package.json`** – Declares dependencies and scripts.
- **`vite.config.ts`** – Configuration for the Vite build system.
- **`index.html`** – Template for injecting the app.
- **`eslint.config.js`** – ESLint rules and plugins.

</details>

<details>
<summary><b><code>src/</code></b></summary>

- **`main.tsx`** – React app mount point.
- **`App.tsx`** – App-level layout and routes.
- **`index.css`** – Base Tailwind styles.
- **`vite-env.d.ts`** – Vite helper types.

<details>
<summary><code>components/</code></summary>

- **`TourFlow.tsx`** – Graph-based node layout for trip.
- **`TourNode.tsx`** – UI block for each location in the plan.

</details>

<details>
<summary><code>pages/</code></summary>

- **`Home.tsx`** – Home page with options to create or open plans.
- **`PlanDetails.tsx`** – Shows a specific plan and allows editing.
- **`Explore.tsx`** – Optional suggestions or discovery section.

</details>

<details>
<summary><code>helpers/</code></summary>

- **`generateTourPlan.ts`** – Converts Gemini API output to usable trip plan.
- **`generateResponse.js`** – Manages request/response logic with the API.

</details>

<details>
<summary><code>store/</code></summary>

- **`index.ts`** – Centralized store using Zustand/Redux.

</details>

<details>
<summary><code>types/</code></summary>

- **`index.ts`** – Type declarations (e.g., Node, Plan, ChatSession).

</details>
</details>

---

## 🚀 Getting Started

### ☑️ Prerequisites

Make sure you have the following installed:

- Node.js (v16+ recommended)
- NPM (v8+)
- TypeScript

### ⚙️ Installation

Clone the repo and install dependencies:

```sh
git clone https://github.com/RishiKumarGade/TourPlanner
cd TourPlanner
npm install
```

### 🤖 Usage

To run the app locally:

```sh
npm start
```

This will spin up a Vite dev server (usually at `http://localhost:5173`).

### 🧪 Testing

To run unit or integration tests:

```sh
npm test
```

> *(Test setup may depend on Jest, Vitest, or your chosen framework)*

---

## 📌 Project Roadmap

- [x] **Task 1**: Implement base trip planning via Gemini API
- [x] **Task 2**: Add save/export functionality for plans
- [ ] **Task 3**: Enhance cost estimation with live data
- [ ] **Task 4**: Mobile-responsive improvements

---

## 🔰 Contributing

- 💬 [Join Discussions](https://github.com/RishiKumarGade/TourPlanner/discussions)
- 🐛 [Report Bugs / Request Features](https://github.com/RishiKumarGade/TourPlanner/issues)
- 💡 [Submit Pull Requests](https://github.com/RishiKumarGade/TourPlanner/pulls)

<details>
<summary>Contributing Guidelines</summary>

1. **Fork** the repo
2. **Clone** it locally  
   ```sh
   git clone https://github.com/RishiKumarGade/TourPlanner
   ```
3. **Create a branch**  
   ```sh
   git checkout -b feature-name
   ```
4. **Make changes**, test them
5. **Commit and push**
   ```sh
   git commit -m "Add feature"
   git push origin feature-name
   ```
6. **Open a Pull Request**

</details>

<details>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com/RishiKumarGade/TourPlanner/graphs/contributors">
      <img src="https://contrib.rocks/image?repo=RishiKumarGade/TourPlanner">
   </a>
</p>
</details>

---

## 🎗 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).  
See the [LICENSE](https://github.com/RishiKumarGade/TourPlanner/blob/master/LICENSE) file for details.

---

## 🙌 Acknowledgments

- [Gemini API by Google](https://ai.google.dev/)
- OpenAI & ChatGPT for conceptual inspiration
- Icons from [Flaticon](https://flaticon.com/)

---

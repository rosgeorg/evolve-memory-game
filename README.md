# 🧠 Memory Game

A small memory card game built with React and Vite.

<br />

## ✨ Features

- Animated start screen
- Card flip interactions
- Match validation logic
- Sound effects and mute/unmute support
- Win and lose states
- Responsive layout
- Score and timer feedback

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate into the project

```bash
cd <project-folder>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```bash
http://localhost:5173
```

---

## Production Build

### Build the project

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

---

# ⚙️ Technical Decisions

## React

React was chosen because it is one of the most widely used frontend frameworks in the industry, making the project easier to maintain, improve, and collaborate on for most developers. Its component-based architecture made it especially suitable for organizing the game into reusable and isolated pieces such as cards, modals, screens, and controls.

## Vite

Vite was selected because it provides one of the fastest and most lightweight setups for modern React applications. It offers an excellent developer experience through instant startup times, fast hot module replacement, and a minimal configuration approach. It is also the current recommendation from the React team for modern frontend tooling.

## Tailwind CSS

Tailwind CSS was used to speed up UI development while keeping styling consistent throughout the application. Its utility-first approach also made responsive adjustments and visual iteration significantly faster during development.

---

# 🗂️ Project Structure

```bash
src/
├── components/   # Reusable UI components
├── screens/      # Main application screens
├── hooks/        # Custom React hooks
├── utils/        # Helper and utility functions
├── constants/    # Shared constants and configuration
├── assets/       # Static assets
└── App.jsx
```

### Structure Rationale

- **Components** contain isolated UI pieces such as cards, buttons, and modals.
- **Screens** represent higher-level views like the start screen, gameplay screen, and feedback screen.
- **Custom hooks** encapsulate game logic, timer management, and sound handling to keep components cleaner and easier to maintain.
- **Utilities and constants** help centralize reusable logic and avoid duplicated values across the application.

---

# 🎮 Gameplay Notes

- Cards are shuffled randomly at the beginning of every game.
- User interaction is temporarily blocked during card flip animations to avoid inconsistent game states.
- Sound effects and background music can be muted/unmuted at any time.
- The layout adapts across different screen sizes for a smoother experience on both desktop and mobile devices.

---

# 🛠️ Future Improvements

Some possible future improvements could include:

- Difficulty levels
- Additional card themes
- Keyboard accessibility improvements
- Animation refinements
- Unit and integration testing coverage expansion

<img width="1536" height="1024" alt="architecture-diagram github" src="https://github.com/user-attachments/assets/feb5621e-e8f2-4340-81be-aa5f90f6beac" />

## 🛠️ Technologies Used

The FoodSaver application is built using a modern, scalable, and maintainable technology stack. Each technology has been selected to ensure performance, reliability, and a smooth developer experience. The following section provides a detailed overview of all major tools and technologies used throughout the project.

---

### Core Frontend Technologies

**React 18**  
The primary library used for building the user interface. React’s component-based architecture allows for reusable UI blocks, efficient performance using the Virtual DOM, and a clean separation of concerns. The application is fully implemented using functional components and modern React hooks.

**React Router DOM**  
Handles client-side routing and enables seamless navigation between pages without full page reloads. It provides declarative routing, route parameters, and nested routing used across the platform.

**JavaScript ES6+**  
Modern JavaScript features such as arrow functions, template literals, destructuring, modules, async/await, and classes are used throughout the codebase to improve readability and maintainability.

**HTML5 & Semantic Structure**  
Pages are built with semantic HTML tags to ensure proper structure, readability, and accessibility. This includes usage of `<header>`, `<section>`, `<article>`, and roles where necessary.

---

### Styling & UI

**CSS3 with Custom Variables**  
The application uses pure CSS for styling, utilizing CSS variables for theme consistency, grid and flexbox for layout, and responsive breakpoints for mobile-first design.

**Responsive Layout System**  
The design is built to adapt across desktops, tablets, and mobile devices using:
- CSS Grid  
- Flexbox  
- Custom responsive breakpoints  
- Fluid typography and spacing  

---

### Utilities & Custom Tools

**Custom React Hooks**  
A custom `useTypewriter` hook is used to implement the dynamic typewriter animation on the Home page. Hooks are also used for form handling, input validation, and component state management.

**Utility Functions (src/utils)**  
Helper functions support reusable logic such as formatters, validators, and shared calculations.

---

### Build & Development Tools

**Node.js & npm**  
Used for managing dependencies, running development scripts, and building the project for production. The npm ecosystem provides flexibility in integrating UI libraries, linting tools, and additional packages.

**Create React App Build System**  
CRA handles the bundling, transformation, and optimization of the entire codebase. It includes:
- Webpack configuration  
- Babel transpilation  
- Development server  
- Hot-reload environment  

This ensures a consistent and optimized build output without manual configuration.

---

### Code Quality & Project Standards

**ESLint Rules (Implicit)**  
Although not explicitly configured, the project follows standard JavaScript conventions to maintain clean, readable code.

**Folder Structure Best Practices**  
Components, pages, hooks, and utilities follow modular separation for maintainability and clarity.

---

### Summary

This technology stack achieves:
- High performance  
- Improved maintainability  
- Component reusability  
- Scalable architecture  
- Smooth developer onboarding  

Each part of the stack contributes to building a responsive, accessible, and production-ready React application.

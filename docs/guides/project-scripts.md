## 🚀 Available Scripts

The FoodSaver App provides several npm scripts to support development, testing, and production deployment.  
Below is a structured and beginner-friendly explanation of each command.

---

### ▶️ `npm start`
Starts the application in **development mode**.

**Features:**
- Runs local dev server at `http://localhost:3000/`
- Enables Hot Module Reloading (HMR)
- Automatically rebuilds on file changes
- Displays build errors directly in the browser

**Use Case:**  
Ideal for UI development, testing components, and active coding sessions.

---

### 🧪 `npm test`
Runs the **interactive test runner** powered by Jest.

**Features:**
- Watches files for changes and re-runs tests
- Supports snapshot testing
- Displays readable test output in the terminal

**Use Case:**  
Useful for validating logic, component behavior, and utility functions.

---

### 🏗️ `npm run build`
Generates an optimized **production build** inside the `build/` directory.

**Optimizations Include:**
- Minified JS & CSS bundles
- Tree-shaking for unused code removal
- Fingerprinted asset filenames for caching
- HTML/CSS/JS compression for faster load time

**Use Case:**  
Used before deploying to hosting platforms (Netlify, Vercel, GitHub Pages, AWS, etc.).

---

### ⚠️ `npm run eject`
Reveals all underlying build configuration (Webpack, Babel, ESLint).  
⚠️ **This action is irreversible.**

**You Receive Control Over:**
- Webpack configuration  
- Babel customizations  
- ESLint rules  
- Build pipeline

**Use Case:**  
Only when advanced custom configurations are required beyond Create React App defaults.

---

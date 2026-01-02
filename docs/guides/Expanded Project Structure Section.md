## 📦 Project Structure

```text
foodsaver-app/
├── public/                                # Public static assets (served directly)
│   ├── images/                             # Logos, banners, icons, backgrounds
│   └── index.html                          # Root HTML file used by React at runtime
│
├── src/                                    # Core application source code
│   ├── components/                         # Shared reusable UI components
│   │   ├── Header.js                       # Site-wide navigation header
│   │   └── Footer.js                       # Global footer across all pages
│   │
│   ├── pages/                              # Route-level pages rendered by React Router
│   │   ├── Home.js                         # Landing page with introduction & CTAs
│   │   ├── About.js                        # Project story, mission & purpose
│   │   ├── Works.js                        # “How it works” step-by-step workflow
│   │   ├── Restaurant.js                   # Restaurant partnership information page
│   │   ├── NGO.js                          # NGO onboarding & collaboration details
│   │   ├── Registration.js                 # Multi-role registration form page
│   │   └── Contact.js                      # Contact & inquiry form page
│   │
│   ├── hooks/                              # Custom React hooks for reusable logic
│   │   └── useTypewriter.js                # Typewriter-style animated text hook
│   │
│   ├── utils/                              # Helper functions: validation, constants, formatting
│   │
│   ├── App.js                              # Main wrapper, routes setup, global layout
│   ├── App.css                             # Global styles: layout, theme, responsiveness
│   └── index.js                            # Entry point that mounts the React application
│
├── package.json                            # Dependencies, scripts, metadata
└── README.md                               # Project documentation & contributor guide

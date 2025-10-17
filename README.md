# CRUD-Angular Demo
A simple Angular-based CRUD application. Built with Tailwind CSS for styling and Local Storage for persistence—no backend or third-party libraries.


📁 Project Structure
src/
├── app/
│   ├── domain/           # Interfaces, models, and base services
│   ├── presentation/     # UI components
│   ├── infrastructure/   # Adapter for Local Storage
│   └── app.module.ts     # DI and module declarations
└── styles/               # Tailwind configuration


## 🛠️ Tech Stack

- **Frontend**: Angular, TypeScript, SCSS, Tailwind CSS

## 🛠️ Setup & Run
### Install dependencies
npm install

### Run locally
ng serve


## 📚 Future Improvements
- Enhance UX with modals and form validation
- Refactor buttons into reusable, theme-aware components with consistent styling and accessibility features.
- Enhance modal-based product creation/editing with better animations, keyboard accessibility, and form validation feedback
- Apply consistent typography and spacing tokens across components.
- Establish a Git branching strategy with dedicated branches for development (dev), testing (test), and production (prod) environments to streamline CI/CD and code quality.




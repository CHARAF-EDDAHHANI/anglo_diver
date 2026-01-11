## Anglo Diver – Full-Stack Quiz & Session Platform

Anglo Diver is a full-stack JavaScript application focused on clean architecture, RESTful API design, and automated testing.  
The project demonstrates a production-ready backend structure combined with a modern React frontend.

---

## Overview

This application manages quizzes and learning sessions through a modular backend and a decoupled frontend.  
The codebase follows clear separation of concerns and is structured to scale.

---

## Tech Stack

Frontend:
- React (Vite)
- JavaScript (ES Modules)

Backend:
- Node.js
- Express
- JSON-based data layer (abstracted for future database integration)

Testing:
- Jest
- Supertest

Tooling:
- ESLint
- Concurrently

---

## Architecture

- Controllers handle request/response logic
- Models encapsulate business logic and data access
- Routes define RESTful endpoints
- Frontend consumes APIs through isolated service modules

This structure improves maintainability, testability, and long-term scalability.

---

## Testing Strategy

The project includes unit and integration tests covering core backend logic.

Tested components:
- Quiz controller and model
- Session controller and model

Run tests with:
```bash
npm test

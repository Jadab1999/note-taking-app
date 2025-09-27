Notes App - Assignment
==================================
This implements a minimal full-stack notes app as required by the assignment.

STACK (chosen defaults):
- Backend: FastAPI (Python) + Motor (MongoDB async driver)
- Auth: JWT
- Frontend: Next.js (React) with Zustand for state management and Axios for HTTP
- Docker: docker-compose with separate services for backend, frontend, and mongodb (required by assignment)

Run (Docker):
1. Install Docker & Docker Compose
2. From project root run: docker-compose up --build
3. Backend: http://localhost:8000/docs (FastAPI docs SWAGGER)
4. Frontend: http://localhost:3000/

Notes:
- This is focusing on essential structure: auth, notes CRUD, and simple UI pages.
- No pre-made UI libraries used. Tailwind is NOT included (per assignment it is allowed but omitted in scaffold for simplicity).
- You can run backend or frontend individually without Docker if you adapt environment variables and install dependencies locally.

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

Run (Frontend):
1. go to cd frontend/ then run npm run dev

Run (Backend):
1. go to cd backend/ then run uvicorn app.main:app --reload --port 8000

Notes:
- This is focusing on essential structure: auth, notes CRUD, and simple UI pages.
- No pre-made UI libraries used. Tailwind is NOT included (per assignment it is allowed but omitted in scaffold for simplicity).
- You can run backend or frontend individually without Docker if you adapt environment variables and install dependencies locally.


ScreenShots - 

<img width="1916" height="976" alt="image" src="https://github.com/user-attachments/assets/333b1185-1744-48f1-8eca-6261b1d60288" />

<img width="1903" height="892" alt="image" src="https://github.com/user-attachments/assets/d947a174-4ef6-47e0-9555-cef12c6d0887" />

<img width="1908" height="973" alt="image" src="https://github.com/user-attachments/assets/76734874-6005-4ba8-8fb3-083425786377" />

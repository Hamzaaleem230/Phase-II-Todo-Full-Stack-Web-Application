# Environment Setup

This document outlines the necessary steps to set up the environment for the Hackathon II – Phase 2: Todo Full-Stack Web Application.

## Prerequisites

-   Python 3.11+
-   Node.js 20+
-   Git

## Monorepo Setup

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  Install backend dependencies:
    ```bash
    python -m venv backend/venv
    # On Windows
    backend\venv\Scripts\activate
    # On macOS/Linux
    source backend/venv/bin/activate
    pip install -r backend/requirements.txt
    ```

3.  Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    cd ..
    ```

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

-   **`DATABASE_URL`**: The connection string for your Neon PostgreSQL database.
    -   Example: `postgresql://user:password@host/db`
-   **`JWT_SECRET_KEY`**: A strong, secret key for signing and verifying JWTs.
    -   Example: `your-super-secret-key`
-   **`NEXT_PUBLIC_BACKEND_URL`**: The URL of the FastAPI backend.
    -   Example: `http://localhost:8000`

## Running the Application

-   **Backend**:
    ```bash
    cd backend
    uvicorn app.main:app --reload
    ```

-   **Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```

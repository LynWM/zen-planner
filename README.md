# Zen Planner

A simple todo app rebuilt from a 2022 HTML/CSS, JS and PHP project into a mini React project

## TechStack

- **Frontend:** React, TailwindCSS
- **Backend:** Node, Express, sqlite3
- **Database:** SQLite

## Project Structure 

The prject folder is divided into two, server and client. **Client** has the React Frontend while **Server** deals with the Backend.


## Running Locally

Clone the repo
```bash
git clone git@github.com:LynWM/zen-planner.git
cd zen-planner
```

Open two seperate terminals, one will be for frontend and the other for the backend

**Terminal 1 - Backend**
```bash
cd server
npm install
npm run dev
```
It runs on http://localhost:4000. A `data.db` SQLite is created automatically.

**Terminal 2 - Frontend**
```bash
cd client
npm install
npm run dev
```

It runs on http://localhost:5173

## ZenPlanner API

| Method | Route            | Body                              | Description    |
|--------|------------------|-------------------------------------|-----------------|
| GET    | /api/todos       | —                                    | List all todos  |
| POST   | /api/todos       | `{ "title": "string" }`             | Create a todo   |
| PUT    | /api/todos/:id   | `{ "title"?, "completed"? }`        | Update a todo   |
| DELETE | /api/todos/:id   | —                                    | Delete a todo   |
| GET    | /api/health      | —                                    | Health check    |

# CodeVault

CodeVault is a full-stack developer tool for storing, organizing, searching, and sharing reusable code snippets. It works like a personal developer vault with public discovery features — combining private snippet management with a community explore experience.

---

## Live Demo

- Frontend: `ADD_YOUR_FRONTEND_URL_HERE`
- Backend API: `ADD_YOUR_BACKEND_URL_HERE`

---

## Screenshots


| Login | Dashboard | Explore | Snippet Detail |
|-------|-----------|---------|----------------|
| `ADD_IMAGE` | `ADD_IMAGE` | `ADD_IMAGE` | `ADD_IMAGE` |

---

## Features

**Authentication**
- Register and login with JWT-based auth
- Protected routes for authenticated users
- Persistent login session on page refresh

**Snippet Management**
- Create, edit, delete, and view snippets
- Public and private visibility control
- Owner-only edit and delete controls

**Discovery and Search**
- Public explore page with community snippets
- Full-text search and language filter
- Tag-based organization

**Personal Workspace**
- Dashboard for your own snippets
- Bookmark and save public snippets
- Visibility-based filtering on dashboard

---

## Tech Stack

### Frontend
- React + Vite
- React Router v7
- Tailwind CSS v3

### Backend
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT + bcryptjs
- express-validator

---

## Project Structure

```
CodeVault/
  client/
    src/
      components/       # AppShell, SnippetCard, ProtectedRoute, Logo
      context/          # AuthContext
      lib/              # api.js — centralized fetch utility
      pages/            # All page components
      App.jsx
      index.css
      main.jsx

  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      validators/
      app.js
      server.js

  README.md
```

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/parikshitt05/CodeVault.git
cd CodeVault
```

### 2. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Create environment files

**`server/.env`**
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

**`client/.env`**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run the app

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

Visit `http://localhost:5173`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/me` | Get current user |

### Snippets
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/snippets` | Create a snippet |
| GET | `/api/snippets/my` | Get your snippets |
| GET | `/api/snippets/public` | Get all public snippets |
| GET | `/api/snippets/:id` | Get a single snippet |
| PATCH | `/api/snippets/:id` | Update a snippet |
| DELETE | `/api/snippets/:id` | Delete a snippet |

### Bookmarks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/snippets/bookmarks` | Get saved snippets |
| POST | `/api/snippets/:id/bookmark` | Bookmark a snippet |
| DELETE | `/api/snippets/:id/bookmark` | Remove bookmark |

---

## How It Works

### Authentication
Users register with username, email, and password. Passwords are hashed with `bcryptjs`. On login the backend issues a JWT which the frontend stores and attaches to every authenticated request.

### Authorization
CodeVault uses ownership-based access control. Private snippets are only visible to their owner. Only the owner can edit or delete a snippet. Only authenticated users can create snippets or bookmark others.

### Search
MongoDB text indexes power snippet search. The explore page supports keyword search and language filtering simultaneously.

---

## Database Models

**User** — username, email, hashed password, timestamps

**Snippet** — title, code, language, description, tags, visibility, owner reference, timestamps

**Bookmark** — user reference, snippet reference, timestamps

---

## Challenges Solved

1. **Public vs private access** — Route protection and ownership checks ensure private snippets stay private while public ones are freely discoverable
2. **JWT across the stack** — Connected backend token issuance with frontend session persistence and protected routing
3. **MongoDB text search** — Configured text indexes for full-text snippet retrieval
4. **Bookmark relationship** — Separate user-to-snippet relationship model beyond basic CRUD ownership
5. **Project structure** — Clean separation across routes, controllers, middleware, validators, models, and frontend context

---

## Future Improvements

- Monaco editor for code editing with syntax highlighting
- Pagination controls on the frontend
- Snippet folders and collections
- Dashboard analytics
- Rate limiting and backend hardening
- CI/CD deployment pipeline
- Advanced search with tag chips and filters

---

## Why This Project Stands Out

CodeVault goes beyond a basic CRUD app by combining authentication, authorization, full-text search, public/private access control, bookmarks, and a production-style project structure. It demonstrates practical understanding of how developer tools are built — how user-specific data, ownership logic, and API-driven UI work together end to end.

---

## Author

**Parikshit Tamhane**

- GitHub: `https://github.com/parikshitt05`
- LinkedIn: `www.linkedin.com/in/parikshit-tamhane-link/`
# CodeVault

CodeVault is a full-stack developer tool for storing, organizing, searching, and sharing reusable code snippets. It works like a personal developer vault with public discovery features, combining private snippet management with a public explore experience.

## Live Demo

- Frontend: `ADD_YOUR_FRONTEND_URL_HERE`
- Backend API: `ADD_YOUR_BACKEND_URL_HERE`

## Screenshots

Add screenshots here after deployment.

### Login Page
`ADD_SCREENSHOT_PATH_OR_IMAGE_LINK`

### Dashboard
`ADD_SCREENSHOT_PATH_OR_IMAGE_LINK`

### Explore Page
`ADD_SCREENSHOT_PATH_OR_IMAGE_LINK`

### Snippet Detail Page
`ADD_SCREENSHOT_PATH_OR_IMAGE_LINK`

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes for authenticated users
- Persistent login session on refresh

### Snippet Management
- Create code snippets
- Edit existing snippets
- Delete snippets
- View full snippet details
- Public and private snippet visibility

### Discovery and Search
- Public explore page
- Full-text search on snippets
- Filter snippets by language
- Tag-based organization
- Popular/public snippet browsing

### Personal Workspace
- Dashboard for viewing your own snippets
- Saved snippets/bookmark support
- Visibility-based filtering
- Owner-only edit and delete controls

### User Experience
- Protected frontend routes
- Reusable form and card components
- Loading, error, and empty states
- Responsive developer-focused UI

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- express-validator

## Project Structure

```txt
CodeVault/
  client/
    public/
    src/
      components/
      context/
      lib/
      pages/
      App.jsx
      index.css
      main.jsx
    package.json
    vite.config.js

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
    package.json

  .gitignore
  README.md

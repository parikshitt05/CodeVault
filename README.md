🚀 CodeVault

CodeVault is a modern developer workspace for storing, managing, and sharing reusable code snippets.
It allows developers to build their own searchable snippet library and explore public snippets from the community.
✨ Features
🔐 Authentication

    User Registration
    Secure Login
    Protected Routes
    JWT-based authentication (via backend)

🧩 Snippet Management

    Create snippets
    Edit snippets
    Delete snippets
    Private / Public visibility control
    Add tags and language metadata

🌍 Explore Public Snippets

    Search by keyword
    Filter by language
    View snippet details
    Save (bookmark) public snippets

📚 Personal Library

    View your own snippets
    Filter by visibility
    View saved snippets
    Remove saved snippets

📋 Productivity Enhancements

    Copy code to clipboard (Card + Detail page)
    Modern responsive UI
    Clean dashboard layout
    Smooth hover and interaction effects

🛠 Tech Stack
Frontend

    React
    React Router
    Tailwind CSS (v4)
    Context API (Authentication)
    Modern CSS Variables + Gradient UI

Backend (Assumed)

    Node.js
    Express
    MongoDB
    JWT Authentication

📂 Project Structure

text

src/
│
├── components/
│ ├── AppShell.jsx
│ ├── ProtectedRoute.jsx
│ ├── SnippetCard.jsx
│ └── SnippetForm.jsx
│
├── pages/
│ ├── DashboardPage.jsx
│ ├── ExplorePage.jsx
│ ├── CreateSnippetPage.jsx
│ ├── EditSnippetPage.jsx
│ ├── SnippetDetailPage.jsx
│ ├── SavedSnippetsPage.jsx
│ ├── LoginPage.jsx
│ └── RegisterPage.jsx
│
├── context/
│ └── AuthContext.jsx
│
├── lib/
│ └── api.js
│
└── index.css

⚙️ Installation & Setup
1️⃣ Clone the Repository

Bash

git clone https://github.com/your-username/codevault.git
cd codevault

2️⃣ Install Dependencies

Bash

npm install

3️⃣ Setup Environment Variables

Create a .env file:

text

VITE_API_BASE_URL=http://localhost:5000/api

Adjust based on your backend URL.
4️⃣ Run the Development Server

Bash

npm run dev

App runs on:

text

http://localhost:5173

🔒 Environment Variables
Variable Description
VITE_API_BASE_URL Backend API URL
🎨 UI Highlights

    Professional dark theme
    Amber primary color palette (no blue/purple tones)
    Clean avatar-based navbar
    Gradient buttons and badges
    Smooth hover transitions
    Copy-to-clipboard support

📸 Screens Included

    Dashboard
    Explore Page
    Snippet Detail View
    Authentication Pages
    Saved Snippets Page

✅ Future Improvements

    Syntax highlighting
    Dark/Light theme toggle
    Profile dropdown menu
    Pagination
    Snippet versioning
    Toast notifications
    Rate limiting
    Markdown support for descriptions

🧠 Why CodeVault?

Developers often:

    Reuse similar code snippets
    Forget where they saved useful logic
    Copy code from old projects

CodeVault solves that problem by giving you:

    A personal snippet workspace
    A searchable library
    A clean and modern interface

👨‍💻 Author

Built with ❤️ by [Your Name]
📜 License

MIT License

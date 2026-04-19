import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import AppShell from "./components/AppShell";
import DashboardPage from "./pages/DashboardPage";
import CreateSnippetPage from "./pages/CreateSnippetPage";
import EditSnippetPage from "./pages/EditSnippetPage";
import ExplorePage from "./pages/ExplorePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SavedSnippetsPage from "./pages/SavedSnippetsPage";
import SnippetDetailPage from "./pages/SnippetDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/saved" element={<SavedSnippetsPage />} />
        <Route path="/snippets/new" element={<CreateSnippetPage />} />
        <Route path="/snippets/:id/edit" element={<EditSnippetPage />} />
      </Route>

      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/snippets/:id" element={<SnippetDetailPage />} />
    </Routes>
  );
};

export default App;

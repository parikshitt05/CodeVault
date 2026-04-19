import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";
import SnippetCard from "../components/SnippetCard";

const DashboardPage = () => {
  const { user } = useAuth();

  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibility, setVisibility] = useState("");

  useEffect(() => {
    const fetchMySnippets = async () => {
      try {
        setLoading(true);
        setError("");

        const query = visibility ? `?visibility=${visibility}` : "";
        const data = await apiFetch(`/snippets/my${query}`);
        setSnippets(data.snippets);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMySnippets();
  }, [visibility]);

  return (
    <div className="app-page">
      <div className="app-container">
        <section className="panel p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-(--accent)/10 to-(--accent-dark)/10 px-3 py-1.5">
            <svg
              className="h-4 w-4 text-(--accent)"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-(--accent)">
              Personal Workspace
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="page-title">Dashboard</h1>
              <p className="page-subtitle">
                Welcome back,{" "}
                <span className="font-semibold text-(--primary)">
                  {user?.username}
                </span>
                . Keep your best code close, searchable, and ready to reuse.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/snippets/new" className="btn-primary">
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Snippet
                </span>
              </Link>
              <Link to="/saved" className="btn-secondary">
                View Saved
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-(--muted)">
              My Collection
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Your snippets
            </h2>
          </div>

          <select
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
            className="field max-w-44"
          >
            <option value="">All snippets</option>
            <option value="public">Public only</option>
            <option value="private">Private only</option>
          </select>
        </section>

        {loading && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="loading-shimmer h-64 rounded-xl bg-(--panel)"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="error-message mt-8">
            <svg
              className="h-5 w-5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {!loading && !error && snippets.length === 0 && (
          <div className="panel mt-8 p-12">
            <div className="empty-state">
              <svg
                className="empty-state-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <p className="text-lg font-medium">No snippets yet</p>
              <p className="mt-2 text-sm">
                Create your first snippet and start building your vault.
              </p>
              <Link
                to="/snippets/new"
                className="btn-primary mt-6 inline-block"
              >
                Create Snippet
              </Link>
            </div>
          </div>
        )}

        {!loading && !error && snippets.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

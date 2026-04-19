import { Link } from "react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import SnippetCard from "../components/SnippetCard";

const SavedSnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState("");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await apiFetch("/snippets/bookmarks");
        setSnippets(data.snippets);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (snippetId) => {
    try {
      setRemovingId(snippetId);
      await apiFetch(`/snippets/${snippetId}/bookmark`, { method: "DELETE" });
      setSnippets((prev) =>
        prev.filter((snippet) => snippet._id !== snippetId),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setRemovingId("");
    }
  };

  return (
    <div className="app-page">
      <div className="app-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-(--primary)/10 to-(--primary-dark)/10 px-3 py-1.5">
              <svg
                className="h-4 w-4 text-(--primary)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wide text-(--primary)">
                Personal Library
              </span>
            </div>
            <h1 className="page-title">Saved Snippets</h1>
            <p className="page-subtitle">
              The public snippets you kept for later reuse.
            </p>
          </div>

          <Link to="/dashboard" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>

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
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <p className="text-lg font-medium">No saved snippets yet</p>
              <p className="mt-2 text-sm">
                Explore public snippets and bookmark the ones you like.
              </p>
              <Link to="/explore" className="btn-primary mt-6 inline-block">
                Explore Snippets
              </Link>
            </div>
          </div>
        )}

        {!loading && !error && snippets.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {snippets.map((snippet) => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                showAuthor
                actions={
                  <button
                    onClick={() => handleRemoveBookmark(snippet._id)}
                    disabled={removingId === snippet._id}
                    className="btn-danger text-sm"
                  >
                    {removingId === snippet._id ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-3 w-3 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Removing...
                      </span>
                    ) : (
                      "Remove"
                    )}
                  </button>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSnippetsPage;

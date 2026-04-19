import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const SnippetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [snippet, setSnippet] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await apiFetch(`/snippets/${id}`);
        setSnippet(data.snippet);
        setIsBookmarked(Boolean(data.isBookmarked));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  const ownerId =
    typeof snippet?.user === "object" ? snippet?.user?._id : snippet?.user;

  const isOwner = user?._id === ownerId || user?.id === ownerId;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this snippet?",
    );
    if (!confirmed) return;

    try {
      setDeleteLoading(true);
      await apiFetch(`/snippets/${id}`, { method: "DELETE" });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBookmarkToggle = async () => {
    try {
      setBookmarkLoading(true);
      if (isBookmarked) {
        await apiFetch(`/snippets/${id}/bookmark`, { method: "DELETE" });
        setIsBookmarked(false);
      } else {
        await apiFetch(`/snippets/${id}/bookmark`, { method: "POST" });
        setIsBookmarked(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBookmarkLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app-page app-container">
        <div className="loading-shimmer h-96 rounded-xl bg-(--panel)" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-page app-container">
        <div className="error-message">
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
      </div>
    );
  }

  if (!snippet) return null;

  return (
    <div className="app-page">
      <div className="app-container">
        <div className="panel p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-linear-to-r from-(--primary)/10 to-(--primary-dark)/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-(--primary-light)">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {snippet.language}
                </span>
                <span
                  className={`badge ${snippet.visibility === "public" ? "badge-public" : "badge-private"}`}
                >
                  {snippet.visibility}
                </span>
              </div>

              <h1 className="page-title mt-4">{snippet.title}</h1>

              {snippet.user?.username && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-(--primary) to-(--primary-dark) text-sm font-bold text-black">
                    {snippet.user.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {snippet.user.username}
                    </p>
                    <p className="text-xs text-(--muted)">Author</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/explore" className="btn-secondary">
                Explore
              </Link>

              {user && snippet.visibility === "public" && !isOwner && (
                <button
                  onClick={handleBookmarkToggle}
                  disabled={bookmarkLoading}
                  className={isBookmarked ? "btn-secondary" : "btn-primary"}
                >
                  {bookmarkLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
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
                      Updating...
                    </span>
                  ) : isBookmarked ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                      Saved
                    </span>
                  ) : (
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
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      Save snippet
                    </span>
                  )}
                </button>
              )}

              {isOwner && (
                <>
                  <Link
                    to={`/snippets/${snippet._id}/edit`}
                    className="btn-primary"
                  >
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </span>
                  </Link>

                  <button
                    onClick={handleDelete}
                    disabled={deleteLoading}
                    className="btn-danger"
                  >
                    {deleteLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
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
                        Deleting...
                      </span>
                    ) : (
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </span>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {snippet.description && (
            <p className="page-subtitle border-t border-(--border) pt-6">
              {snippet.description}
            </p>
          )}

          {snippet.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-(--border) pt-6">
              {snippet.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="code-panel relative mt-8">
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(snippet.code);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-(--panel-hover) px-3 py-1.5 text-xs font-medium text-(--muted) transition-all hover:text-(--text)"
            >
              {copied ? (
                <>
                  <svg
                    className="h-3.5 w-3.5 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy code
                </>
              )}
            </button>
            <pre className="text-sm leading-7 text-(--text-soft)">
              <code>{snippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};;

export default SnippetDetailPage;

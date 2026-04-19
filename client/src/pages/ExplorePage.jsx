import { useEffect, useState } from "react";
import { Link } from "react-router";
import { apiFetch } from "../lib/api";
import SnippetCard from "../components/SnippetCard";

const ExplorePage = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const fetchPublicSnippets = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();
        if (search.trim()) params.set("search", search.trim());
        if (language.trim()) params.set("language", language.trim());

        const queryString = params.toString();
        const endpoint = queryString
          ? `/snippets/public?${queryString}`
          : "/snippets/public";

        const data = await apiFetch(endpoint);
        setSnippets(data.snippets);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicSnippets();
  }, [search, language]);

  return (
    <div className="app-page">
      <div className="app-container">
        <section className="panel p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
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
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wide text-(--accent)">
                  Community Library
                </span>
              </div>
              <h1 className="page-title">Explore</h1>
              <p className="page-subtitle">
                Browse public snippets, discover useful patterns, and save what
                belongs in your workflow.
              </p>
            </div>

            <Link to="/dashboard" className="btn-secondary">
              Back to Dashboard
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-(--muted-dark)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search snippets..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="field w-full pl-11"
              />
            </div>

            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-(--muted-dark)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <input
                type="text"
                placeholder="Filter by language..."
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="field w-full pl-11"
              />
            </div>
          </div>
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium">No public snippets found</p>
              <p className="mt-2 text-sm">
                Try adjusting your search or language filter.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && snippets.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} showAuthor />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;

import { Link } from "react-router";
import { useState } from "react";
const SnippetCard = ({ snippet, showAuthor = false, actions = null }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="panel group p-6 transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-linear-to-r from-(--primary)/10 to-(--primary-dark)/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-(--primary-light)">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
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

          <Link
            to={`/snippets/${snippet._id}`}
            className="mt-3 block text-xl font-bold tracking-tight text-(--text) transition-colors"
            style={{ "--hover-color": "var(--primary-light)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--primary-light)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            {snippet.title}
          </Link>
        </div>

        <span className="rounded-lg border border-(--border) bg-(--bg-soft) px-3 py-1.5 text-xs font-medium text-(--muted)">
          {new Date(snippet.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {snippet.description && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-(--muted)">
          {snippet.description}
        </p>
      )}

      <div className="code-panel relative mt-4">
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 flex items-center gap-1.5 rounded-md bg-(--panel-hover) px-2 py-1 text-xs font-medium text-(--muted) opacity-0 transition-all group-hover:opacity-100 hover:text-(--text)"
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
              Copy
            </>
          )}
        </button>
        <pre className="text-sm text-(--text-soft)">
          <code>
            {snippet.code.slice(0, 180)}
            {snippet.code.length > 180 ? "..." : ""}
          </code>
        </pre>
      </div>

      {snippet.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {snippet.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">
              #{tag}
            </span>
          ))}
          {snippet.tags.length > 4 && (
            <span className="tag-pill">+{snippet.tags.length - 4} more</span>
          )}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-(--border) pt-4">
        {showAuthor && snippet.user?.username && (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-(--primary) to-(--primary-dark) text-xs font-bold text-black">
              {snippet.user.username.charAt(0).toUpperCase()}
            </div>
            <p className="text-sm font-medium text-(--text-soft)">
              {snippet.user.username}
            </p>
          </div>
        )}

        {actions && <div className="ml-auto">{actions}</div>}
      </div>
    </article>
  );
};

export default SnippetCard;

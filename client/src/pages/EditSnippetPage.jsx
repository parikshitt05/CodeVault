import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import SnippetForm from "../components/SnippetForm";
import { apiFetch } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const EditSnippetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await apiFetch(`/snippets/${id}`);
        setSnippet(data.snippet);
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

  const handleUpdateSnippet = async (formData) => {
    await apiFetch(`/snippets/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
    });
    navigate(`/snippets/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-(--bg) px-6 py-10 text-(--text)">
        <div className="mx-auto max-w-4xl">
          <div className="loading-shimmer h-12 w-48 rounded-lg bg-(--panel)" />
          <div className="loading-shimmer mt-8 h-96 rounded-xl bg-(--panel)" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-(--bg) px-6 py-10 text-(--text)">
        <div className="mx-auto max-w-4xl">
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
      </div>
    );
  }

  if (!snippet) return null;
  if (!isOwner) return <Navigate to={`/snippets/${id}`} replace />;

  return (
    <div className="min-h-screen bg-(--bg) px-6 py-10 text-(--text)">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-(--primary)">
              Edit Mode
            </span>
          </div>
          <h1 className="text-4xl font-bold">Edit Snippet</h1>
          <p className="mt-3 text-(--muted)">
            Update your snippet details and code.
          </p>
        </div>

        <div className="panel p-8">
          <SnippetForm
            onSubmit={handleUpdateSnippet}
            initialValues={snippet}
            submitLabel="Update Snippet"
          />
        </div>
      </div>
    </div>
  );
};

export default EditSnippetPage;

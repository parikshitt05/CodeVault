import { useNavigate } from "react-router";
import SnippetForm from "../components/SnippetForm";
import { apiFetch } from "../lib/api";

const CreateSnippetPage = () => {
  const navigate = useNavigate();

  const handleCreateSnippet = async (formData) => {
    await apiFetch("/snippets", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    navigate("/dashboard");
  };

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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-(--primary)">
              New Snippet
            </span>
          </div>
          <h1 className="text-4xl font-bold">Create Snippet</h1>
          <p className="mt-3 text-(--muted)">
            Save reusable code with tags, visibility, and language metadata.
          </p>
        </div>

        <div className="panel p-8">
          <SnippetForm
            onSubmit={handleCreateSnippet}
            submitLabel="Create Snippet"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateSnippetPage;

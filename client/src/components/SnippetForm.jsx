import { useState } from "react";

const SnippetForm = ({
  onSubmit,
  initialValues,
  submitLabel = "Save Snippet",
}) => {
  const [formData, setFormData] = useState({
    title: initialValues?.title || "",
    code: initialValues?.code || "",
    language: initialValues?.language || "",
    description: initialValues?.description || "",
    tags: initialValues?.tags?.join(", ") || "",
    visibility: initialValues?.visibility || "private",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };
      await onSubmit(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Express auth middleware"
            className="field"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Language *</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="javascript"
            className="field"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="field"
          placeholder="What this snippet solves and where you use it"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm">
            Tags <span className="text-(--muted-dark)">(comma separated)</span>
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="auth, api, middleware"
            className="field"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Visibility *</label>
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="field"
            required
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm">Code *</label>
        <textarea
          name="code"
          value={formData.code}
          onChange={handleChange}
          rows="14"
          className="field font-mono text-sm"
          placeholder="Paste your code here..."
          required
        />
      </div>

      {error && (
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
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full md:w-auto"
      >
        {loading ? (
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
            Saving...
          </span>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};

export default SnippetForm;

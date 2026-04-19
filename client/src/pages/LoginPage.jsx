import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--bg) px-6 py-10 text-(--text)">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-3">
            <Logo size={130} />
          </div>

          <h1 className="text-6xl font-bold leading-tight tracking-tight">
            Reuse your best code
            <span className="mt-2 block bg-linear-to-r from-(--primary) to-(--accent) bg-clip-text text-transparent">
              without digging for it.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--muted)">
            A focused developer workspace for storing snippets, saving
            discoveries, and building your own searchable code library.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-(--border) bg-(--panel) p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-(--primary)/20 to-(--primary-dark)/20">
                  <svg
                    className="h-5 w-5 text-(--primary)"
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
                </div>
                <div>
                  <p className="font-semibold">Quick Access</p>
                  <p className="text-sm text-(--muted)">
                    Find your code instantly
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-(--border) bg-(--panel) p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-(--accent)/20 to-(--accent-dark)/20">
                  <svg
                    className="h-5 w-5 text-(--accent)"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Private & Secure</p>
                  <p className="text-sm text-(--muted)">
                    Your snippets, your control
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel mx-auto w-full max-w-md p-8">
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-(--primary)">
              Welcome Back
            </span>
          </div>

          <h2 className="text-3xl font-bold">Login</h2>
          <p className="mt-2 text-sm text-(--muted)">
            Access your snippets, saved references, and personal vault.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="field"
                placeholder="Enter your password"
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
              className="btn-primary w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
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
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-(--muted)">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-(--primary) transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--primary-light)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

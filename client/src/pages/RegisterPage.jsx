import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
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
      await register(formData);
      navigate("/login");
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
            <Logo size={120} />
          </div>

          <h1 className="text-6xl font-bold leading-tight tracking-tight">
            Build a vault
            <span className="mt-2 block bg-linear-to-r from-(--primary) to-(--accent) bg-clip-text text-transparent">
              you'll actually use.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--muted)">
            Create your account and start collecting the snippets, patterns, and
            ideas you reuse the most.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                step: "1",
                title: "Create your account",
                desc: "Get started in under a minute",
              },
              {
                step: "2",
                title: "Save your snippets",
                desc: "Store code with tags and metadata",
              },
              {
                step: "3",
                title: "Access anywhere",
                desc: "Find your code when you need it",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-(--primary) to-(--primary-dark) text-xs font-bold text-black">
                  {step}
                </div>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-(--muted)">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel mx-auto w-full max-w-md p-8">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-(--accent)">
              New Account
            </span>
          </div>

          <h2 className="text-3xl font-bold">Register</h2>
          <p className="mt-2 text-sm text-(--muted)">
            Start your CodeVault workspace in under a minute.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="field"
                placeholder="Choose a username"
                required
              />
            </div>

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
                placeholder="Create a password"
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
                  Creating account...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-(--muted)">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-(--primary) transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--primary-light)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

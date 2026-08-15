/*==================================================
 NGEPAS REBORN
 Nama File : Login.jsx
 Module    : Admin Pages
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import FormField from "../../components/ui/FormField";
import Input from "../../components/ui/Input";

/*==================================================
 COMPONENT
==================================================*/

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/admin";

  /*==================================================
   HANDLERS
  ==================================================*/

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login gagal.");
    } finally {
      setLoading(false);
    }
  }

  /*==================================================
   RENDER
  ==================================================*/

  return (
    <section className="flex min-h-screen items-center justify-center bg-[var(--np-color-canvas)] px-[var(--np-gutter-mobile)] py-[var(--np-space-8)] sm:px-[var(--np-gutter-tablet)]">
      <div className="w-full max-w-md rounded-np-lg border border-[var(--np-color-border)] bg-[var(--np-color-surface)] p-[var(--np-space-6)] shadow-np-sm sm:p-[var(--np-space-8)]">
        <div className="mb-[var(--np-space-6)] space-y-2">
          <p className="text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--np-color-action-primary)]">
            Ngepas Admin
          </p>
          <h1 className="text-[var(--np-text-h2)] font-semibold leading-[var(--np-leading-heading)] text-[var(--np-color-text-primary)]">
            Login Admin
          </h1>
          <p className="text-[var(--np-text-small)] leading-[var(--np-leading-body)] text-[var(--np-color-text-secondary)]">
            Masuk ke dashboard Ngepas.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-[var(--np-space-4)] rounded-np-sm border border-[var(--np-color-danger)] bg-[var(--np-color-danger-soft)] px-[var(--np-space-3)] py-[var(--np-space-2)] text-[var(--np-text-small)] text-[var(--np-color-danger)]"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-[var(--np-space-4)]">
          <FormField label="Email" htmlFor="email" required>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </FormField>

          <FormField label="Password" htmlFor="password" required>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </FormField>

          <Button type="submit" size="lg" loading={loading} className="w-full">
            Login
          </Button>
        </form>
      </div>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Login;

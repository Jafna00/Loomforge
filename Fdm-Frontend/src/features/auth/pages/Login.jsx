import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login({ email, password });
      navigate(user.role === 'designer' ? '/designer/dashboard' : '/manufacturer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in."
      subtitle="Pick up your projects, quotations, and production runs."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-oxblood bg-oxblood/5 border border-oxblood/20 px-3 py-2">
            {error}
          </p>
        )}

        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-stone">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood transition-colors"
            placeholder="you@studio.com"
          />
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-stone">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-4 bg-ink text-paper font-mono text-[11px] uppercase tracking-widest2 py-3 hover:bg-oxblood transition-colors disabled:opacity-50"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="font-body text-sm text-stone2 mt-8">
        New here?{' '}
        <Link to="/register" className="text-oxblood underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
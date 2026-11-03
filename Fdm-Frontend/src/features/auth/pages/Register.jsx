import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('designer');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await register({ name, email, password, role });
      navigate(user.role === 'designer' ? '/designer/dashboard' : '/manufacturer/dashboard');
    } catch (err) {
      const message =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Join the studio"
      title="Create account."
      subtitle="Tell us which side of the workshop you're on."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-oxblood bg-oxblood/5 border border-oxblood/20 px-3 py-2">
            {error}
          </p>
        )}

        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-stone">
            I am a
          </label>
          <div className="flex gap-3 mt-2">
            {['designer', 'manufacturer'].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 font-mono text-[11px] uppercase tracking-widest border transition-colors ${
                  role === r
                    ? 'bg-ink text-paper border-ink'
                    : 'border-ink/20 text-stone2 hover:border-ink/50'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-stone">
            Full name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 bg-transparent border-b border-ink/20 py-2 font-body text-ink focus:outline-none focus:border-oxblood transition-colors"
            placeholder="Jordan Rivera"
          />
        </div>

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
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="font-body text-sm text-stone2 mt-8">
        Already have an account?{' '}
        <Link to="/login" className="text-oxblood underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
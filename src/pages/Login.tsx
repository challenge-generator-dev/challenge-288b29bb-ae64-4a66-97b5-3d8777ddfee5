import { useState, type FormEvent, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login } from '../services/authService';
import '../styles/global.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const errorRef = useRef<HTMLDivElement>(null);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Por favor ingresa tu correo electrónico y contraseña');
      setIsLoading(false);
      errorRef.current?.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      setIsLoading(false);
      errorRef.current?.focus();
      return;
    }

    try {
      const response = await login({ email, password });
      
      if (response.token) {
        await signIn(response.token, { email, name: response.userName || email.split('@')[0] });
        navigate(from, { replace: true });
      } else {
        setError('Credenciales inválidas. Por favor intenta de nuevo.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión. Por favor intenta de nuevo.';
      setError(errorMessage);
      errorRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await login({ email: 'demo@bank.com', password: 'demo123' });
      
      if (response.token) {
        await signIn(response.token, { email: 'demo@bank.com', name: 'Usuario Demo' });
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('Error al iniciar sesión de demostración');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Banca Digital</h1>
          <p className="login-subtitle">Inicia sesión para acceder a tu cuenta</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div 
              ref={errorRef}
              className="login-error" 
              role="alert"
              tabIndex={-1}
            >
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary login-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

          <div className="login-divider">
            <span>o</span>
          </div>

          <button
            type="button"
            className="btn btn-secondary login-demo"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            Acceso de demostración
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-text">
            ¿Olvidaste tu contraseña? <a href="/recovery" className="login-link">Recuperar</a>
          </p>
        </div>
      </div>
    </div>
  );
}
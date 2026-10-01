import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { getBalance, getRecentTransactions } from '../services/transactionService';
import type { Transaction } from '../types';
import '../styles/global.css';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data: balance, isLoading: balanceLoading, error: balanceError } = useQuery({
    queryKey: ['balance'],
    queryFn: getBalance,
    staleTime: 30000,
    refetchInterval: 60000,
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['recentTransactions'],
    queryFn: () => getRecentTransactions(5),
    staleTime: 30000,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getTransactionIcon = (type: string): string => {
    switch (type) {
      case 'transfer':
        return '→';
      case 'deposit':
        return '↑';
      case 'payment':
        return '↓';
      default:
        return '•';
    }
  };

  const getTransactionClass = (type: string): string => {
    switch (type) {
      case 'transfer':
      case 'payment':
        return 'transaction-item--debit';
      case 'deposit':
        return 'transaction-item--credit';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-header__content">
          <h1 className="dashboard-logo">Banca Digital</h1>
          <div className="dashboard-user">
            <span className="dashboard-user__name">
              Hola, {user?.name || 'Usuario'}
            </span>
            <button 
              className="btn btn-outline dashboard-logout"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <h2 className="dashboard-title">Tu cuenta</h2>
          <p className="dashboard-date">
            {currentTime.toLocaleDateString('es-CO', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <section className="dashboard-balance">
          <div className="balance-card">
            <h3 className="balance-card__title">Saldo disponible</h3>
            {balanceLoading ? (
              <div className="balance-card__loading">Cargando...</div>
            ) : balanceError ? (
              <div className="balance-card__error">
                Error al cargar el saldo
              </div>
            ) : (
              <p className="balance-card__amount">
                {formatCurrency(balance?.amount || 0)}
              </p>
            )}
            <span className="balance-card__label">Cuenta principal</span>
          </div>
        </section>

        <section className="dashboard-actions">
          <h3 className="dashboard-section-title">Operaciones</h3>
          <div className="action-grid">
            <Link to="/transfer" className="action-card">
              <span className="action-card__icon">↗</span>
              <span className="action-card__label">Transferir</span>
            </Link>
            <Link to="/history" className="action-card">
              <span className="action-card__icon">☰</span>
              <span className="action-card__label">Historial</span>
            </Link>
          </div>
        </section>

        <section className="dashboard-transactions">
          <div className="transactions-header">
            <h3 className="dashboard-section-title">Últimas transacciones</h3>
            <Link to="/history" className="transactions-see-all">
              Ver todas
            </Link>
          </div>
          
          {transactionsLoading ? (
            <div className="transactions-loading">Cargando transacciones...</div>
          ) : transactions && transactions.length > 0 ? (
            <ul className="transactions-list">
              {transactions.map((tx: Transaction) => (
                <li 
                  key={tx.id} 
                  className={`transaction-item ${getTransactionClass(tx.type)}`}
                >
                  <span className="transaction-item__icon">
                    {getTransactionIcon(tx.type)}
                  </span>
                  <div className="transaction-item__details">
                    <span className="transaction-item__description">
                      {tx.description}
                    </span>
                    <span className="transaction-item__date">
                      {formatDate(tx.date)}
                    </span>
                  </div>
                  <span className={`transaction-item__amount ${
                    tx.type === 'deposit' ? 'transaction-item__amount--credit' : 'transaction-item__amount--debit'
                  }`}>
                    {tx.type === 'deposit' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="transactions-empty">
              <p>No hay transacciones recientes</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
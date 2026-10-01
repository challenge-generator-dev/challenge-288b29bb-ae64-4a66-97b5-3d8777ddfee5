import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';
import tokenStorage from '../utils/storage';

interface Transaction {
  id: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  recipientName?: string;
  recipientAccount?: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionHistoryResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface TransactionHistoryProps {
  onError?: (error: string) => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onError }) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  const fetchTransactions = useCallback(async (page: number, sort: 'asc' | 'desc') => {
    setLoading(true);
    try {
      if (!tokenStorage.hasToken()) {
        navigate('/login');
        return;
      }

      const response = await apiClient.get<TransactionHistoryResponse>(
        `/transactions?page=${page}&pageSize=${pageSize}&sort=${sort}`
      );

      setTransactions(response.transactions);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      setCurrentPage(response.page);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar transacciones';
      onError?.(message);
    } finally {
      setLoading(false);
    }
  }, [navigate, onError]);

  useEffect(() => {
    fetchTransactions(currentPage, sortOrder);
  }, [currentPage, sortOrder, fetchTransactions]);

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSortToggle = (): void => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const formatAmount = (amount: number, type: string): string => {
    const prefix = type === 'credit' ? '+' : '-';
    return `${prefix}$${Math.abs(amount).toFixed(2)}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusClass = (status: string): string => {
    const statusMap: Record<string, string> = {
      completed: 'status--completed',
      pending: 'status--pending',
      failed: 'status--failed',
    };
    return `status ${statusMap[status] || ''}`;
  };

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="transaction-history">
        <div className="transaction-history__loader">
          <div className="spinner"></div>
          <p>Cargando transacciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-history">
      <header className="transaction-history__header">
        <h1 className="transaction-history__title">Historial de Transacciones</h1>
        <div className="transaction-history__controls">
          <button
            className="btn btn--secondary"
            onClick={handleSortToggle}
            aria-label={`Ordenar por fecha ${sortOrder === 'asc' ? 'ascendente' : 'descendente'}`}
          >
            {sortOrder === 'asc' ? '↑ Más antiguo' : '↓ Más reciente'}
          </button>
        </div>
      </header>

      <div className="transaction-history__summary">
        <span className="transaction-history__total">
          Total: {total} transacción{total !== 1 ? 'es' : ''}
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="transaction-history__empty">
          <p>No hay transacciones para mostrar</p>
        </div>
      ) : (
        <>
          <ul className="transaction-history__list">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="transaction-item">
                <div className="transaction-item__info">
                  <span className="transaction-item__date">
                    {formatDate(transaction.date)}
                  </span>
                  <span className="transaction-item__description">
                    {transaction.description}
                  </span>
                  {transaction.recipientName && (
                    <span className="transaction-item__recipient">
                      Hacia: {transaction.recipientName}
                      {transaction.recipientAccount && ` (${transaction.recipientAccount})`}
                    </span>
                  )}
                </div>
                <div className="transaction-item__amount">
                  <span className={`amount amount--${transaction.type}`}>
                    {formatAmount(transaction.amount, transaction.type)}
                  </span>
                  <span className={getStatusClass(transaction.status)}>
                    {transaction.status === 'completed' && 'Completada'}
                    {transaction.status === 'pending' && 'Pendiente'}
                    {transaction.status === 'failed' && 'Fallida'}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <nav className="transaction-history__pagination" aria-label="Paginación de transacciones">
              <button
                className="btn btn--outline"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                aria-label="Primera página"
              >
                ««
              </button>
              <button
                className="btn btn--outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
              >
                «
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  className={`btn btn--outline ${currentPage === page ? 'btn--active' : ''}`}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Página ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                className="btn btn--outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Página siguiente"
              >
                »
              </button>
              <button
                className="btn btn--outline"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Última página"
              >
                »»
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
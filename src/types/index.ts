export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
  balance: number;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: number;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  recipientAccount?: string;
  senderAccount?: string;
  status: TransactionStatus;
  createdAt: string;
  completedAt?: string;
  referenceId?: string;
}

export type TransactionType = 'transfer' | 'deposit' | 'withdrawal' | 'payment';

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface TransferRequest {
  recipientAccount: string;
  amount: number;
  description: string;
  idempotencyKey: string;
}

export interface TransferResponse {
  transactionId: string;
  status: TransactionStatus;
  message: string;
  timestamp: string;
}

export interface TransactionHistoryParams {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
  status?: TransactionStatus;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

export interface BalanceResponse {
  available: number;
  pending: number;
  currency: string;
  lastUpdated: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  expiresAt: number | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export interface PrivateRouteProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface TransactionFormData {
  recipientAccount: string;
  amount: string;
  description: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}
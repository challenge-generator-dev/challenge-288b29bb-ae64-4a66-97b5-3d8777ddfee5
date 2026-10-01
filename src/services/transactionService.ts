import axios, { AxiosError } from 'axios';
import { getToken } from '../utils/storage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.banco-ejemplo.com';

export interface Transaction {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  idempotencyKey: string;
}

export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  description: string;
}

export interface TransferResponse {
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  message: string;
  timestamp: string;
}

export interface TransactionHistoryParams {
  accountId: string;
  page: number;
  pageSize: number;
  startDate?: string;
  endDate?: string;
}

export interface TransactionHistoryResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ServiceError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

class TransactionService {
  private axiosInstance;
  private idempotencyKeys: Map<string, string>;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_BASE_URL}/api/v1`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.idempotencyKeys = new Map();

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ServiceError>) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            window.location.href = '/login';
          } else if (status === 429) {
            console.warn('Rate limit exceeded, retrying after cooldown');
          } else if (status >= 500) {
            console.error('Server error, please try again later');
          }
        } else if (error.request) {
          console.error('Network error: no response received');
        }
        return Promise.reject(error);
      }
    );
  }

  generateIdempotencyKey(): string {
    const key = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return key;
  }

  async transfer(request: TransferRequest): Promise<TransferResponse> {
    const idempotencyKey = this.generateIdempotencyKey();

    if (this.idempotencyKeys.has(idempotencyKey)) {
      console.warn('Duplicate idempotency key detected, returning cached result');
      throw new Error('Duplicate request detected');
    }

    this.idempotencyKeys.set(idempotencyKey, 'pending');

    try {
      const response = await this.axiosInstance.post<TransferResponse>(
        '/transactions/transfer',
        {
          ...request,
          idempotencyKey,
        },
        {
          headers: {
            'Idempotency-Key': idempotencyKey,
          },
        }
      );

      this.idempotencyKeys.set(idempotencyKey, 'completed');
      return response.data;
    } catch (error) {
      this.idempotencyKeys.delete(idempotencyKey);
      throw this.handleError(error);
    }
  }

  async getTransactionHistory(params: TransactionHistoryParams): Promise<TransactionHistoryResponse> {
    try {
      const response = await this.axiosInstance.get<TransactionHistoryResponse>(
        `/transactions/history/${params.accountId}`,
        {
          params: {
            page: params.page,
            pageSize: params.pageSize,
            startDate: params.startDate,
            endDate: params.endDate,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getTransactionById(transactionId: string): Promise<Transaction> {
    try {
      const response = await this.axiosInstance.get<Transaction>(
        `/transactions/${transactionId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAccountBalance(accountId: string): Promise<{ balance: number; currency: string }> {
    try {
      const response = await this.axiosInstance.get<{ balance: number; currency: string }>(
        `/accounts/${accountId}/balance`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ServiceError>;
      if (axiosError.response?.data) {
        return new Error(axiosError.response.data.message || 'Transaction failed');
      }
      if (axiosError.code === 'ECONNABORTED') {
        return new Error('Request timeout, please try again');
      }
      if (!axiosError.response) {
        return new Error('Network error, please check your connection');
      }
    }
    return new Error('An unexpected error occurred');
  }

  clearIdempotencyCache(): void {
    this.idempotencyKeys.clear();
  }

  removeIdempotencyKey(key: string): void {
    this.idempotencyKeys.delete(key);
  }
}

export const transactionService = new TransactionService();
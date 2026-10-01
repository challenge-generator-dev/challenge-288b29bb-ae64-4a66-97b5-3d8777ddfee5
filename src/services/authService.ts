import axios from 'axios';
import { encryptToken, decryptToken, saveToken, getToken, removeToken } from '../utils/storage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.banco-ejemplo.com';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: number;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    throw new Error('AuthService.login not implemented');
  }

  async logout(): Promise<void> {
    throw new Error('AuthService.logout not implemented');
  }

  async refreshToken(): Promise<string> {
    throw new Error('AuthService.refreshToken not implemented');
  }

  async validateToken(token: string): Promise<boolean> {
    throw new Error('AuthService.validateToken not implemented');
  }
}

export const authService = new AuthService();
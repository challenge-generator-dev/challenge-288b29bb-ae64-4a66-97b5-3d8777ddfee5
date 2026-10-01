import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'auth_token';
const ENCRYPTION_KEY = 'banking_spa_secure_key_2024';

export interface StorageOptions {
  useSessionStorage?: boolean;
  encrypt?: boolean;
}

class TokenStorage {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  }

  private decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  setStorageType(useSession: boolean): void {
    this.storage = useSession ? sessionStorage : localStorage;
  }

  saveToken(token: string, options: StorageOptions = {}): void {
    const { encrypt = true } = options;
    const dataToStore = encrypt ? this.encrypt(token) : token;
    this.storage.setItem(STORAGE_KEY, dataToStore);
  }

  getToken(options: StorageOptions = {}): string | null {
    const { encrypt = true } = options;
    const stored = this.storage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return encrypt ? this.decrypt(stored) : stored;
  }

  removeToken(): void {
    this.storage.removeItem(STORAGE_KEY);
  }

  hasToken(): boolean {
    return this.storage.getItem(STORAGE_KEY) !== null;
  }

  clearAll(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}

export const tokenStorage = new TokenStorage();
export default tokenStorage;
# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `src/context/AuthContext.tsx` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/hooks/useAuth.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/services/authService.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `src/context/AuthContext.tsx`

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/services/transactionService.ts` — `TransferRequest.use`: Se invoca `use` sobre `TransferRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/pages/TransactionHistory.tsx` — `Transaction.map`: Se invoca `map` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Contexto técnico original
Construir una SPA con React, TypeScript, hooks y Context API

### Reto
- Tema: React TypeScript
- Seniority: junior-l1
- Tipo: practical
- Título: Desarrollo de una SPA con React y TypeScript
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial y autenticación — objetivo: Configurar el proyecto y manejar la autenticación de usuarios. — entregable (NO resolver): Proyecto de React configurado con TypeScript y autenticación de usuarios funcional.
- Fase 2: Visualización del saldo y realización de transferencias — objetivo: Implementar la visualización del saldo del usuario y la realización de transferencias. — entregable (NO resolver): Interfaz de usuario que muestra el saldo del usuario y permite realizar transferencias idempotentes.
- Fase 3: Consulta del historial de transacciones — objetivo: Implementar la consulta del historial de transacciones del usuario. — entregable (NO resolver): Interfaz de usuario que permite consultar el historial de transacciones del usuario con paginación.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: vite.config.ts ===
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})

// === ARCHIVO: src/main.tsx ===
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'

// Crear cliente de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000 // 5 minutos
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

// === ARCHIVO: package.json ===
{
  "name": "banking-spa",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write src/**/*.{ts,tsx}"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.7.2",
    "react-router-dom": "^6.23.0",
    "@tanstack/react-query": "^5.32.0",
    "crypto-js": "^4.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.79",
    "@types/react-dom": "^18.2.25",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.4.5",
    "vite": "^5.2.10",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "prettier": "^3.2.5",
    "@testing-library/react": "^15.0.2",
    "@testing-library/jest-dom": "^6.4.2",
    "@types/crypto-js": "^4.2.2"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "plugins": [
      "react",
      "react-hooks",
      "@typescript-eslint",
      "react-refresh"
    ],
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react-refresh/only-export-components": [
        "warn",
        { "allowConstantExport": true }
      ]
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  },
  "prettier": {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "printWidth": 100
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vite/client"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

// === ARCHIVO: src/index.tsx ===
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/global.css'

// Configuración del cliente de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      refetchInterval: 30 * 60 * 1000 // Refrescar cada 30 minutos
    },
  },
})

// Componente raíz con manejo de errores global
const Root = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Router>
              <App />
            </Router>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
}

// Renderizado de la aplicación
ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)

// === ARCHIVO: src/App.tsx ===
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Transfer from './pages/Transfer'
import TransactionHistory from './pages/TransactionHistory'

const App: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={(
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )}
        />
        <Route
          path="/transfer"
          element={(
            <PrivateRoute>
              <Transfer />
            </PrivateRoute>
          )}
        />
        <Route
          path="/history"
          element={(
            <PrivateRoute>
              <TransactionHistory />
            </PrivateRoute>
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App

// === ARCHIVO: index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Aplicación de banca digital - Consulta tu saldo, realiza transferencias y consulta tu historial de transacciones" />
    <meta name="author" content="Banking SPA Team" />
    <meta name="theme-color" content="#1e3a5f" />
    <title>Banco Digital - Tu Banca en Línea</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background-color: #f5f7fa;
        color: #333;
        line-height: 1.6;
      }
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .loading-screen {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
      }
      .loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.2);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading-screen">
        <div class="loading-spinner"></div>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: src/types/index.ts ===
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

// === ARCHIVO: src/hooks/useAuth.ts ===
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// === ARCHIVO: src/services/authService.ts ===
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

// === ARCHIVO: src/services/transactionService.ts ===
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

// === ARCHIVO: src/pages/Login.tsx ===
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

// === ARCHIVO: src/pages/Dashboard.tsx ===
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

// === ARCHIVO: src/pages/Transfer.tsx ===
import { useState, type FormEvent, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import CryptoJS from 'crypto-js';
import { useAuth } from '../hooks/useAuth';
import { createTransfer } from '../services/transactionService';
import '../styles/global.css';

interface TransferFormData {
  recipientAccount: string;
  amount: number;
  description: string;
}

export default function Transfer() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<TransferFormData>({
    recipientAccount: '',
    amount: 0,
    description: '',
  });
  const [errors, setErrors] = useState<Partial<TransferFormData>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  const generateIdempotencyKey = useCallback((): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const data = `${user?.email}-${timestamp}-${random}`;
    const hash = CryptoJS.SHA256(data).toString();
    return `${timestamp}-${hash.substring(0, 16)}`;
  }, [user?.email]);

  const transferMutation = useMutation({
    mutationFn: (data: { formData: TransferFormData; key: string }) => 
      createTransfer(data.formData, data.key),
    onSuccess: () => {
      alert('Transferencia realizada con éxito');
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      alert(`Error al realizar la transferencia: ${error.message}`);
      setShowConfirm(false);
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<TransferFormData> = {};

    if (!formData.recipientAccount.trim()) {
      newErrors.recipientAccount = 'El número de cuenta es obligatorio';
    } else if (!/^\d{8,16}$/.test(formData.recipientAccount.replace(/\s/g, ''))) {
      newErrors.recipientAccount = 'Ingresa un número de cuenta válido (8-16 dígitos)';
    }

    if (formData.amount <= 0) {
      newErrors.amount = 'El monto debe ser mayor a $0';
    } else if (formData.amount > 10000000) {
      newErrors.amount = 'El monto máximo por transferencia es $10,000,000';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.length > 200) {
      newErrors.description = 'La descripción no puede exceder 200 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof TransferFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const key = generateIdempotencyKey();
      setIdempotencyKey(key);
      setShowConfirm(true);
      setTimeout(() => confirmationRef.current?.focus(), 100);
    }
  };

  const handleConfirmTransfer = () => {
    transferMutation.mutate({ formData, key: idempotencyKey });
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
    formRef.current?.focus();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatAccountNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  return (
    <div className="transfer-page">
      <header className="transfer-header">
        <button 
          className="btn btn-back"
          onClick={() => navigate('/dashboard')}
        >
          ← Volver
        </button>
        <h1 className="transfer-title">Nueva transferencia</h1>
      </header>

      <main className="transfer-main">
        <form 
          ref={formRef}
          className="transfer-form" 
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="recipientAccount" className="form-label">
              Cuenta destino
            </label>
            <input
              id="recipientAccount"
              type="text"
              className={`form-input ${errors.recipientAccount ? 'form-input--error' : ''}`}
              value={formData.recipientAccount}
              onChange={(e) => handleInputChange('recipientAccount', formatAccountNumber(e.target.value))}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              autoComplete="off"
            />
            {errors.recipientAccount && (
              <span className="form-error">{errors.recipientAccount}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Monto a transferir
            </label>
            <div className="input-currency">
              <span className="input-currency__symbol">$</span>
              <input
                id="amount"
                type="number"
                className={`form-input form-input--currency ${errors.amount ? 'form-input--error' : ''}`}
                value={formData.amount || ''}
                onChange={(e) => handleInputChange('amount', parseInt(e.target.value) || 0)}
                placeholder="0"
                min={1}
                max={10000000}
                step={1000}
              />
            </div>
            {errors.amount && (
              <span className="form-error">{errors.amount}</span>
            )}
            <span className="form-hint">
              Monto máximo: $10,000,000 COP
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <textarea
              id="description"
              className={`form-input form-textarea ${errors.description ? 'form-input--error' : ''}`}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Ej: Pago de servicios, Transferencia a familia..."
              maxLength={200}
              rows={3}
            />
            <div className="form-textarea-footer">
              {errors.description && (
                <span className="form-error">{errors.description}</span>
              )}
              <span className="form-counter">
                {formData.description.length}/200
              </span>
            </div>
          </div>

          <div className="transfer-summary">
            <h3 className="transfer-summary__title">Resumen</h3>
            <div className="transfer-summary__row">
              <span>Destino:</span>
              <span>{formatAccountNumber(formData.recipientAccount) || '—'}</span>
            </div>
            <div className="transfer-summary__row">
              <span>Monto:</span>
              <span className="transfer-summary__amount">
                {formatCurrency(formData.amount)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={transferMutation.isPending}
          >
            {transferMutation.isPending ? 'Procesando...' : 'Continuar'}
          </button>
        </form>

        {showConfirm && (
          <div 
            ref={confirmationRef}
            className="transfer-confirm" 
            role="dialog"
            aria-labelledby="confirm-title"
          >
            <div className="transfer-confirm__content">
              <h2 id="confirm-title" className="transfer-confirm__title">
                Confirmar transferencia
              </h2>
              <div className="transfer-confirm__details">
                <div className="transfer-confirm__row">
                  <span className="transfer-confirm__label">Destino:</span>
                  <span className="transfer-confirm__value">
                    {formatAccountNumber(formData.recipientAccount)}
                  </span>
                </div>
                <div className="transfer-confirm__row">
                  <span className="transfer-confirm__label">Monto:</span>
                  <span className="transfer-confirm__value transfer-confirm__value--highlight">
                    {formatCurrency(formData.amount)}
                  </span>
                </div>
                <div className="transfer-confirm__row">
                  <span className="transfer-confirm__label">Descripción:</span>
                  <span className="transfer-confirm__value">
                    {formData.description}
                  </span>
                </div>
                <div className="transfer-confirm__row">
                  <span className="transfer-confirm__label">ID de operación:</span>
                  <span className="transfer-confirm__value transfer-confirm__value--mono">
                    {idempotencyKey}
                  </span>
                </div>
              </div>
              <p className="transfer-confirm__warning">
                ¿Estás seguro de realizar esta transferencia? Esta acción no se puede deshacer.
              </p>
              <div className="transfer-confirm__actions">
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelConfirm}
                  disabled={transferMutation.isPending}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmTransfer}
                  disabled={transferMutation.isPending}
                >
                  {transferMutation.isPending ? 'Enviando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// === ARCHIVO: src/utils/storage.ts ===
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

// === ARCHIVO: src/utils/api.ts ===
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import tokenStorage from './storage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

class ApiClient {
  private client;
  private refreshPromise: Promise<string | null> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = tokenStorage.getToken({ encrypt: true });
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError<{ message?: string; code?: string }>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshToken();
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            tokenStorage.removeToken();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'Error de conexión',
          status: error.response?.status || 0,
          code: error.response?.data?.code,
        };
        return Promise.reject(apiError);
      }
    );
  }

  private async refreshToken(): Promise<string | null> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const currentToken = tokenStorage.getToken({ encrypt: false });
        if (!currentToken) return null;

        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          {
            headers: { Authorization: `Bearer ${currentToken}` },
          }
        );

        const newToken = response.data.token;
        tokenStorage.saveToken(newToken, { encrypt: true });
        return newToken;
      } catch {
        tokenStorage.removeToken();
        return null;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;

// === ARCHIVO: src/pages/TransactionHistory.tsx ===
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

// === ARCHIVO: src/components/PrivateRoute.tsx ===
import { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  children?: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="private-route__loading">
        <div className="loading-spinner" aria-label="Cargando autenticación">
          <div className="loading-spinner__circle"></div>
        </div>
        <p className="private-route__loading-text">Verificando sesión...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default PrivateRoute;

// === ARCHIVO: src/components/ErrorBoundary.tsx ===
import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 className="error-boundary__title">
              Algo salió mal
            </h2>
            <p className="error-boundary__message">
              Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-boundary__details">
                <summary>Detalles del error (desarrollo)</summary>
                <pre className="error-boundary__stack">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button
              className="error-boundary__button"
              onClick={this.handleRetry}
              type="button"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// === ARCHIVO: src/styles/global.css ===
:root {
  /* Colores primarios */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-light: #dbeafe;
  --color-primary-dark: #1e40af;

  /* Colores secundarios */
  --color-secondary: #64748b;
  --color-secondary-hover: #475569;

  /* Colores semánticos */
  --color-success: #10b981;
  --color-success-light: #d1fae5;
  --color-error: #ef4444;
  --color-error-light: #fee2e2;
  --color-warning: #f59e0b;
  --color-warning-light: #fef3c7;
  --color-info: #3b82f6;
  --color-info-light: #dbeafe;

  /* Colores neutros */
  --color-white: #ffffff;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-black: #000000;

  /* Tipografía */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;

  /* Espaciado */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;

  /* Bordes */
  --border-radius-sm: 0.25rem;
  --border-radius: 0.375rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;
  --border-radius-full: 9999px;
  --border-width: 1px;
  --border-width-2: 2px;

  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

  /* Transiciones */
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
  --transition-delay: 500ms;

  /* Z-index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

/* Reset básico */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  color: var(--color-gray-800);
  background-color: var(--color-gray-50);
  min-height: 100vh;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast) ease-in-out;
}

a:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

a:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

ul,
ol {
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-gray-900);
}

h1 {
  font-size: var(--font-size-4xl);
}

h2 {
  font-size: var(--font-size-3xl);
}

h3 {
  font-size: var(--font-size-2xl);
}

h4 {
  font-size: var(--font-size-xl);
}

/* Utilidades globales */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Loading spinner */
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-8);
}

.loading-spinner__circle {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-gray-200);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Estilos para PrivateRoute */
.private-route__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-gray-50);
}

.private-route__loading-text {
  margin-top: var(--spacing-4);
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
}

/* Estilos para ErrorBoundary */
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-4);
  background-color: var(--color-gray-50);
}

.error-boundary__container {
  text-align: center;
  max-width: 480px;
  padding: var(--spacing-8);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
}

.error-boundary__icon {
  color: var(--color-error);
  margin-bottom: var(--spacing-4);
}

.error-boundary__title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-2);
}

.error-boundary__message {
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-6);
}

.error-boundary__details {
  text-align: left;
  margin-bottom: var(--spacing-6);
  padding: var(--spacing-3);
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius);
  cursor: pointer;
}

.error-boundary__stack {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  white-space: pre-wrap;
  word-break: break-word;
  margin-top: var(--spacing-2);
  color: var(--color-gray-700);
}

.error-boundary__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  transition: background-color var(--transition-fast) ease-in-out;
}

.error-boundary__button:hover {
  background-color: var(--color-primary-hover);
}

.error-boundary__button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

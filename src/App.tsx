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
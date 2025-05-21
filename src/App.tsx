import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useUser } from './context/AuthContext'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import { JSX } from 'react'
import './App.css'
import './index.css'
import SignUp from './pages/SignUp'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useUser()
  if (!user) return <Navigate to="/signin" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}

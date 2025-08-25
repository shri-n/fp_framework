// import React, { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (username, password) => {
//     // fake login
//     setUser({ username });
//   };

//   const register = (username, password) => {
//     // fake register
//     setUser({ username });
//   };

//   const logout = () => setUser(null);

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await authAPI.getCurrentUser()
        setUser(response)
      } catch (error) {
        localStorage.removeItem('token')
        setError('Session expired')
      }
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await authAPI.login(email, password)
      
      localStorage.setItem('token', response.token)
      setUser(response.user)
      
      return { success: true }
    } catch (error) {
      const message = error.message || 'Login failed'
      setError(message)
      return { success: false, error: message }
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      const response = await authAPI.register(userData)
      
      localStorage.setItem('token', response.token)
      setUser(response.user)
      
      return { success: true }
    } catch (error) {
      const message = error.message || 'Registration failed'
      setError(message)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError: () => setError(null)
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
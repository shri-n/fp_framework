import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import HomePage from './components/HomePage'
import FunctionsPage from './components/FunctionsPage'
import FunctionCreateForm from './components/FunctionCreateForm'

const AppContent = () => {
  const { user, loading } = useAuth()
  const [showRegister, setShowRegister] = useState(false)
  const [view, setView] = useState("home")

  // Function to derive view from path
  const pathToView = (path) => {
    if (path === "/functions") return "functions"
    if (path === "/functionCreate") return "functionCreate"
    return "home"
  }

  // Sync initial view with URL
  useEffect(() => {
    setView(pathToView(window.location.pathname))

    // Listen for browser back/forward
    const handlePopState = () => {
      setView(pathToView(window.location.pathname))
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Change view and update URL
  const changeView = (nextView) => {
    setView(nextView)
    if (nextView === "functions") {
      window.history.pushState({}, "", "/functions")
    } else if (nextView === "functionCreate") {
      window.history.pushState({}, "", "/functionCreate")
    } else {
      window.history.pushState({}, "", "/")
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (user) {
    if (view === "home") {
      return <HomePage goToFunctions={() => changeView("functions")} />
    }
    if (view === "functions") {
      return (
        <FunctionsPage
          goBack={() => changeView("home")}
          goToCreate={() => changeView("functionCreate")}
        />
      )
    }
    if (view === "functionCreate") {
      return <FunctionCreateForm goBack={() => changeView("functions")} />
    }
  }

  return showRegister ? (
    <RegisterForm onToggleForm={() => setShowRegister(false)} />
  ) : (
    <LoginForm onToggleForm={() => setShowRegister(true)} />
  )
}

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
)

export default App

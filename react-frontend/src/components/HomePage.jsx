import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

const HomePage = ({ goToFunctions }) => {
  const { user, logout } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="header-content">
          <h1 className="homepage-title">Dashboard</h1>
          <div className="user-section">
            <span className="user-name">Welcome, {user?.name}!</span>
            <button onClick={logout} className="logout-btn">Sign Out</button>
          </div>
        </div>
      </header>

      <main className="homepage-main">
        <div className="dashboard-grid">
          {/* Time */}
          <div className="dashboard-card time-card">
            <h2 className="card-title">Current Time</h2>
            <div className="time-display">{formatTime(currentTime)}</div>
            <div className="date-display">{formatDate(currentTime)}</div>
          </div>

          {/* User info */}
          <div className="dashboard-card">
            <h2 className="card-title">User Information</h2>
            <div className="user-details">
              <div className="user-detail"><span className="user-detail-label">Name:</span>{user?.full_name}</div>
              <div className="user-detail"><span className="user-detail-label">Email:</span>{user?.email}</div>
              <div className="user-detail"><span className="user-detail-label">User ID:</span>#{user?.id}</div>
            </div>
          </div>

          {/* Links */}
          <div className="dashboard-card">
            <h2 className="card-title">Links</h2>
            <button
              onClick={goToFunctions}
              className="action-btn action-btn-primary"
            >
              View Functions
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage

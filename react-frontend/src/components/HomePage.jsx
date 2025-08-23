import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const HomePage = () => {
  const { user, logout } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="header-content">
          <h1 className="homepage-title">Dashboard</h1>
          <div className="user-section">
            <span className="user-name">Welcome, {user?.name}!</span>
            <button onClick={logout} className="logout-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="homepage-main">
        <div className="dashboard-grid">
          <div className="dashboard-card time-card">
            <h2 className="card-title">Current Time</h2>
            <div className="time-display">{formatTime(currentTime)}</div>
            <div className="date-display">{formatDate(currentTime)}</div>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">User Information</h2>
            <div className="user-details">
              <div className="user-detail">
                <span className="user-detail-label">Name:</span>
                <span>{user?.name}</span>
              </div>
              <div className="user-detail">
                <span className="user-detail-label">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="user-detail">
                <span className="user-detail-label">User ID:</span>
                <span>#{user?.id}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-btn action-btn-primary">View Profile</button>
              <button className="action-btn action-btn-secondary">Settings</button>
              <button className="action-btn action-btn-secondary">Help & Support</button>
            </div>
          </div>

          <div className="dashboard-card stats-full-width">
            <h2 className="card-title">Statistics</h2>
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-number">24</div>
                <div className="stat-label">Days Active</div>
              </div>
              <div className="stat">
                <div className="stat-number">156</div>
                <div className="stat-label">Total Visits</div>
              </div>
              <div className="stat">
                <div className="stat-number">98%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
const API_BASE_URL = 'http://localhost:3000'

// Simple fetch wrapper
const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token')
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config)
    const data = await response.json()

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      throw new Error(data.error || 'Something went wrong')
    }

    return data
  } catch (error) {
    throw error
  }
}

export const authAPI = {
  login: (email, password) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  
  logout: () => apiRequest('/auth/logout', {
    method: 'DELETE',
  }),
  
  getCurrentUser: () => apiRequest('/me'),
  
  register: (userData) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify({ user: userData }),
  }),
}

export const ServiceAPI = {
  // Fetch all functions
  index: () => apiRequest('/services'),

  // Fetch a single function by ID
  show: (id) => apiRequest(`/services/${id}`),

  // Create a new function
  create: (data) => apiRequest('/services', {
    method: 'POST',
    body: JSON.stringify({ services: data }),
  }),

  // Update an existing function
  update: (id, data) => apiRequest(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ function: data }),
  }),

  // Delete a function
  delete: (id) => apiRequest(`/services/${id}`, {
    method: 'DELETE',
  }),

  run: (params) => apiRequest(`/services/${id}/run`, {
    method: 'POST',
    body: JSON.stringify({ params: params }),
  }),
}


export const healthCheck = () => apiRequest('/health')
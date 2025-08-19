import { LoginResponse } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string = '') {
    // Since we're using Next.js API routes, we don't need a base URL
    this.baseURL = baseURL
    
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `/api${endpoint}`
    
    const headers: HeadersInit = {
      ...options.headers,
    }

    // Only set JSON content type when body is not FormData and header not already provided
    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
    if (!isFormData && !('Content-Type' in (headers as any))) {
      ;(headers as any)['Content-Type'] = 'application/json'
    }

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Auth methods
  async login(email: string, password: string): Promise<LoginResponse> {
    console.log('ApiClient: Starting login request for:', email)
    const result = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    console.log('ApiClient: Login response:', result)
    return result
  }

  // Categories methods
  async getCategories(includeSubcategories = true) {
    return this.request(`/categories?include_subcategories=${includeSubcategories}`)
  }

  async createCategory(categoryData: any) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    })
  }

  async updateCategory(id: number, updates: any) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteCategory(id: number) {
    return this.request(`/categories/${id}`, {
      method: 'DELETE',
    })
  }

  // Documents methods
  async getDocuments(params: {
    page?: number
    limit?: number
    category?: string
    search?: string
    status?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })
    
    return this.request(`/documents?${searchParams.toString()}`)
  }

  async getDocument(id: number) {
    return this.request(`/documents/${id}`)
  }

  async createDocument(documentData: any) {
    return this.request('/documents', {
      method: 'POST',
      body: JSON.stringify(documentData),
    })
  }

  async uploadDocument(formData: FormData) {
    return this.request('/documents', {
      method: 'POST',
      body: formData,
    })
  }

  async updateDocument(id: number, updates: any) {
    return this.request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteDocument(id: number) {
    return this.request(`/documents/${id}`, {
      method: 'DELETE',
    })
  }

  // Analytics methods
  async getAnalytics(params: {
    start_date?: string
    end_date?: string
    metric_type?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value)
      }
    })
    
    return this.request(`/analytics?${searchParams.toString()}`)
  }

  // Activity logs methods
  async getActivityLogs(params: {
    page?: number
    limit?: number
    user_id?: string
    action?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })
    
    return this.request(`/activity-logs?${searchParams.toString()}`)
  }

  async createActivityLog(logData: any) {
    return this.request('/activity-logs', {
      method: 'POST',
      body: JSON.stringify(logData),
    })
  }
}

export const apiClient = new ApiClient()
export default ApiClient

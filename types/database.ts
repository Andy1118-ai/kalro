export interface User {
  id: number
  email: string
  password?: string
  name: string
  role: 'admin' | 'researcher' | 'user'
  department?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parent_id?: number
  color: string
  icon?: string
  created_at: string
  updated_at: string
  subcategories?: Category[]
}

export interface Document {
  id: number
  title: string
  description?: string
  file_path?: string
  file_type?: string
  file_size?: number
  category_id?: number
  author_id?: number
  status: 'draft' | 'published' | 'archived'
  tags?: string[]
  metadata?: Record<string, any>
  download_count: number
  view_count: number
  created_at: string
  updated_at: string
  author?: string
  category?: Category
}

export interface Bookmark {
  id: number
  user_id: number
  document_id: number
  created_at: string
  document?: Document
}

export interface ActivityLog {
  id: number
  user_id?: number
  action: string
  resource_type?: string
  resource_id?: number
  details?: Record<string, any>
  ip_address?: string
  created_at: string
  user?: User
}

export interface Analytics {
  id: number
  date: string
  metric_type: string
  metric_value: number
  category_id?: number
  document_id?: number
  created_at: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

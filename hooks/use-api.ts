"use client"
import { useState, useEffect, useCallback, useRef } from 'react'
import { apiClient } from '@/lib/api-client'
import { DocumentsParams } from '@/types/api'

export type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApi<T>(
  apiCall: () => Promise<any>,
  dependencies: any[] = []
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      if (isMountedRef.current) {
        // Many API routes return { success, data, ... }
        setData((response && response.data) ?? response)
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [apiCall])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, loading, error, refetch: fetchData }
}

export function useCategories() {
  return useApi(() => apiClient.getCategories())
}

export function useDocuments<T = any>(params: DocumentsParams = {}): ApiResponse<T> {
  return useApi<T>(() => apiClient.getDocuments(params), [JSON.stringify(params)])
}

export function useDocument<T = any>(id: number): ApiResponse<T> {
  return useApi<T>(() => apiClient.getDocument(id), [id])
}

export function useAnalytics(params: any = {}) {
  return useApi(() => apiClient.getAnalytics(params), [JSON.stringify(params)])
}

export function useActivityLogs(params: any = {}) {
  return useApi(() => apiClient.getActivityLogs(params), [JSON.stringify(params)])
}

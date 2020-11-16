// hooks
import { useState, useCallback } from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const clearError = useCallback(() => setError(null), [])

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)

      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(url, { method, body, headers })
        const data = await response.json()

        if (!response.ok) {
          let message = ''
          if (data.errors) message = data.errors[0].msg
          else message = data.message || 'Что-то пошло не так'
          
          throw new Error(message)
        }

        setLoading(false)

        return data
      } catch (e) {
        setLoading(false)
        setError(e.message)

        throw e
      }
    },
    []
  )

  return { loading, request, error, clearError }
}

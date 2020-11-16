// hooks
import { useState, useCallback, useEffect } from 'react'
import { useHttp } from './useHttp.Hook'

const storageName = 'auth'

export const useAuth = () => {
  const { request } = useHttp()
  const [token, setToken] = useState(null)
  const isAuthenticated = !!token

  const login = useCallback((jwt) => {
    setToken(jwt)

    localStorage.setItem(storageName, JSON.stringify({ token: jwt }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      ;(async () => {
        const response = await request(
          '/api/auth/validate',
          'GET',
          null,
          {
            'auth-token': data.token,
          }
        )

        if (response.auth) {
          login(data.token)
        }
      })()
    }
  }, [login])

  return { login, logout, token, isAuthenticated }
}

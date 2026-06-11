import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  id:    number
  role:  string
  token: string
}

type AuthContextType = {
  user:    User | null
  loading: boolean
  saveUser:   (user: User) => Promise<void>
  removeUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem('user')
        if (stored) setUser(JSON.parse(stored))
      } catch {}
      finally { setLoading(false) }
    }
    load()
  }, [])

  const saveUser = async (u: User) => {
    setUser(u)
    await AsyncStorage.setItem('user',  JSON.stringify(u))
    await AsyncStorage.setItem('token', u.token)
  }

  const removeUser = async () => {
    setUser(null)
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, loading, saveUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
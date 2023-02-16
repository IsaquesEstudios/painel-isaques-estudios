import { ApiCliente } from "@/util/axios"
import Router from "next/router"
import { setCookie } from 'nookies'

import { createContext, ReactNode, useEffect, useState } from "react"


type SignInCredentials = {
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode;
}

type DataUser = {
  name: string
  email: string
  permission: string[]
  payments: string[]
  pending_payments: string[]
  calls: string[]
  created_at: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<any>
  signUp(credentials: SignInCredentials): Promise<void>
  data: DataUser
  isAuthenticated: boolean
}

const LinkDevelopment = 'http://localhost:3333'

export const authContext = createContext({} as AuthContextData)


export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<any>()
  const isAuthenticated = !!data


  useEffect(() => {
    ApiCliente().get('/user/profile').then((response: any) => {
      setData(response?.data)
    })
  }, [])


  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await ApiCliente().post('/login', {
        email,
        password
      })

      const { token, refresh_token, user_data } = response.data

      setData(user_data)

      setCookie(undefined, 'isaquesestudios.token', token, {
        maxAge: 60 * 60 * 24
      })

      setCookie(undefined, 'isaquesestudios.refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 7
      })

      ApiCliente().defaults.headers.common['Authorization'] = `Bearer ${token}`

      Router.push('/usuario')
    } catch (error) {
      console.log(error)
    }
  }

  async function signUp() { }


  return (
    <authContext.Provider value={{ signIn, signUp, data, isAuthenticated }}>
      {children}
    </authContext.Provider>
  )
}
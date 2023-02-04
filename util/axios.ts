import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

type ErrorResponse = {
  code: string,
  error: boolean
}

export function ApiCliente(ctx = undefined) {
  let cookies = parseCookies(ctx)
  let isRefreshing = false
  let failedRequestQueue: any = [];


  const production = 'http://localhost:3333'

  const api = axios.create({
    baseURL: production,
    headers: {
      Authorization: `Bearer ${cookies['isaquesestudios.token']}`
    }
  })

  api.interceptors.response.use((response) => {
    return response
  }, (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      if (error.response.data.code === 'token.invalid') {
        cookies = parseCookies()

        const { 'isaquesestudios.refresh_token': refresh_token } = cookies
        const originalConfig: any = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api.post('/refresh', { refresh_token }).then(response => {
            const { token } = response.data

            setCookie(undefined, 'isaquesestudios.token', token, {
              maxAge: 60 * 60 * 24
            })

            setCookie(undefined, 'isaquesestudios.refresh_token', response?.data.refresh_token, {
              maxAge: 60 * 60 * 24 * 7
            })


            ApiCliente().defaults.headers.common['Authorization'] = `Bearer ${token}`

            failedRequestQueue.forEach((request: any) => request.onSuccess(token))
            failedRequestQueue = []
          }).catch(err => {
            failedRequestQueue.forEach((request: any) => request.onFailure(err))
            failedRequestQueue = []
          })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            }
          })
        })
      } else {

      }
    }
  })


  return api
}
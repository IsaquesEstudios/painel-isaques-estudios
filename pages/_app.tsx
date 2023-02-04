import Header from '@/component/header'
import { AuthProvider } from '@/context/AuthContext'
import { theme } from '@/styles/theme'
import { ChakraProvider, Flex } from '@chakra-ui/react'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()



  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Flex>
            {router.asPath != '/' && <Header />}
            <Component {...pageProps} />
          </Flex>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

import Header from '@/component/header'
import Sidebar from '@/component/sidebar'
import { AuthProvider } from '@/context/AuthContext'
import { theme } from '@/styles/theme'
import { Box, ChakraProvider, Grid } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'

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
          <Grid
            gridTemplateColumns='300px 1fr'
            gridTemplateRows='50px 1fr'
            templateAreas={`
            "header header"
            "sidebar content"
            `}>
            {router.asPath != '/' && <Sidebar />}
            {router.asPath != '/' && <Header />}
            <Box as='main' gridArea='content'>
              <Component {...pageProps} />
            </Box>
          </Grid>
        </AuthProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

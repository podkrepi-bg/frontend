import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'common/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

export const Providers = ({ children }: { children: React.ReactElement }) => {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider
        session={{
          user: {
            name: 'user',
            email: 'email',
          },
          expires: 'ttt',
        }}>
        <QueryClientProvider
          client={
            new QueryClient({
              defaultOptions: {
                mutations: {
                  retry: 0,
                },
                queries: {
                  retry: 0,
                },
              },
            })
          }>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }

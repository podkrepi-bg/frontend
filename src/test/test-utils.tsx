import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'common/theme'

const Providers = ({ children }: { children: React.ReactElement }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }

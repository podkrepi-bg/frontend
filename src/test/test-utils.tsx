import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import '@testing-library/jest-dom'
import theme from 'common/theme'

const Providers = ({ children }: { children: React.ReactElement }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: Providers, ...options })

jest.mock('next-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (translation: string) => translation,
      i18n: {
        language: 'en',
        changeLanguage: () => jest.fn(),
      },
    }
  },
}))

export * from '@testing-library/react'

export { customRender as render }

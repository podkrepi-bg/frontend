import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'

import theme from 'common/theme'

const Providers = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
const customRender = (ui: any, options = {}) => render(ui, { wrapper: Providers, ...options })

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

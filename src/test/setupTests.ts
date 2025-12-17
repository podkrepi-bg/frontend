// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Set environment variable for API_URL used in apiClient
process.env.NEXT_PUBLIC_API_URL = 'http://localhost/api'

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

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: { API_URL: 'http://localhost/api', APP_URL: 'http://localhost' },
}))

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Set environment variables used by the app
process.env.NEXT_PUBLIC_API_URL = 'http://localhost/api'
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost'

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

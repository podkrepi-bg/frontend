export type AdditionalQuestionsRenderHelper = [
  {
    key: string
    title: string
    errorMessage: string
    formikErrors: any
    options: Array<{
      type: string
      value: any
      name: string
      label?: string
      placeholder?: string
      textFieldOptions?: {
        value: string
        name: string
        placeholder: string
      }
      dropdownOptions?: Array<{
        text: string
        value: string
      }>
    }>
  },
]

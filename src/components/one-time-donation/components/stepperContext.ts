import { createContext } from 'react'

export const StepsContext = createContext<{
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}>({
  step: 0,
  setStep: (step) => {
    return step
  },
})

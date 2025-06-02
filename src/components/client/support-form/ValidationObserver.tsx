import { useFormikContext } from 'formik'
import { useEffect, useRef } from 'react'
import { Steps } from './helpers/support-form.types'

const STEPS_VALIDATION_MAP = {
  [Steps.ROLES]: ['roles'],
  [Steps.QUESTIONS]: ['benefactor', 'partner', 'volunteer', 'associationMember', 'company'],
  [Steps.PERSON]: ['person'],
}

const ValidationObserver = ({
  setCurrentValidatedField,
  activeStep,
}: {
  setCurrentValidatedField: React.Dispatch<React.SetStateAction<number | null>>
  activeStep: number
}) => {
  const activeStepRef = useRef(0)
  const { errors, submitCount } = useFormikContext()

  useEffect(() => {
    if (activeStepRef.current !== activeStep) {
      activeStepRef.current = activeStep
      setCurrentValidatedField(null)
    }

    const value = Object.entries(STEPS_VALIDATION_MAP).find(([, value]) => {
      return value.includes(Object.keys(errors)?.[0])
    })

    if (submitCount > 0 && value) {
      setCurrentValidatedField(Number(value?.[0]))
    }
  }, [errors, submitCount, activeStep])

  return null
}

export default ValidationObserver

import React, { useState, createContext } from 'react'
import { useTranslation } from 'react-i18next'

import type { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import { UUID } from 'gql/types'
import { BeneficiaryType } from '../components/admin/beneficiary/BeneficiaryTypes'
import { CampaignFile } from 'gql/campaigns'

// TODO: Extract the different types
type CampaignDataType = {
  info: {
    name: string
    category: CampaignTypeCategory | ''
    beneficiary: {
      id: UUID
      type: BeneficiaryType
      name: string
    }
    targetAmount: number
    // endDate?: Date
    endDate?: 'one-time' | 'each-month' | 'specific-date' //temporary
  }
  organizer: {
    person: {
      id: UUID
      firstName: string
      middleName: string
      lastName: string
      pin: string
      phoneNumber: string
    }
    company: {
      id: UUID
      name: string
      address: string
      bulstatUIC: string
      phoneNumber: string
      representative: {
        firstName: string
        middleName: string
        lastName: string
      }
    }
  }
  about: {
    organizer: string
    campaign: string
    completed: string
    personalStories: string
    guarantor?: {
      name: string
      profession: string
      avatar?: string // not sure
      info: string
    }
    webpage: string
    links: string
    facebook: string
  }
  documents: {
    video: string //not sure
    pictures: string //not sure
    files: CampaignFile[]
  }
}

type Props = {
  children: React.ReactNode
}

type Label = { title: string }

type StepsCampaignContext = {
  activeStep: number
  steps: Label[]
  nextPage?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  prevPage?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  campaignData: CampaignDataType
  isStepOptional?: (step: number) => boolean
  isStepSkipped?: (step: number) => boolean
  handleChange?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  setCampaignInfo?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  setOrganizer?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  setAboutCampaign?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  setDocuments?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const CampaignContext = createContext<StepsCampaignContext>({} as StepsCampaignContext)

export const CampaignProvider = (props: Props) => {
  const { t } = useTranslation()
  const [campaignData, setCampaignData] = useState({
    info: {
      name: '',
      category: 'all',
      beneficiary: {
        id: '',
        type: '',
        name: '',
      },
      targetAmount: 0,
      endDate: new Date(),
    },
    organizer: {
      person: {
        id: '',
        firstName: '',
        middleName: '',
        lastName: '',
        pin: '',
        phoneNumber: '',
      },
      campany: {
        id: '',
        name: '',
        address: '',
        bulstatUIC: '',
        phoneNumber: '',
        representative: {
          firstName: '',
          middleName: '',
          lastName: '',
        },
      },
    },
    about: {
      organizer: '',
      campaign: '',
      completed: '',
      personalStories: '',
      guarantor: {
        name: '',
        profession: '',
        avatar: '',
        info: '',
      },
      webpage: '',
      links: '',
      facebook: '',
    },
    documents: {
      video: '',
      pictures: '',
      files: '',
    },
  })

  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set<number>())

  const steps = [
    { title: t('campaigns:steps.step1-type') },
    { title: t('campaigns:steps.step2-type') },
    { title: t('campaigns:steps.step3-type') },
    { title: t('campaigns:steps.step4-type') },
    { title: t('campaigns:steps.step5-type') },
  ]

  /**
   *  Optional Steps / Skip
   **/
  const optionalSteps: number[] = []

  const isStepOptional = (step: number) => {
    return optionalSteps.includes(step)
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)

    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  /**
   *  Prev / Next Actions
   **/
  const nextPage = () => {
    let newSkipped = skipped

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)

    console.log('next page: ', campaignData.info)
  }

  const prevPage = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  /**
   * Campaign Data Actions
   **/
  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignData({ ...campaignData, [prop]: event.target.value })
  }

  const setCampaignInfo = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignData({
      ...campaignData,
      info: { ...campaignData.info, [prop]: event.target.value },
    })
  }
  const setOrganizer = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignData({
      ...campaignData,
      organizer: { ...campaignData.organizer, [prop]: event.target.value },
    })
  }
  const setAboutCampaign = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignData({
      ...campaignData,
      about: { ...campaignData.about, [prop]: event.target.value },
    })
  }
  const setDocuments = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignData({
      ...campaignData,
      documents: { ...campaignData.documents, [prop]: event.target.value },
    })
  }

  return (
    <CampaignContext.Provider
      value={{
        activeStep,
        steps,
        nextPage,
        prevPage,
        isStepOptional,
        isStepSkipped,
        handleSkip,
        campaignData,
        handleChange,
        setCampaignInfo,
        setOrganizer,
        setAboutCampaign,
        setDocuments,
      }}>
      {props.children}
    </CampaignContext.Provider>
  )
}

import React from 'react'
import { FormikHelpers } from 'formik'

import {
  Steps,
  CampaignFormData,
  CampaignDateTypes,
  CoordinatorBeneficiaryRealation,
  CoordinatorTypes,
} from './helpers/campaign-form.types'

interface Props {
  initialValues: CampaignFormData
  values: CampaignFormData
  actions: FormikHelpers<CampaignFormData>
  activeStep: Steps
  setActiveStep: (value: React.SetStateAction<Steps>) => void
  setFailedStep: (value: React.SetStateAction<Steps>) => void
}

export default async function stepsHandler({
  initialValues,
  values,
  actions,
  activeStep,
  setActiveStep,
  setFailedStep,
}: Props) {
  switch (activeStep) {
    case Steps.COORDINATORTYPE:
      {
        console.log('1step', values)

        const errors = await actions.validateForm(values.coordinator)
        if (errors.coordinator) {
          setFailedStep(Steps.COORDINATORTYPE)
          return
        }

        if (values.coordinator === CoordinatorTypes.Person) {
          values.coordinatorCompany = Object.assign(
            values.coordinatorCompany,
            initialValues.coordinatorCompany,
          )
          values.beneficiaryCompany = Object.assign(
            values.beneficiaryCompany,
            initialValues.coordinatorCompany,
          )
        }

        if (values.coordinator === CoordinatorTypes.Company) {
          values.coordinatorPerson = Object.assign(
            values.coordinatorPerson,
            initialValues.coordinatorPerson,
          )
          values.beneficiaryPerson = Object.assign(
            values.beneficiaryPerson,
            initialValues.beneficiaryPerson,
          )
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setFailedStep(Steps.NONE)
      }
      break
    case Steps.COORDINATOR:
      {
        console.log('2step', values)

        if (values.coordinator === CoordinatorTypes.Person) {
          const errors = await actions.validateForm(values.coordinatorPerson)
          // console.log('person', errors.coordinatorPerson)
          if (errors.coordinatorPerson) {
            setFailedStep(Steps.COORDINATOR)
            return
          }
        }
        if (values.coordinator === CoordinatorTypes.Company) {
          const errors = await actions.validateForm(values.coordinatorCompany)
          // console.log('company', errors.coordinatorCompany)
          if (errors.coordinatorCompany) {
            setFailedStep(Steps.COORDINATOR)
            return
          }
        }
        const errors = await actions.validateForm(values.coordinatorBeneficiaryRelation)
        // console.log('relation', errors.coordinatorBeneficiaryRelation)

        if (errors.coordinatorBeneficiaryRelation) {
          setFailedStep(Steps.COORDINATOR)
          return
        }

        if (
          values.coordinatorBeneficiaryRelation === CoordinatorBeneficiaryRealation.Related &&
          values.coordinator === CoordinatorTypes.Person
        ) {
          values.beneficiaryPerson = Object.assign(
            values.beneficiaryPerson,
            values.coordinatorPerson,
          )
        }

        if (
          values.coordinatorBeneficiaryRelation === CoordinatorBeneficiaryRealation.NotRelated &&
          values.coordinator === CoordinatorTypes.Person
        ) {
          values.beneficiaryPerson = Object.assign(
            values.beneficiaryPerson,
            initialValues.beneficiaryPerson,
          )
        }

        if (
          values.coordinatorBeneficiaryRelation === CoordinatorBeneficiaryRealation.Related &&
          values.coordinator === CoordinatorTypes.Company
        ) {
          values.beneficiaryCompany = Object.assign(
            values.beneficiaryCompany,
            values.coordinatorCompany,
          )
        }

        if (
          values.coordinatorBeneficiaryRelation === CoordinatorBeneficiaryRealation.NotRelated &&
          values.coordinator === CoordinatorTypes.Company
        ) {
          values.beneficiaryCompany = Object.assign(
            values.beneficiaryCompany,
            initialValues.coordinatorCompany,
          )
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setFailedStep(Steps.NONE)
      }
      break
    case Steps.INFO:
      {
        console.log('3step', values)

        if (values.coordinatorBeneficiaryRelation === CoordinatorBeneficiaryRealation.NotRelated) {
          const errors = await actions.validateForm(values.beneficiaryName)
          // console.log('benefName', errors.beneficiaryName)
          if (errors.beneficiaryName) {
            setFailedStep(Steps.INFO)
            return
          }
        }

        const errors = await actions.validateForm(values.campaignInfo)
        // console.log('info', errors.campaignInfo)
        if (errors.campaignInfo) {
          setFailedStep(Steps.INFO)
          return
        }

        if (values.campaignInfo.campaignTypeId !== 'else') {
          values.campaignInfo.campaignTypeName = initialValues.campaignInfo.campaignTypeName
        }

        if (values.campaignInfo.campaignDate !== CampaignDateTypes.SelectDate) {
          values.campaignInfo.endDate = initialValues.campaignInfo.endDate
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setFailedStep(Steps.NONE)
      }
      break
    case Steps.DETAILS:
      {
        console.log('4step', values)

        const errors = await actions.validateForm(values.campaignDetails)
        // console.log('details', errors.campaignDetails)
        if (errors.campaignDetails) {
          setFailedStep(Steps.DETAILS)
          return
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setFailedStep(Steps.NONE)
      }
      break
    default:
      return 'Unknown step'
  }
}

import React from 'react'
import { useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import { FormControl, FormGroup, FormHelperText, FormLabel, Grid, Typography } from '@mui/material'

import { Option, RoleRenderObject, SupportFormData } from '../helpers/support-form.types'
import CheckboxField from 'components/common/form/CheckboxField'
import FormTextField from 'components/common/form/FormTextField'

type QuestionProps = {
  question?: RoleRenderObject
}
const Question = ({ question }: QuestionProps) => {
  const { t } = useTranslation()
  const formik = useFormikContext<SupportFormData>()
  if (!question) {
    return null
  }
  return (
    <FormControl fullWidth required error={Boolean(formik.errors.roles)} component="fieldset">
      <FormGroup>
        <FormLabel component="legend">{t(question.title)}</FormLabel>
        {question.options.map((option: Option, index) => (
          <React.Fragment key={index}>
            <CheckboxField label={option.label} name={option.name} />
            {option.textFieldOptions && option.value ? (
              <FormTextField
                type="text"
                name={option.textFieldOptions.name}
                label={option.textFieldOptions.placeholder}
                placeholder={t(option.textFieldOptions.placeholder)}
              />
            ) : null}
          </React.Fragment>
        ))}
      </FormGroup>
      {Boolean(formik.errors[question.key]) && (
        <FormHelperText error>{t(question.errorMessage)}</FormHelperText>
      )}
    </FormControl>
  )
}

export default function AdditionalQuestions() {
  const formik = useFormikContext<SupportFormData>()
  const { t } = useTranslation()
  const questionsList: Array<RoleRenderObject> = [
    {
      key: 'benefactor',
      title: 'support:steps.addition-questions.benefactor.title',
      errorMessage: 'validation:select-role',
      options: [
        {
          type: 'checkbox',
          value: formik.values.benefactor?.campaignBenefactor,
          name: 'benefactor.campaignBenefactor',
          label: 'support:steps.addition-questions.benefactor.campaignBenefactor',
        },
        {
          type: 'checkbox',
          value: formik.values.benefactor?.platformBenefactor,
          name: 'benefactor.platformBenefactor',
          label: 'support:steps.addition-questions.benefactor.platformBenefactor',
        },
      ],
    },
    {
      key: 'associationMember',
      title: 'support:steps.addition-questions.associationMember.title',
      errorMessage: 'validation:select-role',
      options: [
        {
          type: 'checkbox',
          value: formik.values.associationMember?.isMember,
          name: 'associationMember.isMember',
          label: 'support:steps.addition-questions.associationMember.member',
        },
      ],
    },
    {
      key: 'partner',
      title: 'support:steps.addition-questions.partner.title',
      errorMessage: 'validation:select-role',
      options: [
        {
          type: 'checkbox',
          value: formik.values.partner?.npo,
          name: 'partner.npo',
          label: 'support:steps.addition-questions.partner.npo',
        },
        {
          type: 'checkbox',
          value: formik.values.partner?.bussiness,
          name: 'partner.bussiness',
          label: 'support:steps.addition-questions.partner.bussiness',
        },
        {
          type: 'checkbox',
          value: formik.values.partner?.other,
          name: 'partner.other',
          label: 'support:steps.addition-questions.partner.other',
          textFieldOptions: {
            value: formik.values.partner?.otherText || '',
            name: 'partner.otherText',
            placeholder: 'support:steps.addition-questions.partner.otherText',
          },
        },
      ],
    },
    {
      key: 'volunteer',
      title: 'support:steps.addition-questions.volunteer.title',
      errorMessage: 'validation:select-role',
      options: [
        {
          type: 'checkbox',
          value: formik.values.volunteer?.projectManager,
          name: 'volunteer.projectManager',
          label: 'support:steps.addition-questions.volunteer.projectManager',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.backend,
          name: 'volunteer.backend',
          label: 'support:steps.addition-questions.volunteer.backend',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.frontend,
          name: 'volunteer.frontend',
          label: 'support:steps.addition-questions.volunteer.frontend',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.designer,
          name: 'volunteer.designer',
          label: 'support:steps.addition-questions.volunteer.designer',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.devOps,
          name: 'volunteer.devOps',
          label: 'support:steps.addition-questions.volunteer.devOps',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.security,
          name: 'volunteer.security',
          label: 'support:steps.addition-questions.volunteer.security',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.financesAndAccounts,
          name: 'volunteer.financesAndAccounts',
          label: 'support:steps.addition-questions.volunteer.financesAndAccounts',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.lawyer,
          name: 'volunteer.lawyer',
          label: 'support:steps.addition-questions.volunteer.lawyer',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.qa,
          name: 'volunteer.qa',
          label: 'support:steps.addition-questions.volunteer.qa',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.marketing,
          name: 'volunteer.marketing',
          label: 'support:steps.addition-questions.volunteer.marketing',
        },
      ],
    },
    {
      key: 'company',
      title: 'support:steps.addition-questions.company.title',
      errorMessage: 'validation:select-role',
      options: [
        {
          type: 'checkbox',
          value: formik.values.company?.sponsor,
          name: 'company.sponsor',
          label: 'support:steps.addition-questions.company.sponsor',
        },
        {
          type: 'checkbox',
          value: formik.values.company?.volunteer,
          name: 'company.volunteer',
          label: 'support:steps.addition-questions.company.volunteer',
        },
        {
          type: 'checkbox',
          value: formik.values.company?.other,
          name: 'company.other',
          label: 'support:steps.addition-questions.company.other',
          textFieldOptions: {
            value: formik.values.company?.otherText || '',
            name: 'company.otherText',
            placeholder: 'support:steps.addition-questions.company.otherText',
          },
        },
      ],
    },
  ]

  return (
    <Grid container spacing={6} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          {t('support:steps.addition-questions.subtitle')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={10}>
        <Grid container spacing={6} justifyContent="center">
          {Object.entries(formik.values.roles)
            .filter(([, value]) => value)
            .map(([key], index) => (
              <Grid key={index} item xs={12} sm={10}>
                <Question question={questionsList.find((obj) => obj.key == key)} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

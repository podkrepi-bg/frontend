import React from 'react'
import { useTranslation } from 'next-i18next'
import { FormikProps } from 'formik'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'

import { Option, RoleRenderObject, Steps, SupportFormData } from '../helpers/support-form.models'

type AdditionalQuestionsProps = {
  formik: FormikProps<SupportFormData>
  failedStep: Steps
}

export default function AdditionalQuestions({ formik, failedStep }: AdditionalQuestionsProps) {
  const { t } = useTranslation()
  const RenderHelper: Array<RoleRenderObject> = [
    {
      key: 'benefactor',
      title: 'common:support-form.steps.addition-questions.benefactor.title',
      errorMessage: 'common:support-form.helperText',
      options: [
        {
          type: 'checkbox',
          value: formik.values.benefactor?.campaignBenefactor,
          name: 'benefactor.campaignBenefactor',
          label: 'common:support-form.steps.addition-questions.benefactor.campaignBenefactor',
        },
        {
          type: 'checkbox',
          value: formik.values.benefactor?.platformBenefactor,
          name: 'benefactor.platformBenefactor',
          label: 'common:support-form.steps.addition-questions.benefactor.platformBenefactor',
        },
      ],
    },
    {
      key: 'associationMember',
      title: 'common:support-form.steps.addition-questions.associationMember.title',
      errorMessage: 'common:support-form.helperText',
      options: [
        {
          type: 'checkbox',
          value: formik.values.associationMember?.isMember,
          name: 'associationMember.isMember',
          label: 'common:support-form.steps.addition-questions.associationMember.member',
        },
      ],
    },
    {
      key: 'partner',
      title: 'common:support-form.steps.addition-questions.partner.title',
      errorMessage: 'common:support-form.helperText',
      options: [
        {
          type: 'checkbox',
          value: formik.values.partner?.npo,
          name: 'partner.npo',
          label: 'common:support-form.steps.addition-questions.partner.npo',
        },
        {
          type: 'checkbox',
          value: formik.values.partner?.bussiness,
          name: 'partner.bussiness',
          label: 'common:support-form.steps.addition-questions.partner.bussiness',
        },
        {
          type: 'checkbox',
          value: formik.values.partner?.other,
          name: 'partner.other',
          label: 'common:support-form.steps.addition-questions.partner.other',
          textFieldOptions: {
            value: formik.values.partner?.otherText || '',
            name: 'partner.otherText',
            placeholder: 'common:support-form.steps.addition-questions.partner.otherText',
          },
        },
      ],
    },
    {
      key: 'volunteer',
      title: 'common:support-form.steps.addition-questions.volunteer.title',
      errorMessage: 'common:support-form.helperText',
      options: [
        {
          type: 'checkbox',
          value: formik.values.volunteer?.backend,
          name: 'volunteer.backend',
          label: 'common:support-form.steps.addition-questions.volunteer.backend',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.frontend,
          name: 'volunteer.frontend',
          label: 'common:support-form.steps.addition-questions.volunteer.frontend',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.qa,
          name: 'volunteer.qa',
          label: 'common:support-form.steps.addition-questions.volunteer.qa',
        },
        {
          type: 'checkbox',
          value: formik.values.volunteer?.marketing,
          name: 'volunteer.marketing',
          label: 'common:support-form.steps.addition-questions.volunteer.marketing',
        },
      ],
    },
    {
      key: 'promoter',
      title: 'common:support-form.steps.addition-questions.promoter.title',
      errorMessage: 'common:support-form.helperText',
      options: [
        {
          type: 'checkbox',
          value: formik.values.promoter?.mediaPartner,
          name: 'promoter.mediaPartner',
          label: 'common:support-form.steps.addition-questions.promoter.mediaPartner',
        },
        {
          type: 'checkbox',
          value: formik.values.promoter?.ambassador,
          name: 'promoter.ambassador',
          label: 'common:support-form.steps.addition-questions.promoter.ambassador',
        },
        {
          type: 'checkbox',
          value: formik.values.promoter?.other,
          name: 'promoter.other',
          label: 'common:support-form.steps.addition-questions.promoter.other',
          textFieldOptions: {
            value: formik.values.promoter?.otherText || '',
            name: 'promoter.otherText',
            placeholder: 'common:support-form.steps.addition-questions.promoter.otherText',
          },
        },
      ],
    },
  ]
  const renderQuestion = (key: string) => {
    const renderObject = RenderHelper.find((obj) => obj.key == key)
    if (!renderObject) {
      return null
    }
    return (
      <FormControl fullWidth required error={Boolean(formik.errors.roles)} component="fieldset">
        <FormGroup>
          <FormLabel component="legend">{t(renderObject.title)}</FormLabel>
          {renderObject.options.map((option: Option, index) => (
            <React.Fragment key={index}>
              <FormControlLabel
                label={t(option.label)}
                control={
                  <Checkbox
                    checked={Boolean(option.value)}
                    onChange={formik.handleChange}
                    name={option.name}
                    color="primary"
                  />
                }
              />
              {option.textFieldOptions && option.value ? (
                <TextField
                  size="small"
                  variant="outlined"
                  value={option.textFieldOptions.value}
                  name={option.textFieldOptions.name}
                  placeholder={t(option.textFieldOptions.placeholder)}
                  onChange={formik.handleChange}
                />
              ) : null}
            </React.Fragment>
          ))}
        </FormGroup>
        {Boolean(formik.errors[renderObject.key]) && failedStep === Steps.QUESTIONS && (
          <FormHelperText error>{t(renderObject.errorMessage)}</FormHelperText>
        )}
      </FormControl>
    )
  }
  return (
    <Grid container spacing={6} justify="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          {t('common:support-form.steps.addition-questions.subtitle')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={10}>
        <Grid container spacing={6} justify="center">
          {Object.entries(formik.values.roles)
            .filter(([, value]) => value)
            .map(([key], index) => (
              <Grid key={index} item xs={12} sm={10}>
                {renderQuestion(key)}
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

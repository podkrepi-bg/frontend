import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { RoleRenderObject } from '../helpers/support-form.models'
import { SupportFormData } from '../helpers/support-form.models'
import { Steps } from '../helpers/support-form.models'

export default function AdditionalQuestions({
  formik,
  failedStep,
}: {
  formik: FormikProps<SupportFormData>
  failedStep: Steps
}) {
  const { t } = useTranslation()
  const RenderHelper: Array<RoleRenderObject> = [
    {
      key: 'benefactor',
      title: t('common:support-form.steps.addition-questions.benefactor.title'),
      errorMessage: t('common:support-form.helperText'),
      formikErrors: formik.errors.benefactor,
      options: [
        {
          type: 'checkbox',
          value: formik.values.benefactor.campaignBenefactor,
          name: 'benefactor.campaignBenefactor',
          label: t('common:support-form.steps.addition-questions.benefactor.campaignBenefactor'),
        },
        {
          type: 'checkbox',
          value: formik.values.benefactor.platformBenefactor,
          name: 'benefactor.platformBenefactor',
          label: t('common:support-form.steps.addition-questions.benefactor.platformBenefactor'),
        },
      ],
    },
    {
      key: 'associationMember',
      title: t('common:support-form.steps.addition-questions.associationMember.title'),
      errorMessage: t('common:support-form.helperText'),
      formikErrors: formik.errors.associationMember,
      options: [
        {
          type: 'checkbox',
          value: formik.values.associationMember.isMember,
          name: 'associationMember.isMember',
          label: t('common:support-form.steps.addition-questions.associationMember.member'),
        },
      ],
    },
    {
      key: 'partner',
      title: t('common:support-form.steps.addition-questions.partner.title'),
      errorMessage: t('common:support-form.helperText'),
      formikErrors: formik.errors.partner,
      options: [
        {
          type: 'checkbox',
          value: formik.values.partner.npo,
          name: 'partner.npo',
          label: t('common:support-form.steps.addition-questions.partner.npo'),
        },
        {
          type: 'checkbox',
          value: formik.values.partner.bussiness,
          name: 'partner.bussiness',
          label: t('common:support-form.steps.addition-questions.partner.bussiness'),
        },
        {
          type: 'checkbox',
          value: formik.values.partner.other,
          name: 'partner.other',
          label: t('common:support-form.steps.addition-questions.partner.other'),
          textFieldOptions: {
            value: formik.values.partner.otherText,
            name: 'partner.otherText',
            placeholder: t('common:support-form.steps.addition-questions.partner.otherText'),
          },
        },
      ],
    },
    {
      key: 'volunteer',
      title: t('common:support-form.steps.addition-questions.volunteer.title'),
      errorMessage: t('common:support-form.helperText'),
      formikErrors: formik.errors.volunteer,
      options: [
        {
          type: 'dropdown',
          value: formik.values.volunteer.areas,
          name: 'volunteer.areas',
          label: t('common:support-form.steps.addition-questions.volunteer.label'),
          dropdownOptions: [
            {
              text: t('common:support-form.steps.addition-questions.volunteer.marketing'),
              value: 'marketing',
            },
            {
              text: t('common:support-form.steps.addition-questions.volunteer.backend'),
              value: 'backend',
            },
            {
              text: t('common:support-form.steps.addition-questions.volunteer.frontend'),
              value: 'frontend',
            },
            { text: t('common:support-form.steps.addition-questions.volunteer.qa'), value: 'qa' },
          ],
        },
      ],
    },
    {
      key: 'promoter',
      title: t('common:support-form.steps.addition-questions.promoter.title'),
      errorMessage: t('common:support-form.helperText'),
      formikErrors: formik.errors.promoter,
      options: [
        {
          type: 'checkbox',
          value: formik.values.promoter.mediaPartner,
          name: 'promoter.mediaPartner',
          label: t('common:support-form.steps.addition-questions.promoter.mediaPartner'),
        },
        {
          type: 'checkbox',
          value: formik.values.promoter.ambassador,
          name: 'promoter.ambassador',
          label: t('common:support-form.steps.addition-questions.promoter.ambassador'),
        },
        {
          type: 'checkbox',
          value: formik.values.promoter.other,
          name: 'promoter.other',
          label: t('common:support-form.steps.addition-questions.promoter.other'),
          textFieldOptions: {
            value: formik.values.promoter.otherText,
            name: 'promoter.otherText',
            placeholder: t('common:support-form.steps.addition-questions.promoter.otherText'),
          },
        },
      ],
    },
  ]
  const renderQuestion = (key: string) => {
    const renderObject = RenderHelper.filter((obj) => obj.key == key)[0]
    if (renderObject) {
      return (
        <div style={{ marginBottom: 15 }}>
          <FormGroup>
            <FormControl component="fieldset">
              <FormLabel component="legend">{renderObject.title}</FormLabel>
            </FormControl>
            {(renderObject.options as any[]).map((option: any, index: number) =>
              option.textFieldOptions ? (
                <React.Fragment key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={option.value}
                        onChange={formik.handleChange}
                        name={option.name}
                        color="primary"
                      />
                    }
                    label={option.label}
                  />
                  {option.value ? (
                    <TextField
                      value={option.textFieldOptions.value}
                      name={option.textFieldOptions.name}
                      placeholder={option.textFieldOptions.placeholder}
                      onChange={formik.handleChange}
                    />
                  ) : null}
                </React.Fragment>
              ) : option.type === 'dropdown' ? (
                <Select
                  key={index}
                  onChange={formik.handleChange}
                  name={option.name}
                  value={option.value}
                  multiple={true}>
                  {option.dropdownOptions.map((value: any, index: number) => (
                    <MenuItem key={index} value={value.value}>
                      {value.text}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      key={index}
                      checked={option.value}
                      onChange={formik.handleChange}
                      name={option.name}
                      color="primary"
                    />
                  }
                  label={option.label}
                />
              ),
            )}
          </FormGroup>
          {renderObject.formikErrors ? (
            <FormHelperText error={true}>{renderObject.errorMessage}</FormHelperText>
          ) : (
            ''
          )}
        </div>
      )
    }
    return null
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <FormControl required error={!!formik.errors.roles} component="fieldset">
          <h2>{t('common:support-form.steps.addition-questions.subtitle')}</h2>
          {Object.entries(formik.values.roles)
            .filter(([_, value]) => value)
            .map(([key, _], index) => (
              <div key={index}>{renderQuestion(key)}</div>
            ))}
        </FormControl>
      </Grid>
    </Grid>
  )
}

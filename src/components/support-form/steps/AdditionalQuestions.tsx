import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import {
  Box,
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
  Typography,
} from '@material-ui/core'

import { RoleRenderObject, SupportFormData } from '../helpers/support-form.models'

type AdditionalQuestionsProps = {
  formik: FormikProps<SupportFormData>
}

export default function AdditionalQuestions({ formik }: AdditionalQuestionsProps) {
  const { t } = useTranslation()
  console.log(formik.errors)
  const RenderHelper: Array<RoleRenderObject> = [
    {
      key: 'benefactor',
      title: t('common:support-form.steps.addition-questions.benefactor.title'),
      errorMessage: t('common:support-form.helperText'),
      showError: Boolean(formik.errors.benefactor),
      options: [
        {
          type: 'checkbox',
          value: formik.values.benefactor?.campaignBenefactor,
          name: 'benefactor.campaignBenefactor',
          label: t('common:support-form.steps.addition-questions.benefactor.campaignBenefactor'),
        },
        {
          type: 'checkbox',
          value: formik.values.benefactor?.platformBenefactor,
          name: 'benefactor.platformBenefactor',
          label: t('common:support-form.steps.addition-questions.benefactor.platformBenefactor'),
        },
      ],
    },
    {
      key: 'associationMember',
      title: t('common:support-form.steps.addition-questions.associationMember.title'),
      errorMessage: t('common:support-form.helperText'),
      showError: Boolean(formik.errors.associationMember),
      options: [
        {
          type: 'checkbox',
          value: formik.values.associationMember?.isMember,
          name: 'associationMember.isMember',
          label: t('common:support-form.steps.addition-questions.associationMember.member'),
        },
      ],
    },
    {
      key: 'partner',
      title: t('common:support-form.steps.addition-questions.partner.title'),
      errorMessage: t('common:support-form.helperText'),
      showError: Boolean(formik.errors.partner),
      options: [
        {
          type: 'checkbox',
          value: formik.values.partner?.npo,
          name: 'partner.npo',
          label: t('common:support-form.steps.addition-questions.partner.npo'),
        },
        {
          type: 'checkbox',
          value: formik.values.partner?.bussiness,
          name: 'partner.bussiness',
          label: t('common:support-form.steps.addition-questions.partner.bussiness'),
        },
        {
          type: 'checkbox',
          value: formik.values.partner?.other,
          name: 'partner.other',
          label: t('common:support-form.steps.addition-questions.partner.other'),
          textFieldOptions: {
            value: formik.values.partner?.otherText || '',
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
      showError: Boolean(formik.errors.volunteer),
      options: [
        {
          type: 'dropdown',
          value: formik.values.volunteer?.areas,
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
      showError: Boolean(formik.errors.promoter),
      options: [
        {
          type: 'checkbox',
          value: formik.values.promoter?.mediaPartner,
          name: 'promoter.mediaPartner',
          label: t('common:support-form.steps.addition-questions.promoter.mediaPartner'),
        },
        {
          type: 'checkbox',
          value: formik.values.promoter?.ambassador,
          name: 'promoter.ambassador',
          label: t('common:support-form.steps.addition-questions.promoter.ambassador'),
        },
        {
          type: 'checkbox',
          value: formik.values.promoter?.other,
          name: 'promoter.other',
          label: t('common:support-form.steps.addition-questions.promoter.other'),
          textFieldOptions: {
            value: formik.values.promoter?.otherText || '',
            name: 'promoter.otherText',
            placeholder: t('common:support-form.steps.addition-questions.promoter.otherText'),
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
          <FormLabel component="legend">{renderObject.title}</FormLabel>
          {renderObject.options.map((option, index) =>
            option.textFieldOptions ? (
              <React.Fragment key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(option.value)}
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
              <Box mt={1} key={index}>
                <Select
                  multiple
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  name={option.name}
                  value={option.value}>
                  {option.dropdownOptions?.map((value, index) => (
                    <MenuItem key={index} value={value.value}>
                      {value.text}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            ) : (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    key={index}
                    checked={Boolean(option.value)}
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
        {renderObject.showError && (
          <FormHelperText error={true}>{renderObject.errorMessage}</FormHelperText>
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
            .filter(([_, value]) => value)
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

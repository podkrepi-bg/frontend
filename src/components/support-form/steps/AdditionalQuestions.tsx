import React from 'react'
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
import { AdditionalQuestionsRenderHelper } from '../types/AdditionalQuestionsRenderHelper'
import { SupportFormData } from '../types/SuportFormData'

export default function AdditionalQuestions({
  formik,
  failedStep,
}: {
  formik: FormikProps<SupportFormData>
  failedStep: number
}) {
  const RenderHelper = [
    {
      key: 'benefactor',
      title: 'Дарител',
      errorMessage: 'Изберете поне една роля',
      formikErrors: formik.errors.benefactor,
      options: [
        {
          type: 'checkbox',
          value: formik.values.benefactor.campaignBenefactor,
          name: 'benefactor.campaignBenefactor',
          label: 'Дарител за кампании',
        },
        {
          type: 'checkbox',
          value: formik.values.benefactor.platformBenefactor,
          name: 'benefactor.platformBenefactor',
          label: 'Дарител за платформата',
        },
      ],
    },
    {
      key: 'associationMember',
      title: 'Член на сдружението',
      errorMessage: 'Изберете поне една роля',
      formikErrors: formik.errors.associationMember,
      options: [
        {
          type: 'checkbox',
          value: formik.values.associationMember.isMember,
          name: 'associationMember.isMember',
          label: 'Член',
        },
      ],
    },
    {
      key: 'partner',
      title: 'Партньор',
      errorMessage: 'Изберете поне една роля',
      formikErrors: formik.errors.partner,
      options: [
        {
          type: 'checkbox',
          value: formik.values.partner.npo,
          name: 'partner.npo',
          label: 'НПО',
        },
        {
          type: 'checkbox',
          value: formik.values.partner.bussiness,
          name: 'partner.bussiness',
          label: 'Бизнес',
        },
        {
          type: 'checkbox',
          value: formik.values.partner.other,
          name: 'partner.other',
          label: 'Друго',
          textFieldOptions: {
            value: formik.values.partner.otherText,
            name: 'partner.otherText',
            placeholder: 'Моля уточнете',
          },
        },
      ],
    },
    {
      key: 'volunteer',
      title: 'Доброволец',
      errorMessage: 'Изберете поне една сфера',
      formikErrors: formik.errors.volunteer,
      options: [
        {
          type: 'dropdown',
          value: formik.values.volunteer.areas,
          name: 'volunteer.areas',
          label: 'Моля изберете област',
          dropdownOptions: [
            { text: 'Маркетинг', value: 'marketing' },
            { text: 'Backend', value: 'backend' },
            { text: 'Frontend', value: 'frontend' },
            { text: 'QA', value: 'qa' },
          ],
        },
      ],
    },
    {
      key: 'promoter',
      title: 'Промотиране',
      errorMessage: 'Изберете поне една роля',
      formikErrors: formik.errors.promoter,
      options: [
        {
          type: 'checkbox',
          value: formik.values.promoter.mediaPartner,
          name: 'promoter.mediaPartner',
          label: 'Медиен партньор',
        },
        {
          type: 'checkbox',
          value: formik.values.promoter.ambassador,
          name: 'promoter.ambassador',
          label: 'Амбасадор',
        },
        {
          type: 'checkbox',
          value: formik.values.promoter.other,
          name: 'promoter.other',
          label: 'Друго',
          textFieldOptions: {
            value: formik.values.promoter.otherText,
            name: 'promoter.otherText',
            placeholder: 'Моля уточнете',
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
          <FormControl>
            <FormGroup>
              <FormControl component="fieldset">
                <FormLabel component="legend">{renderObject.title}</FormLabel>
              </FormControl>
              {(renderObject.options as any[]).map((option: any, index: number) =>
                option.textFieldOptions ? (
                  <>
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={option.value}
                          onChange={formik.handleChange}
                          name={option.name}
                        />
                      }
                      label={option.label}
                    />
                    {option.value ? (
                      <TextField
                        key={index}
                        value={option.textFieldOptions.value}
                        name={option.textFieldOptions.name}
                        placeholder={option.textFieldOptions.placeholder}
                        onChange={formik.handleChange}
                      />
                    ) : null}
                  </>
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
                      />
                    }
                    label={option.label}
                  />
                ),
              )}
            </FormGroup>
            {renderObject.formikErrors && failedStep == 1 ? (
              <FormHelperText>{renderObject.errorMessage}</FormHelperText>
            ) : (
              ''
            )}
          </FormControl>
        </div>
      )
    }
    return null
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <FormControl required error={!!formik.errors.roles} component="fieldset">
          <h2>В каква роля искате да ни подкрепите?</h2>
        </FormControl>
        {Object.entries(formik.values.roles)
          .filter(([_, value]) => value)
          .map(([key, _], index) => (
            <div key={index}>{renderQuestion(key)}</div>
          ))}
      </Grid>
    </Grid>
  )
}

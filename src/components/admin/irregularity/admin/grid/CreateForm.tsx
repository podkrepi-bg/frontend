import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { Person } from 'gql/person'
import { CampaignResponse } from 'gql/campaigns'

import { Button, Grid2 } from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { createIrregularity, uploadIrregularityFiles } from 'service/irregularity'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import { email, name, phone } from 'common/form/validation'
import theme from 'common/theme'

import FileUpload from 'components/common/file-upload/FileUpload'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import EmailField from 'components/common/form/EmailField'

import {
  IrregularityInput,
  IrregularityResponse,
  IrregularityUploadImage,
  NotifierTypes,
  IrregularityReason,
  IrregularityStatus,
  UploadIrregularityFiles,
} from 'components/client/irregularity/helpers/irregularity.types'

import CampaignSelect from 'components/client/campaigns/CampaignSelect'
import FileList from 'components/client/irregularity/helpers/FileList'
import StatusSelect from 'components/client/irregularity/helpers/StatusSelect'
import NotifierTypeSelect from 'components/client/irregularity/helpers/NotifierTypeSelect'
import IrregularityReasonSelect from 'components/client/irregularity/helpers/IrregularityReasonSelect'

import { Content, Heading } from './CommonAdminStyles.styled'

const validationSchema: yup.SchemaOf<IrregularityInput> = yup
  .object()
  .defined()
  .shape({
    campaignId: yup.string().uuid().required(),
    description: yup.string().trim().max(500).required(),
    notifierType: yup.mixed().oneOf(Object.values(NotifierTypes)).required(),
    reason: yup.mixed().oneOf(Object.values(IrregularityReason)).required(),
    status: yup.mixed().oneOf(Object.values(IrregularityStatus)).required(),
    person: yup.object().shape({
      firstName: name.required(),
      lastName: name.required(),
      email: email.required(),
      phone: phone.notRequired(),
    }),
  })

type Props = {
  campaigns?: CampaignResponse[]
  person?: Person
}

export default function CreateForm({ campaigns, person }: Props) {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const { t } = useTranslation('irregularity')

  const initialValues: IrregularityInput = {
    campaignId: '',
    description: '',
    notifierType: NotifierTypes.OTHER,
    reason: IrregularityReason.OTHER,
    status: IrregularityStatus.INITIAL,
    person: {
      firstName: person?.firstName || '',
      lastName: person?.lastName || '',
      email: person?.email || '',
      phone: person?.phone || '',
    },
  }

  const mutation = useMutation<
    AxiosResponse<IrregularityResponse>,
    AxiosError<ApiErrors>,
    IrregularityInput
  >({
    mutationFn: createIrregularity,
  })

  const fileUploadMutation = useMutation<
    AxiosResponse<IrregularityUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadIrregularityFiles
  >({
    mutationFn: uploadIrregularityFiles(),
  })

  const onSubmit = async (values: IrregularityInput) => {
    try {
      const response = await mutation.mutateAsync({
        campaignId: values.campaignId,
        description: values.description,
        notifierType: values.notifierType,
        reason: values.reason,
        status: values.status,
        person: {
          firstName: values.person.firstName,
          lastName: values.person.lastName,
          email: values.person.email,
          phone: values.person.phone,
        },
      })
      await fileUploadMutation.mutateAsync({
        files,
        irregularityId: response.data.id,
      })
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      router.push(routes.admin.irregularity.index)
    } catch (error) {
      AlertStore.show(t('common:alerts.error'), 'error')
    }
  }

  return (
    <Grid2 container direction="column" component="section">
      <Grid2 size={12}>
        <Heading variant="h5">{t('admin.create-form')}</Heading>
      </Grid2>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid2
          container
          spacing={3}
          sx={{ 'div.MuiSelect-select': { padding: theme.spacing(1.06, 1.75) } }}>
          <Grid2 container spacing={3}>
            <Grid2
              size={{
                xs: 12,
                sm: 6
              }}>
              <FormTextField
                type="string"
                name="person.firstName"
                label={t('admin.fields.firstName')}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6
              }}>
              <FormTextField
                type="string"
                name="person.lastName"
                label={t('admin.fields.lastName')}
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={3}>
            <Grid2
              size={{
                xs: 12,
                sm: 6
              }}>
              <EmailField name="person.email" label={t('admin.fields.email')} />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6
              }}>
              <FormTextField type="phone" name="person.phone" label={t('admin.fields.phone')} />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={3}>
            <Grid2
              size={{
                xs: 12,
                sm: 6
              }}>
              <NotifierTypeSelect />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6
              }}>
              <CampaignSelect
                label={t('admin.fields.campaign')}
                name="campaignId"
                campaigns={campaigns}
                selectedCampaign={initialValues.campaignId}
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={3}>
            <Grid2
              size={{
                xs: 12,
                sm: 6
              }}>
              <StatusSelect />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6
              }}>
              <IrregularityReasonSelect name="reason" />
            </Grid2>
          </Grid2>
          <Grid2 size={12}>
            <Content
              rows={5}
              multiline
              type="text"
              name="description"
              label={t('admin.fields.description')}
            />
          </Grid2>
          <Grid2 size={12}>
            <FileUpload
              onUpload={(newFiles) => {
                setFiles((prevFiles) => [...prevFiles, ...newFiles])
              }}
              buttonLabel={t('cta.upload-files')}
            />
            <FileList
              files={files}
              onDelete={(deletedFile) =>
                setFiles((prevFiles) => prevFiles.filter((file) => file.name !== deletedFile.name))
              }
            />
          </Grid2>
          <Grid2 container spacing={3} justifyContent="space-between">
            <Grid2 size={4}>
              <Link href={routes.admin.irregularity.index} passHref>
                <Button fullWidth>{t('admin.cta.back')}</Button>
              </Link>
            </Grid2>
            <Grid2 size={4}>
              <SubmitButton fullWidth label={t('admin.cta.submit')} />
            </Grid2>
          </Grid2>
        </Grid2>
      </GenericForm>
    </Grid2>
  );
}

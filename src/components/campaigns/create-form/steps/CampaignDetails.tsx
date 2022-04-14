import React from 'react'
import { useTranslation } from 'next-i18next'

import { styled } from '@mui/system'
import { Grid, Typography } from '@mui/material'

import FileList from 'components/file-upload/FileList'
import FileUpload from 'components/file-upload/FileUpload'
import FormTextField from 'components/common/form/FormTextField'
import { CampaignFileRole, FileRole } from 'components/campaign-file/roles'

import Subtitle from '../helpers/Subtitle'

const TextFieldWrapper = styled(FormTextField)`
  fieldset {
    border-radius: 50px;
    border: 1px solid #909090;
    height: 40px;
  }
`

export default function CampaignDetails() {
  const { t } = useTranslation('campaigns')

  const [files, setFiles] = React.useState<File[]>([])
  const [roles, setRoles] = React.useState<FileRole[]>([])

  return (
    <Grid container spacing={4} justifyContent="center" direction="column" alignContent="center">
      <Subtitle label={t('steps.details.title')} />
      <Grid container item direction="column">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.details.description')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            label=""
            type="text"
            multiline
            rows={2}
            name="campaignDetails.description"
          />
        </Grid>
      </Grid>
      <Grid container item direction="column">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.details.so-far')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            label=""
            type="text"
            multiline
            rows={3}
            name="campaignDetails.soFar"
            placeholder={t('steps.details.so-far-msg')}
          />
        </Grid>
      </Grid>
      <Grid container item direction="column">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.details.aim')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormTextField label="" type="text" multiline rows={2} name="campaignDetails.aim" />
        </Grid>
      </Grid>
      <Grid container item direction="column">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.details.upload-links-title')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '12px' }}>
            {t('steps.details.upload-links-subtitle')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item rowSpacing={2} direction="column">
        <Grid item xs={12}>
          <TextFieldWrapper
            type="text"
            label=""
            fullWidth
            name="campaignDetails.homepageLink"
            placeholder={t('steps.details.campaign-homepage')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWrapper
            type="text"
            label=""
            fullWidth
            name="campaignDetails.mediaLink"
            placeholder={t('steps.details.campaign-media-links')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWrapper
            type="text"
            label=""
            fullWidth
            name="campaignDetails.facebook"
            placeholder={t('steps.details.campaign-facebook')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWrapper
            type="text"
            label=""
            fullWidth
            name="campaignDetails.otherLinks"
            placeholder={t('steps.details.campaign-other-links')}
          />
        </Grid>
      </Grid>
      <Grid container item rowSpacing={2} direction="column">
        <Grid item xs={12}>
          <FileUpload // TODO: to be implemented
            onUpload={(newFiles) => {
              setFiles((prevFiles) => [...prevFiles, ...newFiles])
              setRoles((prevRoles) => [
                ...prevRoles,
                ...newFiles.map((file) => ({
                  file: file.name,
                  role: CampaignFileRole.background,
                })),
              ])
            }}
            buttonLabel={t('steps.cta.upload-files')}
          />
          <FileList
            filesRole={roles}
            files={files}
            onDelete={(deletedFile) =>
              setFiles((prevFiles) => prevFiles.filter((file) => file.name !== deletedFile.name))
            }
            onSetFileRole={(file, role) => {
              setRoles((prevRoles) => [
                ...prevRoles.filter((f) => f.file !== file.name),
                { file: file.name, role },
              ])
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '14px', textAlign: 'justify' }}>
          {t('steps.details.support-msg')}
        </Typography>
      </Grid>
    </Grid>
  )
}

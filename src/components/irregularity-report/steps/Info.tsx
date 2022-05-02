import React from 'react'
import { useTranslation } from 'next-i18next'

import { styled } from '@mui/system'
import { FormControl, Grid, TextField, Typography } from '@mui/material'

import FileList from 'components/file-upload/FileList'
import FileUpload from 'components/file-upload/FileUpload'
import FormTextField from 'components/common/form/FormTextField'
import { CampaignFileRole, FileRole } from 'components/campaign-file/roles'

import Subtitle from '../helpers/Subtitle'
import { Field } from 'formik'

const CssTextField = styled(FormTextField)({
  '& label': {
    marginLeft: '8px',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '42px',
    margin: '20px 0',
    padding: '20px',
  },
})

export default function Info() {
  const { t } = useTranslation('irregularity-report')

  const [files, setFiles] = React.useState<File[]>([])
  const [roles, setRoles] = React.useState<FileRole[]>([])

  return (
    <Grid container spacing={4} justifyContent="center" direction="column" alignContent="center">
      <Subtitle label={t('steps.info.subtitle')} />
      <Grid container item direction="column">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.info.is-donor')}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <FormControl sx={{ width: '40%', marginTop: '20px' }}>
            <Grid container item xs={12} direction="row">
              <Grid item xs={6}>
                <label>
                  <Field type="radio" name="info.donorType" value={'yes'} />
                  {t('steps.info.yes')}
                </label>
              </Grid>
              <Grid item xs={6}>
                <label>
                  <Field type="radio" name="info.donorType" value={'no'} />
                  {t('steps.info.no')}
                </label>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container item direction="column">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.info.description')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CssTextField label="" type="text" multiline rows={6} name="info.description" />
        </Grid>
      </Grid>
      <Grid container item rowSpacing={2} direction="column">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.info.files')}</Typography>
        </Grid>
        <Grid container justifyContent="center">
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
            buttonLabel={t('cta.upload-files')}
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
          {t('steps.info.priority-message')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '14px', textAlign: 'justify' }}>
          {t('steps.info.share-message')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '14px', textAlign: 'justify' }}>
          {t('steps.info.thanks-message')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '14px', textAlign: 'justify' }}>
          {t('steps.info.sign')}
        </Typography>
      </Grid>
    </Grid>
  )
}

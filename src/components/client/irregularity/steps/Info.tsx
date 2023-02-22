import React, { useEffect } from 'react'
import { Field } from 'formik'
import { useTranslation } from 'next-i18next'

import { styled } from '@mui/material/styles'
import { FormControl, Grid, Typography } from '@mui/material'

import FileUpload from 'components/common/file-upload/FileUpload'
import FormTextField from 'components/common/form/FormTextField'

import Subtitle from '../helpers/Subtitle'
import FileList from '../helpers/FileList'
import { NotifierTypes } from '../helpers/irregularity.types'
import IrregularityReasonSelect from '../helpers/IrregularityReasonSelect'

const CssTextField = styled(FormTextField)({
  '& label': {
    marginLeft: '8px',
  },
  '& .MuiOutlinedInput-root': {
    margin: '20px 0',
    padding: '20px',
  },
})

type Props = {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

export default function Info({ files, setFiles }: Props) {
  const { t } = useTranslation('irregularity')

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return (
    <Grid container spacing={4} justifyContent="center" alignContent="center">
      <Subtitle label={t('steps.info.subtitle')} />
      <Grid container item>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.info.is-donor')}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <FormControl sx={{ width: '40%', marginTop: '20px' }}>
            <Grid container item xs={12} direction="row">
              <Grid item xs={6}>
                <label>
                  <Field
                    size="medium"
                    type="radio"
                    name="info.notifierType"
                    value={NotifierTypes.BENEFACTOR}
                  />
                  {t('steps.info.yes')}
                </label>
              </Grid>
              <Grid item xs={6}>
                <label>
                  <Field
                    size="medium"
                    type="radio"
                    name="info.notifierType"
                    value={NotifierTypes.OTHER}
                  />
                  {t('steps.info.no')}
                </label>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px', marginBottom: '20px' }}>
            {t('reason.title')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <IrregularityReasonSelect />
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.info.content')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CssTextField label="" type="text" multiline rows={6} name="info.description" />
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.info.files')}</Typography>
        </Grid>
        <Grid container justifyContent="center" mt={2}>
          <FileUpload
            onUpload={(newFiles) => {
              setFiles((prevFiles: File[]) => [...prevFiles, ...newFiles])
            }}
            buttonLabel={t('cta.upload-files')}
          />
          <FileList
            files={files}
            onDelete={(deletedFile) =>
              setFiles((prevFiles: File[]) =>
                prevFiles.filter((file: File) => file.name !== deletedFile.name),
              )
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '15px', textAlign: 'justify' }}>
          {t('steps.info.priority-message')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '15px', textAlign: 'justify' }}>
          {t('steps.info.share-message')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '15px', textAlign: 'justify' }}>
          {t('steps.info.thanks-message')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '15px', textAlign: 'justify' }}>
          {t('steps.info.sign')}
        </Typography>
      </Grid>
    </Grid>
  )
}

import React, { useEffect } from 'react'
import { Field } from 'formik'
import { useTranslation } from 'next-i18next'

import { styled } from '@mui/material/styles'
import { FormControl, Grid2, Typography } from '@mui/material'

import FileUpload from 'components/common/file-upload/FileUpload'
import FormTextField from 'components/common/form/FormTextField'

import Subtitle from '../helpers/Subtitle'
import FileList from '../helpers/FileList'
import { NotifierTypes } from '../helpers/irregularity.types'
import IrregularityReasonSelect from '../helpers/IrregularityReasonSelect'

import theme from 'common/theme'

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
    <Grid2 container spacing={4} justifyContent="center" alignContent="center">
      <Subtitle label={t('steps.info.subtitle')} />
      <Grid2 container>
        <Grid2 size={12}>
          <Typography sx={{ fontSize: theme.typography.pxToRem(18) }}>
            {t('steps.info.is-donor')}
          </Typography>
        </Grid2>
        <Grid2 container size={12}>
          <FormControl sx={{ width: '40%', marginTop: '20px' }}>
            <Grid2 container direction="row" size={12}>
              <Grid2 size={6}>
                <label>
                  <Field
                    size="medium"
                    type="radio"
                    name="info.notifierType"
                    value={NotifierTypes.BENEFACTOR}
                  />
                  {t('steps.info.yes')}
                </label>
              </Grid2>
              <Grid2 size={6}>
                <label>
                  <Field
                    size="medium"
                    type="radio"
                    name="info.notifierType"
                    value={NotifierTypes.OTHER}
                  />
                  {t('steps.info.no')}
                </label>
              </Grid2>
            </Grid2>
          </FormControl>
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 size={12}>
          <Typography sx={{ fontSize: theme.typography.pxToRem(18), marginBottom: '20px' }}>
            {t('reason.title')}
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <IrregularityReasonSelect />
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 size={12}>
          <Typography sx={{ fontSize: theme.typography.pxToRem(18) }}>
            {t('steps.info.content')}
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <CssTextField label="" type="text" multiline rows={6} name="info.description" />
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 size={12}>
          <Typography sx={{ fontSize: theme.typography.pxToRem(18) }}>
            {t('steps.info.files')}
          </Typography>
        </Grid2>
        <Grid2 container justifyContent="center" mt={2}>
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
        </Grid2>
      </Grid2>
      <Grid2 size={12}>
        <Typography sx={{ fontSize: theme.typography.pxToRem(15), textAlign: 'justify' }}>
          {t('steps.info.priority-message')}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Typography sx={{ fontSize: theme.typography.pxToRem(15), textAlign: 'justify' }}>
          {t('steps.info.share-message')}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Typography sx={{ fontSize: theme.typography.pxToRem(15), textAlign: 'justify' }}>
          {t('steps.info.thanks-message')}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Typography sx={{ fontSize: theme.typography.pxToRem(15), textAlign: 'justify' }}>
          {t('steps.info.sign')}
        </Typography>
      </Grid2>
    </Grid2>
  )
}

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import FormTextField from 'components/common/form/FormTextField'
import { StyledStepHeading } from '../helpers/campaignApplication.styled'

import FileList from 'components/common/file-upload/FileList'
import FileUpload from 'components/common/file-upload/FileUpload'
import { Dispatch, SetStateAction } from 'react'

export type Props = {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

export default function CampaignApplicationDetails({ files, setFiles }: Props) {
  const { t } = useTranslation('campaign-application')

  return (
    <Grid container spacing={6} justifyContent="center" direction="column" alignContent="center">
      <Grid item container justifyContent="center">
        <StyledStepHeading variant="h4">{t('steps.details.title')}</StyledStepHeading>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid item xs={12}>
          <FormTextField
            type="text"
            name="applicationDetails.description"
            label={t('steps.details.description')}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="text"
            name="applicationDetails.currentStatus"
            label={t('steps.details.current-status.label')}
            placeholder={t('steps.details.current-status.placeholder')}
            multiline
            rows={5}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="text"
            name="applicationDetails.cause"
            label={t('steps.details.cause')}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <FileUpload
            buttonLabel={t('steps.details.documents')}
            onUpload={(newFiles) => {
              setFiles((prevFiles) => [...prevFiles, ...newFiles])
            }}
            accept="text/plain,application/json,application/pdf,image/png,image/jpeg,application/xml,text/xml,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
          <Typography>{t('steps.details.disclaimer')}</Typography>
          <FileList
            files={files}
            onDelete={(deletedFile) =>
              setFiles((prevFiles) => prevFiles.filter((file) => file.name !== deletedFile.name))
            }
            rolesList={{}}
            onSetFileRole={() => {
              // we have no roles for the campaign application - it's all a document
              return undefined
            }}
            filesRole={[]}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

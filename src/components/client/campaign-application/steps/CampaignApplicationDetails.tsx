import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import FormTextField from 'components/common/form/FormTextField'
import { StyledStepHeading } from '../helpers/campaignApplication.styled'

import theme from 'common/theme'
import FileList from 'components/common/file-upload/FileList'
import FileUpload from 'components/common/file-upload/FileUpload'

export type Props = {
  files: File[]
  setFiles: (files: File[]) => void
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
            name="details.description"
            label={t('steps.details.description')}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="text"
            name="details.currentStatus"
            label={t('steps.details.current-status.label')}
            placeholder={t('steps.details.current-status.placeholder')}
            multiline
            rows={5}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="text"
            name="details.cause"
            label={t('steps.details.cause')}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: theme.typography.pxToRem(16), paddingBottom: 2 }}>
            {t('steps.details.links.label')}
          </Typography>
          <Grid container item spacing={2} xs={12}>
            <Grid item xs={12}>
              <FormTextField
                type="text"
                name="details.links.website"
                label=""
                placeholder={t('steps.details.links.fields.website')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                type="text"
                name="details.links.media"
                label=""
                placeholder={t('steps.details.links.fields.media')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                type="text"
                name="details.links.facebook"
                label=""
                placeholder={t('steps.details.links.fields.facebook')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                type="text"
                name="details.links.donationPlatform"
                label=""
                placeholder={t('steps.details.links.fields.donation-platforms')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FileUpload
            buttonLabel={t('steps.details.documents')}
            onUpload={(newFiles) => {
              setFiles((prevFiles) => [...prevFiles, ...newFiles])
            }}
          />
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

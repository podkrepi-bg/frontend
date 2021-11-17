import React, { useState } from 'react'
import Uppy from '@uppy/core'
import { Button } from '@mui/material'
import { DashboardModal } from '@uppy/react'
import Facebook from '@uppy/facebook'
import GoogleDrive from '@uppy/google-drive'
import ImageEditor from '@uppy/image-editor'
import AwsS3 from '@uppy/aws-s3'
import '@uppy/image-editor/dist/style.css'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { useTranslation } from 'react-i18next'
import { UseTranslation } from 'next-i18next'

const uppy = new Uppy({
  restrictions: {
    allowedFileTypes: ['image/*'],
  },
}) //todo set up companions
  .use(GoogleDrive, { companionUrl: 'https://companion.uppy.io' })
  .use(Facebook, { companionUrl: 'https://companion.uppy.io' })
  .use(ImageEditor, { quality: 1 })
  .use(AwsS3, { companionUrl: 'https://companion.uppy.io' })

uppy.on('complete', (result) => {
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})

const getLocale = (t: UseTranslation) => {
  return {
    save: `${t('campaigns:campaign.images.save')}`,
    addMore: `${t('campaigns:campaign.images.add-more')}`,
    cancel: `${t('campaigns:campaign.images.cancel')}`,
    closeModal: `${t('campaigns:campaign.images.close')}`,
    importFrom: `${t('campaigns:campaign.images.import-from')}`,
    addMoreFiles: `${t('campaigns:campaign.images.add-more')}`,
    back: `${t('campaigns:campaign.images.back')}`,
    removeFile: `${t('campaigns:campaign.images.remove')}`,
    editFile: `${t('campaigns:campaign.images.edit')}`,
    editFileWithFilename: `${t('campaigns:campaign.images.edit')}`,
    editing: `${t('campaigns:campaign.images.editing')}`,
    dropPasteImportFiles: `${t('campaigns:campaign.images.drop-paste-import-files')}`,
    cancelUpload: `${t('campaigns:campaign.images.cancel')}`,
    xFilesSelected: `${t('campaigns:campaign.images.files-selected')}`,
    uploadingXFiles: `${t('campaigns:campaign.images.uploading')}`,
    myDevice: `${t('campaigns:campaign.images.my-device')}`,
    addingMoreFiles: `${t('campaigns:campaign.images.adding-more')}`,
    poweredBy: '',
    // @uppy/status-bar strings:
    uploading: `${t('campaigns:campaign.images.uploading')}`,
    complete: `${t('campaigns:campaign.images.complete')}`,
    uploadFailed: `${t('campaigns:campaign.images.upload-failed')}`,
    paused: `${t('campaigns:campaign.images.paused')}`,
    retry: `${t('campaigns:campaign.images.retry')}`,
    pause: `${t('campaigns:campaign.images.pause')}`,
    resume: `${t('campaigns:campaign.images.resume')}`,
    done: `${t('campaigns:campaign.images.complete')}`,
    xTimeLeft: `${t('campaigns:campaign.images.x-time-left')}`,
    uploadXFiles: {
      0: `${t('campaigns:campaign.images.upload-file')}`,
      1: `${t('campaigns:campaign.images.upload-multiple')}`,
    },
    uploadXNewFiles: {
      0: `${t('campaigns:campaign.images.upload-file')}`,
      1: `${t('campaigns:campaign.images.upload-multiple')}`,
    },
  }
}

const FileUploadModal = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Button fullWidth variant="contained" color="info" onClick={() => setOpen(true)}>
        {t('campaigns:campaign.images.add')}
      </Button>
      <DashboardModal
        uppy={uppy}
        onRequestClose={() => setOpen(false)}
        open={open}
        plugins={['Facebook', 'GoogleDrive', 'ImageEditor']}
        locale={{
          strings: getLocale(t),
        }}
      />
    </>
  )
}

export default FileUploadModal

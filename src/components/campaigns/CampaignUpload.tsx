import React from 'react'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import Facebook from '@uppy/facebook'
import GoogleDrive from '@uppy/google-drive'
import ImageEditor from '@uppy/image-editor'
import AwsS3 from '@uppy/aws-s3'
import '@uppy/image-editor/dist/style.css'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

const uppy = new Uppy({
  restrictions: {
    allowedFileTypes: ['image/*'],
  },
}) //todo set up companions ?
  .use(GoogleDrive, { id: 'GoogleDrive', companionUrl: 'https://companion.uppy.io' })
  .use(Facebook, { id: 'Facebook', companionUrl: 'https://companion.uppy.io' })
  .use(ImageEditor, { id: 'ImageEditor', quality: 1 })
  .use(AwsS3, { companionUrl: 'https://uppy-companion.my-app.com/' })

uppy.on('complete', (result) => {
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})

const CampaignUpload = () => {
  return (
    <Dashboard
      uppy={uppy}
      plugins={['Facebook', 'GoogleDrive', 'ImageEditor']}
      locale={{
        strings: {
          dropHereOr: 'Drop here or %{browse}',
          browse: 'browse',
        },
      }}
    />
  )
}

export default CampaignUpload

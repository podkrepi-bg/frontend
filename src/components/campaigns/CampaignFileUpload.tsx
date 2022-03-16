import { useState } from 'react'
import { Button } from '@mui/material'

function CampaignFileUpload() {
  const [files, setFiles] = useState<{ name: string }[]>([])

  return (
    <>
      <label htmlFor="contained-button-file">
        <input
          id="contained-button-file"
          multiple
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => setFiles([...(e.target.files as FileList)])}
        />
        <Button fullWidth variant="contained" color="info" component="span">
          Добави снимки
        </Button>
      </label>
      <ul>
        {files.map((file) => {
          return <li key={file.name}>{file.name}</li>
        })}
      </ul>
    </>
  )
}

export default CampaignFileUpload

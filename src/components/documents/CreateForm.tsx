import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import CarField from 'components/cars/CarField'
import notify from 'components/cars/helpers/notify'

export default function CreateForm() {
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [filename, setFilename] = useState('')
  const [filetype, setFiletype] = useState('')
  const [description, setDescription] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')

  const router = useRouter()

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!type || !name || !filename || !filetype || !description || !sourceUrl) {
      return
    }

    const documentData = JSON.stringify({
      type,
      name,
      filename,
      filetype,
      description,
      sourceUrl,
    })

    fetch('http://localhost:5010/api/document', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentData,
    }).then(() => {
      router.push('/documents')
      notify('Successfully created item!')
    })
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Box sx={{ mt: 15, ml: 75, width: 600 }}>
          <CarField value={type} label="Type" setElement={setType} />
          <CarField value={name} label="Name" setElement={setName} />
          <CarField value={filename} label="File Name" setElement={setFilename} />
          <CarField value={filetype} label="File Type" setElement={setFiletype} />
          <CarField value={description} label="Description" setElement={setDescription} />
          <CarField value={sourceUrl} label="Source Url" setElement={setSourceUrl} />
          <Box sx={{ display: 'inline' }}>
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      </form>
    </>
  )
}

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Button } from '@mui/material'
import CarField from 'components/cars/CarField'
import notify from 'components/cars/helpers/notify'
import { DocumentType } from 'gql/document'

type Props = {
  document: DocumentType
}

export default function EditForm({ document }: Props) {
  const [type, setType] = useState(document.type)
  const [name, setName] = useState(document.name)
  const [filename, setFilename] = useState(document.filename)
  const [filetype, setFiletype] = useState(document.filetype)
  const [description, setDescription] = useState(document.description)
  const [sourceUrl, setSourceUrl] = useState(document.sourceUrl)

  const router = useRouter()

  async function onEditSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    fetch(`http://localhost:5010/api/document/${document.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentData,
    })
      .then((res) => res.json())
      .then((data) => {
        router.push('/documents')
        notify('Successfully edited item!')
      })
  }

  return (
    <>
      <form onSubmit={onEditSubmit}>
        <Box sx={{ mt: 15, ml: 75, width: 600 }}>
          <CarField value={type} label="Type" setElement={setType} />
          <CarField value={name} label="Name" setElement={setName} />
          <CarField value={filename} label="File Name" setElement={setFilename} />
          <CarField value={filetype} label="File Type" setElement={setFiletype} />
          <CarField value={description} label="Description" setElement={setDescription} />
          <CarField value={sourceUrl} label="Source Url" setElement={setSourceUrl} />
          <Box>
            <Box sx={{ display: 'inline' }}>
              <Button type="submit">Save</Button>
            </Box>
            <Box sx={{ display: 'inline' }}>
              <Link href="/documents">
                <Button>Cancel</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  )
}

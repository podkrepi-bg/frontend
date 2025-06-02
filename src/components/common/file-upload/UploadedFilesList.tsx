import { Close, Delete, FilePresent, Preview } from '@mui/icons-material'
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { createContext, useContext, useEffect, useState } from 'react'
import CenteredSpinner from '../CenteredSpinner'
import { styled } from '@mui/material/styles'
export interface FilesListContext {
  deleteMutation: (file: UploadedFile) => Promise<unknown>
  files: UploadedFile[]
  getBlobUrl: (file: UploadedFile) => Promise<string>
  download: (file: UploadedFile) => void
}

const UploadedFilesContext = createContext<FilesListContext>({
  files: [],
  download: () => Promise.reject('download query missing'),
  deleteMutation: () => Promise.reject('delete mutation missing'),
  getBlobUrl: () => Promise.reject('Function not implemented.'),
})

export interface UploadedFilesListProps {
  title?: string | JSX.Element | undefined
  files: UploadedFile[]
  downloadQuery: (f: UploadedFile) => Promise<Blob>
  deleteMutation: (f: UploadedFile) => Promise<unknown>
  downloadText?: string
}

export function UploadedFilesList({
  title: maybeTitle,
  files,
  downloadQuery,
  deleteMutation,
  downloadText: maybeDownloadText,
}: UploadedFilesListProps) {
  const { t } = useTranslation('common')
  const filesCtx = filesListContext({
    files,
    downloadQuery,
    deleteMutation,
  })

  const title = maybeTitle != null ?? t('files.attached-files')
  const downloadText = maybeDownloadText ?? t('files.download')

  return (
    <UploadedFilesContext.Provider value={filesCtx}>
      <List dense>
        {typeof title === 'string' ? <ListItemText primary={title} /> : title}
        {(files ?? []).map((file) => (
          <UploadedFileView key={file.id} file={file} downloadText={downloadText} />
        ))}
      </List>
    </UploadedFilesContext.Provider>
  )
}

export type UploadedFileViewProps = {
  file: UploadedFile
  role?: string
  downloadText: string
}

export function UploadedFileView({ file, role, downloadText }: UploadedFileViewProps) {
  const { deleteMutation, download } = useContext(UploadedFilesContext)

  return (
    <ListItem key={file.id}>
      <ListItemAvatar>
        <Avatar>
          <FilePresent />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={file.filename} />
      {role && <ListItemText primary={role} sx={{ textAlign: 'right', pr: 'inherit' }} />}
      <></>
      <Tooltip title={'download'}>
        <Button onClick={() => download(file)}>{downloadText}</Button>
      </Tooltip>
      <FilePreview {...file} />
      <IconButton edge="end" aria-label="delete" onClick={() => deleteMutation(file)}>
        <Delete />
      </IconButton>
    </ListItem>
  )
}

export function FilePreview(f: UploadedFile) {
  const { getBlobUrl } = useContext(UploadedFilesContext)
  const [fetch, setFetch] = useState(false)
  const [display, setDisplay] = useState<'block' | 'none'>('none')
  const [blobUrl, setBlobUrl] = useState<string | undefined>()

  const StyledDiv = styled('div')({
    position: 'fixed',
    top: '5vw',
    left: '5vh',
    boxShadow: '2px 4px 5px',
    width: '90vw',
    height: '90vh',
    zIndex: 99999,
    display,
    backgroundColor: 'white',
  })

  const FixedDimentionsDiv = styled('div')({
    width: '100%',
    height: '100%',
  })

  const StyledIFrame = styled('iframe')({
    width: '100%',
    height: '100%',
  })
  useEffect(() => {
    if (fetch) {
      setDisplay('block')
      getBlobUrl(f)
        .then(setBlobUrl)
        .then(() => setFetch(false))
        .catch((e) => {
          console.log(e)
        })
    }
  }, [fetch])
  return (
    <>
      <Tooltip title={'preview'}>
        <IconButton edge="end" aria-label="preview" onClick={() => setFetch(true)}>
          <Preview />
        </IconButton>
      </Tooltip>
      <StyledDiv>
        {display === 'block' ? (
          <StyledIFrame id={f.id} src={blobUrl} allowFullScreen={true} />
        ) : (
          <FixedDimentionsDiv>
            <CenteredSpinner />
          </FixedDimentionsDiv>
        )}
        <Button
          color="secondary"
          variant="outlined"
          sx={{ position: 'absolute', right: '-2rem', top: '-2.5rem' }}
          onClick={() => setDisplay('none')}>
          <Close />
        </Button>
      </StyledDiv>
    </>
  )
}

export interface FilesListContextInput {
  files: UploadedFile[]
  downloadQuery: (file: UploadedFile) => Promise<Blob>
  deleteMutation: (file: UploadedFile) => Promise<unknown>
}
export function filesListContext({ files, downloadQuery, deleteMutation }: FilesListContextInput) {
  const blobUrls: Record<string, string> = {}
  async function downloadAndGetBlobUrl(file: UploadedFile) {
    if (blobUrls[file.id]) {
      return blobUrls[file.id]
    } else {
      return downloadQuery(file)
        .then((blob) => {
          const b = window.URL.createObjectURL(new Blob([blob], { type: blob.type }))
          blobUrls[file.id] = b
          return b
        })
        .catch((error) => {
          console.error(error)
          // don't store it so next time we'll retry fetching
          return window.URL.createObjectURL(
            new Blob(
              [
                `<html>
                  <body>
                    <h3 style="text-align:center; margin-top: 10%">
                      Could not fetch the file. Please retry
                    </h3>
                  </body>
                </html>`,
              ],
              {
                type: 'text/html',
              },
            ),
          )
        })
    }
  }

  async function download(f: UploadedFile) {
    const blobUrlForDownload = await downloadAndGetBlobUrl(f)
    const link = document.createElement('a')
    link.href = blobUrlForDownload
    link.setAttribute('download', `${f.filename}`)
    link.click()
  }

  const context: FilesListContext = {
    deleteMutation,
    files,
    download,
    getBlobUrl: downloadAndGetBlobUrl,
  }

  return context
}

export interface UploadedFile {
  id: string
  filename: string
}

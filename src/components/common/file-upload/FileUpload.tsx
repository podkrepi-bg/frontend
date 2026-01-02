import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const Input = styled('input')({
  display: 'none',
})

const mimeAllowlistStr = [
  'text/plain',
  'application/json',
  'application/pdf',
  'image/png',
  'image/jpeg',
  'application/xml',
  'text/xml',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
].join(',')

function FileUpload({
  onUpload,
  buttonLabel,
  accept,
  ...rest
}: {
  onUpload: (files: File[]) => void
  buttonLabel: string
  accept?: string[]
}) {
  const acceptStr = accept ? accept.join(',') : mimeAllowlistStr

  return (
    <label htmlFor="contained-button-file">
      <Input
        id="contained-button-file"
        multiple
        type="file"
        accept={acceptStr}
        onChange={(e) => onUpload([...(e.target.files as FileList)])}
        {...rest}
      />
      <Button fullWidth variant="contained" color="info" component="span">
        {buttonLabel}
      </Button>
    </label>
  )
}

export default FileUpload

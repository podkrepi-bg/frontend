import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

function FileUpload({
  onUpload,
  buttonLabel,
  ...rest
}: {
  onUpload: (files: File[]) => void
  buttonLabel: string
  accept?: string
}) {
  const Input = styled('input')({
    display: 'none',
  })

  return (
    <label htmlFor="contained-button-file">
      <Input
        id="contained-button-file"
        multiple
        type="file"
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

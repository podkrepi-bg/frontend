import { Delete, UploadFile } from '@mui/icons-material'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

type NewType = {
  files: File[]
  onDelete?: (file: File) => void
}

function FileList({ files, onDelete }: NewType) {
  return (
    <List dense>
      {files.map((file, key) => (
        <ListItem
          key={key}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete && onDelete(file)}>
              <Delete />
            </IconButton>
          }>
          <ListItemAvatar>
            <Avatar>
              <UploadFile />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default FileList

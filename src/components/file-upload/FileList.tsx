import { Delete, UploadFile } from '@mui/icons-material'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Select,
  MenuItem,
} from '@mui/material'

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
          <Select>
            <MenuItem>Избери тип</MenuItem>
            <MenuItem>background</MenuItem>
            <MenuItem>coordinator</MenuItem>
            <MenuItem>campaignPhoto</MenuItem>
            <MenuItem>invoice</MenuItem>
            <MenuItem>document</MenuItem>
          </Select>
        </ListItem>
      ))}
    </List>
  )
}

export default FileList

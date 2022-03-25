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
  FormControl,
  InputLabel,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { CampaignFileRole } from 'components/campaign-file/roles'
import React from 'react'

type NewType = {
  files: File[]
  onDelete?: (file: File) => void
  onSetFileRole: (file: File, role: string) => void
  filesRole: { file: string; role: string }[]
}

function FileList({ files, onDelete, onSetFileRole, filesRole = [] }: NewType) {
  const setFileRole = (file: File) => {
    return (event: SelectChangeEvent) => {
      onSetFileRole(file, event.target.value as string)
    }
  }

  const menuItems: JSX.Element[] = []

  for (const role in CampaignFileRole) {
    menuItems.push(<MenuItem value={role}>{role}</MenuItem>)
  }

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
          <FormControl>
            <InputLabel id="choose-type-label">Избери тип</InputLabel>
            <Select
              labelId="choose-type-label"
              id="choose-type"
              value={
                (filesRole.find((f) => f.file === file.name)?.role as string) ||
                CampaignFileRole.background
              }
              label="Избери тип"
              onChange={setFileRole(file)}>
              {menuItems.map((item) => {
                return item
              })}
            </Select>
          </FormControl>
        </ListItem>
      ))}
    </List>
  )
}

export default FileList

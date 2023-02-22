import React from 'react'
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

import { CampaignFileRole, FileRole } from 'components/common/campaign-file/roles'

type Props = {
  files: File[]
  onDelete?: (file: File) => void
  onSetFileRole: (file: File, role: CampaignFileRole) => void
  filesRole: FileRole[]
}

function FileList({ files, onDelete, onSetFileRole, filesRole = [] }: Props) {
  const setFileRole = (file: File) => {
    return (event: SelectChangeEvent<CampaignFileRole>) => {
      if (Object.values(CampaignFileRole).includes(event.target.value as CampaignFileRole)) {
        onSetFileRole(file, event.target.value as CampaignFileRole)
      }
    }
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
            <InputLabel id="choose-type-label">{'Избери роля'}</InputLabel>
            <Select<CampaignFileRole>
              id="choose-type"
              size="small"
              label="Избери роля"
              labelId="choose-type-label"
              value={
                filesRole.find((f) => f.file === file.name)?.role ?? CampaignFileRole.background
              }
              onChange={setFileRole(file)}>
              {Object.values(CampaignFileRole).map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
      ))}
    </List>
  )
}

export default FileList

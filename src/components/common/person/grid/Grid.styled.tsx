import theme from 'common/theme'
import { styled } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import CheckIcon from '@mui/icons-material/Check'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Avatar } from '@mui/material'

export const StyledDataGrid = styled(DataGrid)({
  background: theme.palette.common.white,
  position: 'absolute',
  height: 'calc(100vh - 300px)',
  border: 'none',
  width: 'calc(100% - 48px)',
  left: '24px',
  overflowY: 'auto',
  overflowX: 'hidden',
  borderRadius: '0 0 13px 13px',
})

export const Centered = styled('div')({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const NameContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
})

export const StyledLink = styled('a')({
  textDecoration: 'underline',
  color: '#0070f3',
  cursor: 'pointer',
})

export const StyledCheckIcon = styled(CheckIcon)({
  color: '#00b386',
})

export const CloseIcon = styled(CloseOutlinedIcon)({
  color: '#ff5050',
})

export const StyledAvatar = styled(Avatar)<{ color: string }>(({ color }) => ({
  marginRight: 8,
  backgroundColor: color,
  fontWeight: 'bold',
  fontSize: 14,
  width: 32,
  height: 32,
  borderRadius: '50%',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
}))

import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import theme from 'common/theme'

const Search = styled('div')({
  position: 'relative',
  flexGrow: 1,
  borderRadius: theme.shape.borderRadius,
  color: alpha(theme.palette.primary.main, 1),
  backgroundColor: (theme.palette.primary.main, 0.5),
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '200%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
})

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)({
  color: theme.palette.primary.dark,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '150%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
})

export default function SearchInput() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
    </Search>
  )
}

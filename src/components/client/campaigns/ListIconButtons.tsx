import { styled } from '@mui/material/styles'
import { IconButton, ImageList, Typography } from '@mui/material'
import { Category } from '@mui/icons-material'

const Root = styled('div')(() => ({
  [`& .iconButton`]: {
    display: 'block',
    height: '80px',
    borderRadius: 0,
    borderBottom: '1px solid transparent',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '0',
      backgroundColor: '#4AC3FF',
      transition: 'height .2s',
    },
    '&:active': {
      color: '#4AC3FF',
    },
    '&:active:before': {
      height: '5px',
    },
    '&:hover': {
      backgroundColor: 'white',
      color: '#4AC3FF',
    },
    '&:hover:before': {
      height: '5px',
    },
    '&:focus': {
      color: '#4AC3FF',
    },
    '&:selected': {
      color: '#4AC3FF',
    },
  },
}))

export default function ListIconButtons({ data, onClick, cols, rowHeight, gap, style }) {
  return (
    <Root>
      <ImageList cols={cols} rowHeight={rowHeight} gap={gap} sx={style}>
        {data.map((item) => {
          return (
            <IconButton key={item.type} className="iconButton" onClick={() => onClick(item)}>
              {item.icon ?? <Category fontSize="small" />}
              <Typography>
                {item.text} ({item.count})
              </Typography>
            </IconButton>
          )
        })}
      </ImageList>
    </Root>
  )
}

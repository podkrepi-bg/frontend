import { styled } from '@mui/material/styles'
import { IconButton, ImageList, ImageListItem, Typography } from '@mui/material'
import { Category } from '@mui/icons-material'
import { CategoryType } from 'gql/types'

const Root = styled('div')(() => ({
  [`& .iconButton`]: {
    display: 'block',
    height: '90px',
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
    '&:focus:before': {
      height: '5px',
    },
  },
}))

const IconButtonText = styled(Typography)(() => ({
  fontFamily: 'Raleway, sans-serif',
}))

type Props = {
  data: CategoryType[]
  onClick: (item: CategoryType) => void
  cols?: number
  rowHeight?: number
  gap?: number
  style?: React.CSSProperties
  styleItem?: React.CSSProperties
}

export default function ListIconButtons({
  data,
  onClick,
  cols,
  rowHeight,
  gap,
  style,
  styleItem = { display: 'inline', margin: '0 auto' },
}: Props) {
  return (
    <Root>
      <ImageList cols={cols} rowHeight={rowHeight} gap={gap} sx={style}>
        {data.map((item) => {
          const hasCountProperty = Object.keys(item).includes('count')

          return (
            <ImageListItem key={item.type} sx={styleItem}>
              <IconButton
                disabled={item.isDisabled}
                className="iconButton"
                onClick={() => onClick(item)}>
                {item.icon ?? <Category fontSize="small" />}

                <IconButtonText>
                  {item.text} {hasCountProperty && `(${item.count})`}
                </IconButtonText>
              </IconButton>
            </ImageListItem>
          )
        })}
      </ImageList>
    </Root>
  )
}

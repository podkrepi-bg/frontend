import { styled } from '@mui/material/styles'
const PREFIX = 'HeadingSeparator'

const classes = {
  separator: `${PREFIX}-separator`,
}

const Root = styled('hr')({
  [`&.${classes.separator}`]: {
    border: 'none',
    borderBottom: '1px solid lightgrey',
    margin: '0 0 10px 0',
  },
})

const HeadingSeparator = () => {
  return <Root className={classes.separator} />
}

export default HeadingSeparator

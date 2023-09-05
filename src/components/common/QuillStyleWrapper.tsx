import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

export const QuillStypeWrapper = styled(Grid)(({ theme }) => ({
  ['img']: {
    maxWidth: '100%',
  },

  ['p']: {
    fontSize: theme.spacing(2),
    fontWeight: 400,
    lineHeight: theme.spacing(2.85),
  },

  ['.ql-editor, .ql-video']: {
    maxWidth: '100%',
  },
  ['.ql-video']: {
    maxWidth: '100%',
    marginInline: 'auto',
  },

  ['.ql-editor, blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6, .ql-editor ol, .ql-editor p, .ql-editor pre, .ql-editor ul']:
    {
      margin: 0,
      padding: 0,
      counterReset: 'list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
    },

  ['.ql-editor ol, .ql-editor ul']: {
    paddingLeft: '1.5em',
  },

  ['.ql-editor, .ql-align-left']: {
    textAlign: 'left',
  },

  ['.ql-editor, .ql-align-center']: {
    textAlign: 'center',
  },

  ['.ql-editor, .ql-align-justify']: {
    textAlign: 'justify',
  },

  ['.ql-editor, .ql-align-right']: {
    textAlign: 'right',
  },

  ['blockquote']: {
    borderLeft: '4px solid #ccc',
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 16,
  },

  ['.ql-editor, .ql-size-small']: {
    fontSize: '.75em',
  },

  ['.ql-editor, .ql-size-large']: {
    fontSize: '1.5em',
  },

  ['.ql-editor, .ql-size-huge']: {
    fontSize: '2.5em',
  },

  ['.ql-bubble, ql-editor h1']: {
    position: 'relative',
    width: '100%',
    fontSize: '1em',
  },

  ['.ql-bubble, ql-editor h2']: {
    fontSize: '1.5em',
  },

  ['.ql-bubble .ql-editor a ']: {
    textDecoration: 'none',
  },
}))

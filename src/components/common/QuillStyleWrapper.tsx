import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

export const QuillStypeWrapper = styled(Grid)(({ theme }) => ({
  ['img']: {
    maxWidth: '100%',
  },

  ['p, span, a']: {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.spacing(4),
    fontWeight: 500,
    paddingLeft: '0',
    paddingRight: '0',
    fontFamily: theme.typography.fontFamily,
  },

  ['strong']: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(16),
  },

  ['.ql-editor, .ql-video']: {
    maxWidth: '100%',
  },

  ['.ql-video, iframe']: {
    maxWidth: '100%',
    marginInline: 'auto',
  },

  ['blockquote, h1, h2, h3,h4, h5,h6, ol, p, pre, ul']: {
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
    fontSize: theme.typography.pxToRem(12),
  },

  ['.ql-editor, .ql-size-large']: {
    fontSize: theme.typography.pxToRem(24),
  },

  ['.ql-editor, .ql-size-huge']: {
    fontSize: theme.typography.pxToRem(40),
  },

  ['.ql-bubble, ql-editor h1']: {
    position: 'relative',
    width: '100%',
    fontSize: theme.typography.pxToRem(16),
  },

  ['.ql-bubble, ql-editor h2']: {
    fontSize: theme.typography.pxToRem(24),
  },

  ['a']: {
    textDecoration: 'underline',
    color: 'rgb(17, 85, 204)',
  },
  ['ul']: {
    listStyle: 'inside',
  },
  ['ul, ol']: {
    paddingLeft: '1.5em',
  },
}))

import { markdownShortcutPlugin } from '@mdxeditor/editor'
import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { diffSourcePlugin } from '@mdxeditor/editor/plugins/diff-source'
import {
  DirectiveDescriptor,
  directivesPlugin,
  directivesPluginHooks,
} from '@mdxeditor/editor/plugins/directives'
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings'
import { imagePlugin } from '@mdxeditor/editor/plugins/image'
import { linkPlugin } from '@mdxeditor/editor/plugins/link'
import { linkDialogPlugin } from '@mdxeditor/editor/plugins/link-dialog'
import { listsPlugin } from '@mdxeditor/editor/plugins/lists'
import { quotePlugin } from '@mdxeditor/editor/plugins/quote'
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { BlockTypeSelect } from '@mdxeditor/editor/plugins/toolbar/components/BlockTypeSelect'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { CreateLink } from '@mdxeditor/editor/plugins/toolbar/components/CreateLink'
import { DiffSourceToggleWrapper } from '@mdxeditor/editor/plugins/toolbar/components/DiffSourceToggleWrapper'
import { InsertImage } from '@mdxeditor/editor/plugins/toolbar/components/InsertImage'
import { ListsToggle } from '@mdxeditor/editor/plugins/toolbar/components/ListsToggle'
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { DialogButton } from '@mdxeditor/editor/plugins/toolbar/primitives/DialogButton'
import { Separator } from '@mdxeditor/editor/plugins/toolbar/primitives/toolbar'
import '@mdxeditor/editor/style.css'
import { Delete, YouTube } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from 'common/theme'
import { htmlToMarkdown, markdownToHtml } from 'lib/markdownUtils'
import throttle from 'lodash/throttle'
import React from 'react'

interface ModernEditorProps {
  html: string
  onChange(html: string): void
}

export const YoutubeDirectiveDescriptor: DirectiveDescriptor = {
  name: 'youtube',
  type: 'leafDirective',
  testNode(node) {
    return node.name === 'youtube'
  },
  attributes: ['id'],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${mdastNode.attributes?.id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />

        <Button
          onClick={() => {
            parentEditor.update(() => {
              lexicalNode.selectNext()
              lexicalNode.remove()
            })
          }}>
          <Delete />
        </Button>
      </div>
    )
  },
}

const YoutubeButton = () => {
  const insertDirective = directivesPluginHooks.usePublisher('insertDirective')
  const insertYouTube = React.useCallback(
    (urlString: string) => {
      const url = new URL(urlString)
      let id = ''
      // get the v parameter from the url
      if (url.host === 'youtu.be') {
        id = url.pathname.slice(1)
      } else {
        const vParam = url.searchParams.get('v')
        if (!vParam) {
          alert('Invalid YouTube URL')
        } else {
          id = vParam
        }
      }
      if (id) {
        insertDirective({
          name: 'youtube',
          type: 'leafDirective',
          attributes: { id },
        })
      }
    },
    [insertDirective],
  )

  return (
    <DialogButton
      buttonContent={<YouTube />}
      onSubmit={insertYouTube}
      tooltipTitle="Insert YouTube video"
      submitButtonTitle="Add video"
      dialogInputPlaceholder="YouTube URL"
    />
  )
}

const EditorWrapper = styled(Box)(() => ({
  borderRadius: theme.borders.semiRound,
  border: `1px solid ${theme.borders.input}`,
  maxHeight: '60rem',
  overflowY: 'auto',
  maxWidth: '100%',
  // below is quill's default style
  ['& .mdxeditor-content-editable']: {
    ['& ul & li']: {
      marginLeft: '2rem',
      listStyleType: 'disc',
    },
    ['& ol & li']: {
      marginLeft: '2rem',
      listStyleType: 'decimal',
    },
    ['& blockquote']: {
      borderLeft: `4px solid #ccc`,
      paddingLeft: '16px',
      marginTop: '5px',
      marginBottom: '5px',
    },
  },
}))

export const ModernEditor: React.FC<ModernEditorProps> = ({ html, onChange }) => {
  // const uploadImage = useUploadCampaignFiles()
  const markdown = React.useMemo(() => htmlToMarkdown(html), [])

  const onChangeCallback = React.useCallback(
    throttle(async (markdown) => {
      const html = await markdownToHtml(markdown)
      onChange(html)
    }, 500),
    [],
  )

  return (
    <EditorWrapper>
      <MDXEditor
        markdown={markdown}
        onChange={onChangeCallback}
        contentEditableClassName="mdxeditor-content-editable"
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <Separator />
                  <BlockTypeSelect />
                  <CreateLink />
                  <InsertImage />
                  <YoutubeButton />
                  <Separator />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
          linkPlugin(),
          listsPlugin(),
          headingsPlugin(),
          diffSourcePlugin({ diffMarkdown: markdown }),
          linkDialogPlugin(),
          imagePlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor] }),
        ]}
      />
    </EditorWrapper>
  )
}

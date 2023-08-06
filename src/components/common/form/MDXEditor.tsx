import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { diffSourcePlugin } from '@mdxeditor/editor/plugins/diff-source'
import { DirectiveDescriptor, directivesPlugin } from '@mdxeditor/editor/plugins/directives'
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
import { Separator } from '@mdxeditor/editor/plugins/toolbar/primitives/toolbar'
import '@mdxeditor/editor/style.css'
import { htmlToMarkdown, markdownToHtml } from 'lib/markdownUtils'
import throttle from 'lodash/throttle'
import React from 'react'

interface ModernEditorProps {
  html: string
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <button
          onClick={() => {
            parentEditor.update(() => {
              lexicalNode.selectNext()
              lexicalNode.remove()
            })
          }}>
          delete
        </button>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${mdastNode.attributes?.id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
    )
  },
}

export const ModernEditor: React.FC<ModernEditorProps> = ({ html }) => {
  const markdown = React.useMemo(() => htmlToMarkdown(html), [])

  console.log(markdown)
  const onChange = React.useCallback(
    throttle(async (markdown) => {
      void markdown
      // const html = await markdownToHtml(markdown)
      // console.log(html)
    }, 500),
    [],
  )

  return (
    <MDXEditor
      markdown={markdown}
      onChange={onChange}
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
                <InsertImage />
                <CreateLink />
                <Separator />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
        linkPlugin(),
        listsPlugin(),
        headingsPlugin(),
        diffSourcePlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        quotePlugin(),
        directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor] }),
      ]}
    />
  )
}

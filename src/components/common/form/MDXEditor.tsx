import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { DirectiveDescriptor, directivesPlugin } from '@mdxeditor/editor/plugins/directives'
import { imagePlugin } from '@mdxeditor/editor/plugins/image'
import { linkPlugin } from '@mdxeditor/editor/plugins/link'
import { linkDialogPlugin } from '@mdxeditor/editor/plugins/link-dialog'
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { Separator } from '@mdxeditor/editor/plugins/toolbar/primitives/toolbar'
import '@mdxeditor/editor/style.css'
import TurndownService from 'turndown'

interface ModernEditorProps {
  html: string
}

const turndownService = new TurndownService()

turndownService.addRule('strikethrough', {
  filter: ['iframe'],
  replacement: function (_, node) {
    const youtubeSrc = (node as HTMLElement).getAttribute('src')
    if (!youtubeSrc) {
      throw new Error('Found an iframe without a src')
    }
    const youtubeId = new URL(youtubeSrc).pathname.split('/').at(-1)
    return `::youtube{#${youtubeId}}\n`
  },
})

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
  const markdown = turndownService.turndown(html)
  return (
    <MDXEditor
      markdown={markdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor] }),
      ]}
    />
  )
}

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import {
    BLOCKS,
    MARKS,
    Document as RichTextDocument,
} from "@contentful/rich-text-types"

type RichTextProps = {
    document: RichTextDocument | null
}

function ArticleRichText({ document }: RichTextProps) {
    if (!document) {
        return null
    }

    const Bold = ({ children }: { children: any }) => (
        <span className="bold">{children}</span>
    )

    const Text = ({ children }: { children: any }) => (
        <p className="align-center">{children}</p>
    )

    const options = {
        renderMark: {
            [MARKS.BOLD]: (text: any) => (
                <span className="font-black">{text}</span>
            ),
            [MARKS.ITALIC]: (text: any) => (
                <span className="italic">{text}</span>
            ),
            [MARKS.UNDERLINE]: (text: any) => (
                <span className="underline">{text}</span>
            ),
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
                <p className="max-w-[900px] py-2 text-xl">{children}</p>
            ),
            [BLOCKS.HEADING_1]: (node: any, children: any) => (
                <h1 className="py-2 text-2xl lg:text-5xl">{children}</h1>
            ),
            [BLOCKS.HEADING_2]: (node: any, children: any) => (
                <h2 className="py-2 text-xl lg:text-3xl">{children}</h2>
            ),
            [BLOCKS.HEADING_3]: (node: any, children: any) => (
                <h3 className="py-2 text-lg lg:text-2xl">{children}</h3>
            ),
        },
    }

    return <>{documentToReactComponents(document, options)}</>
}

export default ArticleRichText

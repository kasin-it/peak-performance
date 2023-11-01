import Link from "next/link"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import {
    BLOCKS,
    MARKS,
    Document as RichTextDocument,
} from "@contentful/rich-text-types"

type RichTextProps = {
    document: any
}

function ArticleRichText({ document }: RichTextProps) {
    if (!document) {
        return null
    }
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
                <p className="max-w-[900px] py-4 text-xl">{children}</p>
            ),
            [BLOCKS.HEADING_1]: (node: any, children: any) => (
                <h1 className="py-4 text-2xl lg:text-5xl">{children}</h1>
            ),
            [BLOCKS.HEADING_2]: (node: any, children: any) => (
                <h2 className="py-4 text-xl lg:text-3xl">{children}</h2>
            ),
            [BLOCKS.HEADING_3]: (node: any, children: any) => (
                <h3 className="py-4 text-lg lg:text-2xl">{children}</h3>
            ),
            [BLOCKS.UL_LIST]: (node: any, children: any) => (
                <ul className=" list-disc pl-10">{children}</ul>
            ),
            [BLOCKS.OL_LIST]: (node: any, children: any) => (
                <ol className="list-decimal gap-0 -space-y-3 pl-10">
                    {children}
                </ol>
            ),
            [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
                <li className="m-0 p-0">{children}</li>
            ),
        },
    }

    return <>{documentToReactComponents(document, options)}</>
}

export default ArticleRichText

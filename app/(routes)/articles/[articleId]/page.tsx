import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "contentful"

import ArticleRichText from "@/components/ArticlesSection/article-rich-text"
import CommentsSection from "@/components/CommentsSection/comments-section"

const accessToken = process.env.CONTENTFUL_ACCESS_KEY
const space = process.env.CONTENTFUL_SPACE_ID

const contentfulClient = createClient({
    accessToken: accessToken ? accessToken : "",
    space: space ? space : "",
})

export const revalidate = 600
export const dynamic = "force-static"

export async function generateStaticParams() {
    const res = await contentfulClient.getEntries({
        content_type: "article",
    })

    return res.items.map((item: any) => ({
        slug: item.fields.slug,
    }))
}

async function ArticlePage({ params }: { params: { articleId: string } }) {
    const res = await contentfulClient.getEntries({
        content_type: "article",
        "fields.slug": params.articleId,
    })

    if (!res.total) {
        return notFound()
    }

    const article = res.items[0]

    return (
        <section className="flex w-full justify-center pt-36">
            <article className="w-full max-w-[1500px] space-y-10 px-7">
                <article className="pb-10 text-left">
                    <h2 className="text-md font-light uppercase tracking-tighter">
                        {article.fields.subTitle?.toString()}
                    </h2>
                    <h1 className=" text-4xl font-medium uppercase tracking-tighter text-black/80 md:text-7xl">
                        {article.fields.title?.toString()}
                    </h1>
                    <p className=" text-lg text-muted-foreground">
                        {article.fields.shortDesc?.toString()}
                    </p>
                    <Link
                        className="group relative bottom-0 flex max-w-[185px] flex-col pt-5"
                        href={`#comments`}
                    >
                        <p className="text-xl font-medium tracking-wider">
                            GO TO COMMENTS
                        </p>
                        <div className=" absolute bottom-0 left-0 h-1 w-full origin-left scale-x-[.23] transform bg-orange-500 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                </article>
                <Image
                    // @ts-expect-error
                    src={"http:" + article.fields?.mainImage!.fields?.file.url}
                    width={690}
                    height={0}
                    alt={"dsf"}
                    className="w-full max-w-full object-cover "
                    loading="eager"
                    style={{ height: "auto" }}
                    priority={true}
                />
                <main className=" text-black/80">
                    <ArticleRichText document={article.fields.content} />
                </main>

                <CommentsSection articleId={params.articleId} />
            </article>
        </section>
    )
}
export default ArticlePage

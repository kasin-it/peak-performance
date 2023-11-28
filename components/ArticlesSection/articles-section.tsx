import { createClient } from "contentful"

import ArticlePreview from "./article-prewiew"

async function ArticlesSection() {
    const accessToken = process.env.CONTENTFUL_ACCESS_KEY
    const space = process.env.CONTENTFUL_SPACE_ID

    const contentfulClient = createClient({
        accessToken: accessToken ? accessToken : "",
        space: space ? space : "",
    })

    const res = await contentfulClient.getEntries({
        content_type: "article",
        "fields.featured": "yes",
    })

    return (
        <section className="flex w-full flex-col items-center py-16">
            <p className="w-full max-w-[1500px] px-10 pb-10 text-center text-7xl font-black text-blue-500/50 2xl:text-left">
                NEWS
            </p>
            <div className="grid max-w-[1500px] grid-cols-1 2xl:grid-cols-2 2xl:gap-x-0">
                {res.items.map((article, index) => (
                    <ArticlePreview article={article} key={index} />
                ))}
            </div>
        </section>
    )
}
export default ArticlesSection

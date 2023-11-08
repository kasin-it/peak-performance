import { createClient } from "contentful"

async function articles() {
    const accessToken = process.env.CONTENTFUL_ACCESS_KEY
    const space = process.env.CONTENTFUL_SPACE_ID

    const contentfulClient = createClient({
        accessToken: accessToken ? accessToken : "",
        space: space ? space : "",
    })

    const res = await contentfulClient.getEntries({
        content_type: "article",
    })

    return <div>articles</div>
}
export default articles

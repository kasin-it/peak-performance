function ArticleNotFound({ articleId }: { articleId: string }) {
    return (
        <section className="flex h-full w-full items-center justify-center">
            <h1>ARTICLE NOT FOUND</h1>
            <p>Article with id {articleId} does not exist.</p>
        </section>
    )
}
export default ArticleNotFound

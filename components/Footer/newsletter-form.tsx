import NewsletterBar from "../ui/newsletter-bar"

function NewsletterForm() {
    return (
        <article className="max-w-[300px] space-y-5">
            <h1 className="flex text-2xl font-black italic text-blue-500">
                GET THE LATEST NEWS SENT RIGHT TO YOUR INBOX
            </h1>
            <NewsletterBar />
        </article>
    )
}
export default NewsletterForm

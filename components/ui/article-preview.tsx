import { Button } from "./button"

function ArticlePreview() {
    return (
        <div className="mx-auto flex max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
            <img
                alt="Article cover image"
                className="h-64 w-full object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                    aspectRatio: "400/200",
                    objectFit: "cover",
                }}
                width="400"
            />
            <div className="space-y-2 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    The Art of Minimalism
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Discover the beauty in simplicity through our exploration of
                    minimalism in art, design, and life.
                </p>
                <div className="mt-2 flex flex-wrap">
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                        #minimalism
                    </span>
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                        #art
                    </span>
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                        #design
                    </span>
                </div>
                <Button className="mt-4" variant="outline">
                    Read More
                </Button>
            </div>
        </div>
    )
}
export default ArticlePreview

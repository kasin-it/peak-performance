import dynamic from "next/dynamic"

const DynamicArticlesSection = dynamic(
    () =>
        import("@/components/ArticlesSection/articles-section").then(
            (mod) => mod.default
        ),
    {
        ssr: false,
    }
)

const DynamicHero = dynamic(
    () => import("@/components/Hero/hero").then((mod) => mod.default),
    {
        ssr: false,
    }
)

const DynamicSearchSection = dynamic(
    () =>
        import("@/components/SearchSection/search-section").then(
            (mod) => mod.default
        ),
    {
        ssr: false,
    }
)

function HomePage() {
    return (
        <>
            <DynamicHero />
            <DynamicSearchSection />
            <DynamicArticlesSection />
        </>
    )
}
export default HomePage

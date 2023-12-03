import dynamic from "next/dynamic"

// import ArticlesSection from "@/components/ArticlesSection/articles-section"
// import Hero from "@/components/Hero/hero"
// import SearchSection from "@/components/SearchSection/search-section"

const DynamicArticlesSection = dynamic(
    () =>
        import("@/components/ArticlesSection/articles-section").then(
            (mod) => mod.default
        ),
    {
        ssr: true,
    }
)

const DynamicHero = dynamic(
    () => import("@/components/Hero/hero").then((mod) => mod.default),
    {
        ssr: true,
    }
)

const DynamicSearchSection = dynamic(
    () =>
        import("@/components/SearchSection/search-section").then(
            (mod) => mod.default
        ),
    {
        ssr: true,
    }
)

function HomePage() {
    return (
        <>
            <DynamicHero />
            <DynamicSearchSection />
            <DynamicArticlesSection />
            {/* <Hero />
            <SearchSection />
            <ArticlesSection /> */}
        </>
    )
}
export default HomePage

import Footer from "@/components/Footer/footer"
import Navbar from "@/components/Navbar/navbar"

function RoutesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
export default RoutesLayout

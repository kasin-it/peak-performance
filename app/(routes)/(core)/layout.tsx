import Navbar from '@/components/Navbar/navbar';

function RoutesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
export default RoutesLayout;

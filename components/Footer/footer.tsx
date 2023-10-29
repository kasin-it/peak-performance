import Link from "next/link"
import { Facebook, Twitter } from "lucide-react"

import NewsletterForm from "./newsletter-form"

function Footer() {
    return (
        <>
            <footer className="flex w-full flex-col items-center justify-center space-y-10 border-y py-10">
                <section className=" flex w-full max-w-[1400px] flex-wrap items-start justify-center gap-x-10 gap-y-6 px-10 md:justify-between xl:space-y-0">
                    <NewsletterForm />
                    <div className="flex w-[200px] flex-col space-y-3">
                        <h2 className="font-black italic text-blue-500">
                            <span className="text-orange-500">PEAK</span>
                            PERFORMANCE
                        </h2>
                        <ul className="flex flex-col">
                            <li>
                                <Link
                                    href={"/"}
                                    className="text-muted-foreground hover:underline"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/"}
                                    className="text-muted-foreground hover:underline"
                                >
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/"}
                                    className="text-muted-foreground hover:underline"
                                >
                                    Forum
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/"}
                                    className="text-muted-foreground hover:underline"
                                ></Link>
                            </li>
                            <li>
                                <Link
                                    href={"/"}
                                    className="text-muted-foreground hover:underline"
                                >
                                    Workouts
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex w-[200px] flex-col space-y-3">
                        <h2 className="font-semibold text-blue-500">Account</h2>
                        <ul className="flex flex-col">
                            <li>
                                <Link
                                    href={"/"}
                                    className="text-muted-foreground hover:underline"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/"}
                                    className="text-muted-foreground hover:underline"
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex w-[200px] flex-col space-y-3">
                        <h2 className="font-semibold text-blue-500">
                            Need Help
                        </h2>
                        <ul className="flex flex-col">
                            <li>
                                <Link
                                    href={"/"}
                                    className="text-muted-foreground hover:underline"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/"}
                                    className="text-muted-foreground hover:underline"
                                >
                                    Email Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </footer>
            <section className="flex w-full justify-center p-6">
                <article className="flex w-full max-w-[1400px] items-center justify-between px-10">
                    <p className="text-blue-500">
                        © 2023,{" "}
                        <span className="font-black italic">
                            <span className="text-orange-500">PEAK</span>
                            PERFORMANCE
                        </span>
                    </p>

                    <div className="flex space-x-4 text-muted-foreground">
                        <Link href={"/"} className="hover:text-blue-500">
                            <Facebook className="h-6 w-6" strokeWidth={"1px"} />
                        </Link>
                        <Link href={"/"} className="hover:text-blue-500">
                            <Twitter className="h-6 w-6" strokeWidth={"1px"} />
                        </Link>
                    </div>
                </article>
            </section>
        </>
    )
}
export default Footer

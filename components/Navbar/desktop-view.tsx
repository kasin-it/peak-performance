import Link from "next/link"

import SearchBar from "../ui/search-bar"
import AccountSection from "./account-section"
import SearchSheet from "./search-sheet"

function DesktopView() {
    return (
        <div className="hidden w-full max-w-[1920px] items-center justify-between px-10 lg:flex">
            <div className="flex space-x-10">
                <Link
                    href={"/"}
                    className="text-2xl font-black italic text-orange-500"
                >
                    PEAK<span className="text-blue-500">PERFORMANCE</span>
                </Link>
                <ul className="flex items-center space-x-8 text-xl font-extrabold italic text-blue-300">
                    {/* <li>SHOP</li> */}
                    <li>
                        <Link
                            href={"/user/training-plan/"}
                            className="border-orange-500 hover:border-b-[3px] hover:text-blue-500"
                        >
                            MY TRAINING
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/articles"}
                            className="border-orange-500 hover:border-b-[3px] hover:text-blue-500"
                        >
                            ARTICLES
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/exercises"}
                            className="border-orange-500 hover:border-b-[3px] hover:text-blue-500"
                        >
                            EXERCISES
                        </Link>
                    </li>
                    {/* <li>
                        <Link
                            href={"/forum"}
                            className="border-orange-500 hover:border-b-[3px] hover:text-blue-500"
                        >
                            FORUM
                        </Link>
                    </li> */}
                </ul>
            </div>
            <div className="flex items-center space-x-2">
                <div className="hidden xl:block">
                    <SearchBar className="w-[400px]" />
                </div>
                <div className="xl:hidden">
                    <SearchSheet />
                </div>
                <AccountSection />
            </div>
        </div>
    )
}
export default DesktopView

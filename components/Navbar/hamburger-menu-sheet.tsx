"use client"

import Link from "next/link"
import { ChevronRight, Menu } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import SearchBar from "../ui/search-bar"

function HamburgerMenuSheet() {
    return (
        <Sheet>
            <SheetTrigger className="bg-transparent text-blue-300 hover:bg-transparent hover:text-blue-500">
                <Menu className="h-8 w-8" strokeWidth={"3px"} />
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SearchBar className={"mt-16 w-full"} />
                <ul className="mt-10 flex flex-col items-center text-left text-xl font-extrabold italic text-blue-300">
                    {/* <li>SHOP</li> */}
                    <li className="w-full border-y border-blue-500 pl-10">
                        <Link
                            href={"/user/training-plan"}
                            className=" flex h-full w-full justify-between py-5 hover:text-blue-500"
                        >
                            <p>MY TRAINING</p>
                            <ChevronRight />
                        </Link>
                    </li>
                    <li className="w-full border-b border-blue-500 pl-10">
                        <Link
                            href={"/articles"}
                            className=" flex h-full w-full justify-between py-5 hover:text-blue-500"
                        >
                            <p>ARTICLES</p>
                            <ChevronRight />
                        </Link>
                    </li>
                    <li className="w-full border-b border-blue-500 pl-10">
                        <Link
                            href={"/exercises"}
                            className=" flex h-full w-full justify-between py-5 hover:text-blue-500"
                        >
                            <p>EXERCISES</p>
                            <ChevronRight />
                        </Link>
                    </li>
                    {/* <li className="w-full border-b border-blue-500 pl-10">
                        <Link
                            href={"/forum"}
                            className=" flex h-full w-full justify-between py-5 hover:text-blue-500"
                        >
                            <p>FORUM</p>
                            <ChevronRight />
                        </Link>
                    </li> */}
                </ul>
            </SheetContent>
        </Sheet>
    )
}
export default HamburgerMenuSheet

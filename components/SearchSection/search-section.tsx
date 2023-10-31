import Image from "next/image"
import Link from "next/link"
import abs_image from "@/public/body-part-abs.png"
import arms_image from "@/public/body-part-arms.png"
import back_image from "@/public/body-part-back.png"
import chest_image from "@/public/body-part-chest.png"
import full_body_image from "@/public/body-part-full-body.png"
import legs_image from "@/public/body-part-legs.png"
import shoulders_image from "@/public/body-part-shoulders.png"

import { Button } from "../ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Separator } from "../ui/separator"

function SearchSection() {
    const routes = [
        {
            img: abs_image,
            label: "ABS",
        },
        {
            img: arms_image,
            label: "ARMS",
        },
        {
            img: legs_image,
            label: "LEGS",
        },
        {
            img: back_image,
            label: "BACK",
        },
        {
            img: shoulders_image,
            label: "SHOULDERS",
        },
        {
            img: chest_image,
            label: "CHEST",
        },
        {
            img: full_body_image,
            label: "FULL-BODY",
        },
    ]

    return (
        <section className="flex w-full items-center justify-center bg-blue-50 py-20">
            <article
                className={
                    "flex w-full max-w-[1500px] flex-col space-y-4 px-10 text-center md:text-left"
                }
            >
                <h1 className="text-7xl font-black text-blue-500">
                    WORKOUT ROUTINES
                </h1>

                <section className="flex flex-wrap items-center justify-around space-x-4 space-y-4 pb-6">
                    {routes.map((route, index) => (
                        <Link
                            href={`/workouts/${route.label.toLowerCase()}`}
                            className="group flex flex-col items-center justify-center space-y-4"
                            key={index}
                        >
                            <Image
                                src={route.img.src}
                                // width={route.img.width}
                                // height={route.img.height}
                                width={150}
                                height={150}
                                alt={route.label}
                                className="group rounded-full border-2 border-blue-300 transition duration-200 group-hover:border-[5px] group-hover:border-orange-500 "
                            />
                            <h1 className="group border-b-[3px] border-blue-300 text-xl font-medium text-blue-500 transition duration-200 group-hover:border-orange-300 group-hover:text-orange-500">
                                {route.label}
                            </h1>
                        </Link>
                    ))}
                </section>
                <Separator className="bg-blue-300" />
                <form className="justify-left flex w-full flex-col flex-wrap items-center space-y-5 py-6 lg:flex-row lg:space-x-5 lg:space-y-0">
                    <Select>
                        <SelectTrigger className="sm:w-[500px] lg:w-[280px]">
                            <SelectValue placeholder="Skill Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="advenced">Advenced</SelectItem>
                            <SelectItem value="intermediate">
                                Intermediate
                            </SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="sm:w-[500px] lg:w-[380px]">
                            <SelectValue placeholder="Exercise Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="bodyweight">
                                Bodyweight
                            </SelectItem>
                            <SelectItem value="power">Power</SelectItem>
                            <SelectItem value="strength-training">
                                Strength Training
                            </SelectItem>
                            <SelectItem value="Cardio">Cardio</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="px-16" variant={"secondary"}>
                        SEARCH
                    </Button>
                    <Link
                        href={"/workouts/all"}
                        className="text-muted-foreground underline hover:cursor-pointer hover:text-blue-500"
                    >
                        View All Exercises
                    </Link>
                </form>
            </article>
        </section>
    )
}
export default SearchSection

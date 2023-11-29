import Image from "next/image"
import Link from "next/link"
import hero_img from "@/public/hero.webp"

import { Button } from "../ui/button"

function Hero() {
    return (
        <section className="flex min-h-full w-full items-start justify-start bg-white pb-16 pt-28 text-blue-500 xl:items-center xl:justify-center xl:pt-16">
            <article className="flex h-auto w-full max-w-[1500px] flex-col-reverse items-center justify-start px-10 xl:flex-row xl:justify-between">
                <article className="flex-shrink flex-col space-y-5">
                    <h1 className="text-left text-4xl font-black italic sm:text-5xl md:text-6xl">
                        WELCOME TO <br />
                        <span className="text-orange-500">PEAK</span>
                        PERFORMANCE!
                    </h1>
                    <p className="max-w-[500px] text-muted-foreground">
                        Explore our fitness haven for a variety of workout
                        routines to all levels. Delve into insightful articles
                        offering expert guidance on nutrition and training.
                        Connect with a passionate fitness community in our
                        interactive forum. Start your journey to a healthier,
                        stronger you with us today!
                    </p>
                    <div>
                        <Link href={"/workouts"}>
                            <Button
                                variant={"secondary"}
                                className="p-7 text-xl font-black italic"
                            >
                                GET YOUR TRAINING
                            </Button>
                        </Link>
                    </div>
                </article>

                <Image
                    src={hero_img}
                    width={hero_img.width / 2}
                    height={hero_img.height / 2}
                    alt="hero image"
                    priority={true}
                    loading="eager"
                />
            </article>
        </section>
    )
}
export default Hero

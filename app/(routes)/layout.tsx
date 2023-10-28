import type { Metadata } from 'next'
import {  Roboto_Condensed  } from 'next/font/google'
import "@/app/globals.css"

const font = Roboto_Condensed( { subsets: ["latin"]})

export const metadata: Metadata = {
  title: 'Peak Performance',
  description: 'Peak Performance is your go-to destination for an array of expertly crafted training plans. Whether you are a seasoned athlete or just starting your fitness journey, our website offers customized plans to help you reach your peak potential. With a user-friendly interface and a wealth of data-driven resources, we are here to inspire and guide you on your path to success.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}

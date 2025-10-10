"use client"

import Carousel from "@/components/ui/carousel"
import img1 from "../../assets/adoptbanner.jpg"
import img2 from "../../assets/photo-1579370318443-8da816457e3d.jpeg"
import img3 from "../../assets/temple-of-books-6.jpg"
import img4 from "../../assets/tri-de-motion-books-shelves-prev1.jpg"

export default function CarouselDemo() {
    const slideData = [
        { title: "Featured", button: "Explore Book Vaults from other users", src: img1 },
        { title: "Featured", button: "Explore Book Vaults from other users", src: img2 },
        { title: "Featured", button: "Explore Book Vaults from other users", src: img3 },
        { title: "Featured", button: "Explore Book Vaults from other users", src: img4 },
    ]

    return (
        <div className="relative overflow-hidden w-full h-full py-12">
            <Carousel slides={slideData} />
        </div>
    )
}



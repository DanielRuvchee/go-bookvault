"use client"

import { useState, useEffect, useRef } from "react"

export default function Carousel({ slides = [], autoPlayMs = 5000 }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const timerRef = useRef(null)

    const total = slides.length

    const goTo = (index) => {
        if (total === 0) return
        const next = (index + total) % total
        setCurrentIndex(next)
    }

    const next = () => goTo(currentIndex + 1)
    const prev = () => goTo(currentIndex - 1)

    useEffect(() => {
        if (!autoPlayMs || total <= 1) return
        timerRef.current && clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setCurrentIndex((i) => (i + 1) % total)
        }, autoPlayMs)
        return () => timerRef.current && clearInterval(timerRef.current)
    }, [autoPlayMs, total])

    if (total === 0) return null

    return (
        <div className="relative w-full max-w-6xl mx-auto select-none">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black/10">
                <div
                    className="flex h-full w-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((s, idx) => (
                        <div key={idx} className="relative shrink-0 grow-0 basis-full h-full">
                            {typeof s.src === "string" ? (
                                <img
                                    src={s.src}
                                    alt={s.title || `Slide ${idx + 1}`}
                                    className="h-full w-full object-cover"
                                    draggable={false}
                                />
                            ) : (
                                (() => {
                                    const moduleLike = s.src
                                    const resolved = moduleLike?.src || moduleLike?.default || null
                                    if (!resolved) return null
                                    return (
                                        <img
                                            src={typeof resolved === "string" ? resolved : resolved.src}
                                            alt={s.title || `Slide ${idx + 1}`}
                                            className="h-full w-full object-cover"
                                            draggable={false}
                                        />
                                    )
                                })()
                            )}
                            {(s.title || s.button) && (
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 text-white">
                                    {s.title && <h3 className="text-xl font-semibold">{s.title}</h3>}
                                    {s.button && (
                                        <button className="mt-2 inline-flex items-center rounded-md bg-white/90 px-4 py-2 text-sm font-medium text-black hover:bg-white">
                                            {s.button}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {total > 1 && (
                    <>
                        <button
                            onClick={prev}
                            aria-label="Previous slide"
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
                        >
                            ‹
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next slide"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
                        >
                            ›
                        </button>
                        <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`h-2 w-2 rounded-full ${i === currentIndex ? "bg-white" : "bg-white/50"}`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}



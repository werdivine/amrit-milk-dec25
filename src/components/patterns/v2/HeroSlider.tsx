"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        title: "Vedic Bilona Ghee",
        subtitle: "20,000+ Jars Dispatched",
        description: "Churned from curd using the ancient Bilona method. 100% Pure, A2, and lab-tested for perfection.",
        image: "/assets/img/ghee-jar.png",
        cta: "Buy Now",
        link: "/products/a2-bilona-ghee"
    },
    {
        id: 2,
        title: "Pure A2 Milk & Desi Food Products",
        subtitle: "From Our Own Farm — Trusted by Families for 12+ Years",
        description: "Daily milk delivery, bilona ghee, cold-pressed oils & natural foods — made for children, families, and conscious living.",
        image: "/assets/img/hero-luxe-bg.png",
        cta: "Order for Your Family",
        link: "/products",
        secondaryCta: "Know Our Farm & Process",
        secondaryLink: "/the-farm"
    },
    {
        id: 3,
        title: "Wild Forest Honey",
        subtitle: "Nectar of the Wild",
        description: "Raw, Unfiltered, and Sourced from the deep forests by tribal communities. Pure healing in every drop.",
        image: "/assets/img/honey-jar.png",
        cta: "Taste Purity",
        link: "/products?category=honey"
    }
];

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-[90vh] md:h-[100vh] overflow-hidden bg-creme dark:bg-midnight -mt-20">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 z-10" />
                    {/* Placeholder for actual background image treatment - using a gradient for 2nd slide if image is small product shot */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear scale-105"
                        style={{
                            backgroundImage: `url('${slide.image}')`,
                            transform: index === currentSlide ? 'scale(1.1)' : 'scale(1.0)'
                        }}
                    >
                        {/* Fallback gradient for slide 2 if it's just a product image */}
                        {slide.id === 2 && <div className="absolute inset-0 bg-gradient-to-r from-terracotta/80 to-espresso/80 mix-blend-multiply" />}
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 pt-20">
                        <div className="max-w-4xl space-y-6 md:space-y-8 animate-fade-in-up">
                            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                                {slide.subtitle}
                            </span>
                            <h1 className="font-serif text-5xl md:text-8xl font-black leading-tight text-white drop-shadow-2xl">
                                {slide.title}
                            </h1>
                            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                                {slide.description}
                            </p>
                            <div className="pt-4 flex flex-wrap justify-center gap-4">
                                <Button
                                    href={slide.link}
                                    size="lg"
                                    className="bg-terracotta text-white hover:bg-espresso border-2 border-transparent hover:border-white transition-all duration-300 text-lg px-10 py-6 h-auto"
                                >
                                    {slide.cta} <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                {(slide as any).secondaryCta && (
                                    <Button
                                        href={(slide as any).secondaryLink}
                                        size="lg"
                                        variant="outline"
                                        className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-espresso transition-all duration-300 text-lg px-10 py-6 h-auto"
                                    >
                                        {(slide as any).secondaryCta}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hidden md:block"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hidden md:block"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-terracotta w-8" : "bg-white/50 hover:bg-white"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}

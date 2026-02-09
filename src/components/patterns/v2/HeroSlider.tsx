"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        title: "Vedic Bilona Ghee",
        subtitle: "20,000+ Jars of Purity",
        description:
            "Churned from curd using the ancient Bilona method. A sacred ritual of health for your family.",
        image: "/assets/img/products/a2desicowgheeglassjarbilonamethod.png",
        cta: "Bring Home Purity",
        link: "/products/a2-cow-ghee-1kg",
    },
    {
        id: 2,
        title: "The Heart of Lonapur",
        subtitle: "12+ Years of Trusted Farming",
        description:
            "Pure A2 Milk, Bilona Ghee, and Organic Grains — crafted with love for the children of the Amrit Family.",
        image: "/assets/img/products/amrit_milk_gir_1l_v2.png",
        cta: "Gift Your Family Health",
        link: "/products",
        secondaryCta: "BEHOLD THE FARM",
        secondaryLink: "/the-farm",
    },
    {
        id: 3,
        title: "Wild Forest Honey",
        subtitle: "Nature's Purest Healing",
        description:
            "Raw and Unfiltered. Sourced from deep forests to bring nature's ancient medicine to your table.",
        image: "/assets/img/products/amrit_honey_premium_v7.png",
        cta: "Discover the Magic",
        link: "/products?category=honey",
    },
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

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <section className="relative w-full h-[90vh] md:h-[100vh] overflow-hidden bg-creme dark:bg-midnight -mt-20">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentSlide}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            nextSlide();
                        } else if (swipe > swipeConfidenceThreshold) {
                            prevSlide();
                        }
                    }}
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 z-10" />

                    {/* 1. Background Layer */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                        style={{
                            backgroundImage: `url('${slides[currentSlide].id === 2 ? '/assets/img/hero-luxe-bg.png' : slides[currentSlide].image}')`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
                    </div>

                    {/* 2. Product Overlay (Milk Slide Only - Positioned to Right on Desktop, Bottom on Mobile) */}
                    {slides[currentSlide].id === 2 && (
                        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                            <motion.img
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="absolute -bottom-10 -right-20 md:right-10 md:bottom-[-5%] h-[60vh] md:h-[85vh] w-auto object-contain drop-shadow-2xl opacity-90 rotate-[-5deg]"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 pt-20">
                        <div className="max-w-4xl space-y-6 md:space-y-8">
                            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                                {slides[currentSlide].subtitle}
                            </span>
                            <h1 className="font-serif text-5xl md:text-8xl font-black leading-tight text-white drop-shadow-2xl">
                                {slides[currentSlide].title}
                            </h1>
                            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                                {slides[currentSlide].description}
                            </p>
                            <div className="pt-4 flex flex-wrap justify-center gap-4">
                                <Button
                                    href={slides[currentSlide].link}
                                    size="lg"
                                    className="bg-terracotta text-white hover:bg-espresso border-2 border-transparent hover:border-white transition-all duration-300 text-lg px-10 py-6 h-auto cursor-pointer"
                                >
                                    {slides[currentSlide].cta}{" "}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                {(slides[currentSlide] as any).secondaryCta && (
                                    <Button
                                        href={(slides[currentSlide] as any).secondaryLink}
                                        size="lg"
                                        variant="outline"
                                        className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-espresso transition-all duration-300 text-lg px-10 py-6 h-auto cursor-pointer"
                                    >
                                        {(slides[currentSlide] as any).secondaryCta}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls - Visible on Mobile now */}
            <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                            ? "bg-terracotta w-8"
                            : "bg-white/50 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronRight, Award, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";

const questions = [
    {
        id: 1,
        question: "What's your primary health goal?",
        options: [
            { text: "Better digestion", value: "digestion", points: { a2milk: 10, curd: 8, ghee: 6 } },
            { text: "Build muscle/strength", value: "muscle", points: { a2milk: 10, paneer: 9, ghee: 7 } },
            { text: "Weight management", value: "weight", points: { ghee: 10, a2milk: 8, honey: 7 } },
            { text: "Boost immunity", value: "immunity", points: { a2milk: 10, ghee: 9, honey: 8 } }
        ]
    },
    {
        id: 2,
        question: "Do you have any digestive sensitivities?",
        options: [
            { text: "Lactose intolerant", value: "lactose", points: { ghee: 10, a2milk: 6 } },
            { text: "Bloating with regular milk", value: "bloating", points: { a2milk: 10, curd: 8 } },
            { text: "No issues", value: "none", points: { a2milk: 10, paneer: 8, curd: 8 } },
            { text: "Sensitive stomach", value: "sensitive", points: { ghee: 9, a2milk: 8, curd: 7 } }
        ]
    },
    {
        id: 3,
        question: "What's your lifestyle like?",
        options: [
            { text: "Very active / Athletic", value: "athletic", points: { a2milk: 10, paneer: 9, ghee: 8 } },
            { text: "Sedentary / Desk job", value: "sedentary", points: { ghee: 8, honey: 7, a2milk: 6 } },
            { text: "Moderate activity", value: "moderate", points: { a2milk: 9, curd: 8, ghee: 7 } },
            { text: "High stress", value: "stress", points: { ghee: 10, a2milk: 8, honey: 7 } }
        ]
    },
    {
        id: 4,
        question: "What time of day do you prefer dairy?",
        options: [
            { text: "Morning (breakfast)", value: "morning", points: { a2milk: 10, ghee: 8, curd: 6 } },
            { text: "Evening (dinner)", value: "evening", points: { curd: 9, a2milk: 8, paneer: 7 } },
            { text: "Before bed", value: "night", points: { a2milk: 10, ghee: 9 } },
            { text: "All day", value: "allday", points: { a2milk: 10, ghee: 9, curd: 8 } }
        ]
    },
    {
        id: 5,
        question: "What's most important to you?",
        options: [
            { text: "Taste & tradition", value: "taste", points: { ghee: 10, a2milk: 9, paneer: 7 } },
            { text: "Protein content", value: "protein", points: { paneer: 10, a2milk: 9, curd: 7 } },
            { text: "Easy digestion", value: "digest", points: { a2milk: 10, curd: 9, ghee: 8 } },
            { text: "Ayurvedic benefits", value: "ayurveda", points: { ghee: 10, a2milk: 9, honey: 8 } }
        ]
    }
];

const productRecommendations: any = {
    a2milk: {
        name: "A2 Gir Cow Milk",
        image: "/assets/img/milk-bottle.png",
        slug: "a2-milk-500ml",
        tagline: "Perfect for daily nutrition and gut health",
        benefits: ["Easier to digest", "Rich in Omega-3", "Boosts immunity", "No A1 protein inflammation"]
    },
    ghee: {
        name: "Vedic Bilona Ghee",
        image: "/assets/img/ghee-jar.png",
        slug: "vedic-ghee-500ml",
        tagline: "Ancient wisdom in every spoonful",
        benefits: ["Improves memory", "Lubricates joints", "High-heat cooking", "Builds Ojas (vitality)"]
    },
    curd: {
        name: "A2 Curd (Dahi)",
        image: "/assets/img/paneer.png",
        slug: "a2-curd-500ml",
        tagline: "Live probiotics for gut health",
        benefits: ["Natural probiotics", "Cools the body", "Improves digestion", "Rich in protein"]
    },
    paneer: {
        name: "Malai Paneer",
        image: "/assets/img/paneer.png",
        slug: "malai-paneer-200g",
        tagline: "High-protein vegetarian superfood",
        benefits: ["20g protein per 100g", "Builds muscle", "Strengthens bones", "Versatile cooking"]
    },
    honey: {
        name: "Raw Forest Honey",
        image: "/assets/img/honey-jar.png",
        slug: "forest-honey-500g",
        tagline: "Nature's healing elixir",
        benefits: ["Natural antimicrobial", "Soothes throat", "Boosts energy", "Rich in antioxidants"]
    }
};

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (optionValue: string, points: any) => {
        const newAnswers = { ...answers };
        newAnswers[currentQuestion] = { value: optionValue, points };
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
        } else {
            setTimeout(() => setShowResults(true), 300);
        }
    };

    const calculateResults = () => {
        const scores: any = {};

        Object.values(answers).forEach((answer: any) => {
            Object.entries(answer.points).forEach(([product, points]) => {
                scores[product] = (scores[product] || 0) + points;
            });
        });

        const sorted = Object.entries(scores)
            .sort((a: any, b: any) => b[1] - a[1])
            .slice(0, 3);

        return sorted.map(([product]) => product);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
    };

    if (showResults) {
        const topProducts = calculateResults();
        const topProduct = topProducts[0];
        const recommendation = productRecommendations[topProduct];

        return (
            <main className="bg-midnight min-h-screen">
                <Section>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="w-20 h-20 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <Sparkles className="w-10 h-10 text-gold" />
                        </div>

                        <h1 className="text-4xl md:tekst-5xl font-serif font-bold mb-4">
                            Your Perfect Match!
                        </h1>
                        <p className="text-xl text-ivory/70 mb-12">
                            Based on your answers, here's what we recommend:
                        </p>

                        {/* Top Recommendation */}
                        <div className="bg-gradient-to-br from-gold/20 to-gold/5 border-2 border-gold rounded-3xl p-12 mb-8 animate-fade-in-up">
                            <span className="inline-block px-4 py-2 bg-gold text-midnight text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                                #1 Recommendation
                            </span>

                            <div className="w-48 h-48 mx-auto mb-8">
                                <img
                                    src={recommendation.image}
                                    alt={recommendation.name}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>

                            <h2 className="text-3xl font-serif font-bold mb-3">{recommendation.name}</h2>
                            <p className="text-xl text-ivory/80 italic mb-8">{recommendation.tagline}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {recommendation.benefits.map((benefit: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 bg-midnight/40 rounded-xl p-4">
                                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                                        <span className="text-sm text-left">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <Button href={`/products/${recommendation.slug}`} size="lg" icon>
                                View Product
                            </Button>
                        </div>

                        {/* Other Recommendations */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-serif font-bold mb-6">Also Great For You:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {topProducts.slice(1, 3).map((productKey: string) => {
                                    const prod = productRecommendations[productKey];
                                    return (
                                        <Link
                                            key={productKey}
                                            href={`/products/${prod.slug}`}
                                            className="bg-glass-bg border border-glass-border rounded-2xl p-6 hover:border-gold/30 transition-all group"
                                        >
                                            <img src={prod.image} alt={prod.name} className="w-32 h-32 mx-auto mb-4 object-contain group-hover:scale-110 transition-transform" />
                                            <h4 className="font-bold mb-2">{prod.name}</h4>
                                            <p className="text-sm text-ivory/60">{prod.tagline}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={restartQuiz} variant="outline">
                                Retake Quiz
                            </Button>
                            <Button href="/products" icon>
                                Browse All Products
                            </Button>
                        </div>
                    </div>
                </Section>
            </main>
        );
    }

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <main className="bg-midnight min-h-screen">
            <Section>
                <div className="max-w-3xl mx-auto">
                    {/* Progress Bar */}
                    <div className="mb-12">
                        <div className="flex justify-between text-sm text-ivory/60 mb-2">
                            <span>Question {currentQuestion + 1} of {questions.length}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-midnight-mid rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-gold to-gold/60 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="text-center mb-12 animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            {question.question}
                        </h2>
                        <p className="text-ivory/60">Choose the option that best describes you</p>
                    </div>

                    {/* Options */}
                    <div className="grid gap-4">
                        {question.options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(option.value, option.points)}
                                className="group bg-glass-bg border border-glass-border rounded-2xl p-6 text-left hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-medium pr-4">{option.text}</span>
                                    <ChevronRight className="w-6 h-6 text-gold opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Back Button */}
                    {currentQuestion > 0 && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                className="text-ivory/60 hover:text-gold transition-colors text-sm"
                            >
                                ← Back to previous question
                            </button>
                        </div>
                    )}
                </div>
            </Section>
        </main>
    );
}

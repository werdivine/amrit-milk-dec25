import React from 'react';
import { Section } from '@/components/ui/section';
import RichTextParser from './RichTextParser';
import { Button } from '@/components/ui/button';

const HeroBlock = ({ headline, subheadline, backgroundImage, ctaText, ctaLink }: any) => {
    return (
        <section className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {backgroundImage?.url ? (
                    <img src={backgroundImage.url} alt={backgroundImage.alt} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-midnight" />
                )}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10 max-w-4xl space-y-6">
                <h1 className="font-serif text-5xl md:text-7xl font-bold text-ivory drop-shadow-xl">
                    {headline}
                </h1>
                {subheadline && (
                    <p className="text-xl md:text-2xl text-ivory/90 font-light max-w-2xl mx-auto">
                        {subheadline}
                    </p>
                )}
                {ctaText && ctaLink && (
                    <div className="pt-8">
                        <Button href={ctaLink} size="lg" className="bg-gold text-midnight hover:bg-white">
                            {ctaText}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

const ContentBlock = ({ content, alignment }: any) => {
    return (
        <Section className={`bg-creme dark:bg-midnight ${alignment === 'center' ? 'text-center' : ''} ${alignment === 'right' ? 'text-right' : ''}`}>
            <div className="max-w-4xl mx-auto">
                <RichTextParser content={content} className="prose dark:prose-invert max-w-none" />
            </div>
        </Section>
    );
};

export const RenderBlocks = ({ layout }: { layout: any[] }) => {
    if (!layout) return null;

    return (
        <div>
            {layout.map((block, i) => {
                const BlockType = block.blockType;

                switch (BlockType) {
                    case 'hero':
                        return <HeroBlock key={i} {...block} />;
                    case 'content':
                        return <ContentBlock key={i} {...block} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};


interface JsonLdProps {
    data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * JSON-LD structured data component for Schema.org markup
 * Renders structured data as a script tag for SEO rich snippets
 */
export function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data),
            }}
        />
    );
}

/**
 * Organization Schema - For the business entity
 */
export function OrganizationSchema() {
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Amrit Milk Organic",
        alternateName: "Amrit Milk",
        url: "https://amritmilkorganic.com",
        logo: {
            "@type": "ImageObject",
            url: "https://amritmilkorganic.com/assets/img/amrit-logo-transparent.png",
            width: 512,
            height: 512,
        },
        image: {
            "@type": "ImageObject",
            url: "https://amritmilkorganic.com/assets/img/amrit-logo-transparent.png",
            width: 512,
            height: 512,
        },
        description:
            "Pure A2 Gir Cow Milk with bilona ghee, cold-pressed oils, grains, and farm foods. Fresh, lab-tested, and delivered from our own farm.",
        foundingDate: "2015",
        founders: [
            {
                "@type": "Person",
                name: "Amrit Milk Organic Founder",
            },
        ],
        sameAs: [
            "https://www.facebook.com/amritmilkorganic",
            "https://www.instagram.com/amritmilkorganic",
            "https://wa.me/919919999123",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-991-999-9123",
            contactType: "Customer Service",
            availableLanguage: ["English", "Hindi"],
            areaServed: "IN",
        },
    };

    return <JsonLd data={organizationData} />;
}

/**
 * LocalBusiness Schema - For local SEO
 */
export function LocalBusinessSchema() {
    const localBusinessData = {
        "@context": "https://schema.org",
        "@type": "DairyFarm",
        name: "Amrit Milk Organic",
        image: "https://amritmilkorganic.com/assets/img/amrit-logo-transparent.png",
        "@id": "https://amritmilkorganic.com",
        url: "https://amritmilkorganic.com",
        telephone: "+91-991-999-9123",
        priceRange: "₹₹",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Amrit Milk Farms, 1, Amrit Milk Marg",
            addressLocality: "Lucknow",
            addressRegion: "Uttar Pradesh",
            postalCode: "226028",
            addressCountry: "IN",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "26.8467",
            longitude: "80.9462",
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "06:00",
                closes: "20:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "07:00",
                closes: "18:00",
            },
        ],
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "240",
            bestRating: "5",
            worstRating: "1",
        },
    };

    return <JsonLd data={localBusinessData} />;
}

/**
 * Product Schema - For product pages
 */
interface ProductSchemaProps {
    name: string;
    description: string;
    image: string;
    sku: string;
    brand?: string;
    category?: string;
    price: string;
    currency?: string;
    availability?: string;
    rating?: {
        ratingValue: number;
        reviewCount: number;
    };
}

export function ProductSchema({
    name,
    description,
    image,
    sku,
    brand = "Amrit Milk Organic",
    category,
    price,
    currency = "INR",
    availability = "https://schema.org/InStock",
    rating,
}: ProductSchemaProps) {
    const productData: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        image: image.startsWith("http") ? image : `https://amritmilkorganic.com${image}`,
        description,
        sku,
        brand: {
            "@type": "Brand",
            name: brand,
        },
        offers: {
            "@type": "Offer",
            url: `https://amritmilkorganic.com/products/${sku.toLowerCase().replace(/\s+/g, "-")}`,
            priceCurrency: currency,
            price: price.replace(/[^0-9.]/g, ""),
            availability,
            seller: {
                "@type": "Organization",
                name: "Amrit Milk Organic",
            },
        },
    };

    if (category) {
        productData.category = category;
    }

    if (rating) {
        productData.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: rating.ratingValue,
            reviewCount: rating.reviewCount,
            bestRating: 5,
            worstRating: 1,
        };
    }

    return <JsonLd data={productData} />;
}

/**
 * FAQPage Schema - For FAQ sections
 */
interface FAQItem {
    question: string;
    answer: string;
}

interface FAQPageSchemaProps {
    faqs: FAQItem[];
}

export function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return <JsonLd data={faqData} />;
}

/**
 * Website Schema - For sitelinks searchbox
 */
export function WebsiteSchema() {
    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Amrit Milk Organic",
        url: "https://amritmilkorganic.com",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: "https://amritmilkorganic.com/products?search={search_term_string}",
            },
            "query-input": "required name=search_term_string",
        },
    };

    return <JsonLd data={websiteData} />;
}

/**
 * BreadcrumbList Schema - For breadcrumb navigation
 */
interface BreadcrumbItem {
    name: string;
    item: string;
}

interface BreadcrumbListSchemaProps {
    items: BreadcrumbItem[];
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.item.startsWith("http")
                ? item.item
                : `https://amritmilkorganic.com${item.item}`,
        })),
    };

    return <JsonLd data={breadcrumbData} />;
}

/**
 * Article Schema - For blog posts
 */
interface ArticleSchemaProps {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
}

export function ArticleSchema({
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author = "Amrit Milk Organic",
}: ArticleSchemaProps) {
    const articleData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        image: image.startsWith("http") ? image : `https://amritmilkorganic.com${image}`,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
            "@type": "Organization",
            name: author,
        },
        publisher: {
            "@type": "Organization",
            name: "Amrit Milk Organic",
            logo: {
                "@type": "ImageObject",
                url: "https://amritmilkorganic.com/assets/img/amrit-logo-transparent.png",
            },
        },
    };

    return <JsonLd data={articleData} />;
}

/**
 * HowTo Schema - For recipe/how-to content
 */
interface HowToStep {
    name: string;
    text: string;
    image?: string;
}

interface HowToSchemaProps {
    name: string;
    description: string;
    totalTime?: string;
    estimatedCost?: {
        currency: string;
        value: string;
    };
    steps: HowToStep[];
}

export function HowToSchema({
    name,
    description,
    totalTime,
    estimatedCost,
    steps,
}: HowToSchemaProps) {
    const howToData: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text,
            image: step.image,
        })),
    };

    if (totalTime) {
        howToData.totalTime = totalTime;
    }

    if (estimatedCost) {
        howToData.estimatedCost = {
            "@type": "MonetaryAmount",
            currency: estimatedCost.currency,
            value: estimatedCost.value,
        };
    }

    return <JsonLd data={howToData} />;
}

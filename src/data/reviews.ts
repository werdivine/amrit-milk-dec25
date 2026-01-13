export interface GoogleReview {
    id: string;
    authorName: string;
    authorImage?: string;
    rating: number; // 1-5
    text: string;
    date: string;
    platform: "google";
}

export const googleReviews: GoogleReview[] = [
    {
        id: "1",
        authorName: "Priya Sharma",
        rating: 5,
        text: "Absolutely the best A2 milk in the city. The glass bottles are a great touch, and the taste reminds me of my village.",
        date: "2 weeks ago",
        platform: "google",
    },
    {
        id: "2",
        authorName: "Rahul Verma",
        rating: 5,
        text: "Switched to Amrit Milk 6 months ago. The difference in quality is noticeable. The ghee is aromatic and pure.",
        date: "1 month ago",
        platform: "google",
    },
    {
        id: "3",
        authorName: "Amit Patel",
        rating: 5,
        text: "Prompt delivery and excellent customer service. Highly recommend their organic mustard oil as well.",
        date: "2 months ago",
        platform: "google",
    },
    {
        id: "4",
        authorName: "Sneha Gupta",
        rating: 4,
        text: "Great quality products. Would love to see more paneer availability.",
        date: "3 months ago",
        platform: "google",
    },
];

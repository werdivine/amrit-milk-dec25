import React from "react";

export function SupportIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Friendly Human Face with Headset */}
            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" fill="currentColor" fillOpacity="0.1" />
            <path d="M12 16a3 3 0 0 1-3-3" />
            <circle cx="9" cy="9" r="1" fill="currentColor" />
            <circle cx="15" cy="9" r="1" fill="currentColor" />
            <path d="M18 11a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2" />
            <path d="M6 11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2" />
            <path d="M20 13c0-4.418-3.582-8-8-8S4 8.582 4 13" />
            <path d="M20 15v1a2 2 0 0 1-2 2h-1" />
        </svg>
    );
}

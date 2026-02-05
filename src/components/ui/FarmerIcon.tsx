import React from "react";

export function FarmerIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Turban/Pagri - Distinctive for an Indian Farmer */}
            <path d="M6 7c0-2.5 2-4 6-4s6 1.5 6 4-2 2.5-6 2.5S6 9.5 6 7z" fill="currentColor" fillOpacity="0.2" />
            <path d="M8 5c1-1 3-1.5 4-1.5s3 0.5 4 1.5" />
            
            {/* Face */}
            <path d="M12 18c3.3 0 6-2.7 6-6V9c0-1-1-2-2-2H8c-1 0-2 1-2 2v3c0 3.3 2.7 6 6 6z" />
            
            {/* Smile/Humanity */}
            <path d="M10 14c0.5 0.5 1.5 0.5 2 0s1.5-0.5 2 0" />
            
            {/* Shoulders */}
            <path d="M19 21v-1c0-2.2-1.8-4-4-4H9c-2.2 0-4 1.8-4 4v1" />
        </svg>
    );
}

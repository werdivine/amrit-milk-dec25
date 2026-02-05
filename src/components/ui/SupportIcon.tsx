import React from "react";

export function SupportIcon({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background Circle for a "Photo" look */}
            <circle cx="50" cy="50" r="48" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
            
            {/* Turban (Pagri) - More layered and detailed */}
            <path
                d="M22 38C22 22 35 12 50 12C65 12 78 22 78 38C78 44 72 48 62 48C52 48 42 48 32 48C22 48 22 44 22 38Z"
                fill="#FFFFFF"
                stroke="#D1D5DB"
                strokeWidth="1"
            />
            <path d="M25 35C35 25 65 25 75 35" stroke="#E5E7EB" strokeWidth="1" />
            <path d="M30 40C40 32 60 32 70 40" stroke="#E5E7EB" strokeWidth="1" />
            
            {/* Face - Warm skin tone */}
            <path
                d="M32 45C32 45 32 82 50 82C68 82 68 45 68 45"
                fill="#E0AC69"
            />
            
            {/* Eyes - Kind and smiling */}
            <path d="M40 58C42 56 45 56 47 58" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M53 58C55 56 58 56 60 58" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Moustache - Distinctive Farmer Look */}
            <path
                d="M38 68C42 66 46 66 50 68C54 66 58 66 62 68C64 70 65 72 65 72H35C35 72 36 70 38 68Z"
                fill="#4B5563"
            />
            
            {/* Smile under moustache */}
            <path
                d="M45 74C47 76 53 76 55 74"
                stroke="#333"
                strokeWidth="1"
                strokeLinecap="round"
            />

            {/* Headset - Professional yet simple */}
            <path
                d="M28 55C28 42 35 35 50 35C65 35 72 42 72 55"
                stroke="#111827"
                strokeWidth="4"
                strokeLinecap="round"
            />
            {/* Earpieces */}
            <rect x="22" y="52" width="10" height="16" rx="3" fill="#111827" />
            <rect x="68" y="52" width="10" height="16" rx="3" fill="#111827" />
            {/* Microphone arm */}
            <path
                d="M72 64C72 64 68 74 58 74"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle cx="58" cy="74" r="2.5" fill="#111827" />
        </svg>
    );
}

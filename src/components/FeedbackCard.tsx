"use client";

import React from 'react';

// Context tag colors
const CONTEXT_COLORS: Record<string, string> = {
    Collaboration: 'bg-blue-100 text-blue-700',
    Project: 'bg-green-100 text-green-700',
    Consultation: 'bg-purple-100 text-purple-700',
    General: 'bg-gray-100 text-gray-700'
};

interface FeedbackCardProps {
    name: string;
    message: string;
    context: string;
    rating?: number;
    createdAt: string;
}

export default function FeedbackCard({ name, message, context, rating, createdAt }: FeedbackCardProps) {
    // Format date
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    });

    // Render stars
    const renderStars = (count: number) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className={`w-4 h-4 ${star <= count ? 'text-yellow-400' : 'text-gray-200'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
            {/* Message */}
            <p className="text-gray-700 text-base leading-relaxed mb-4 flex-grow line-clamp-4">
                "{message}"
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                {/* Author + Rating */}
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-900">{name}</span>
                    {rating && renderStars(rating)}
                </div>

                {/* Context Tag + Date */}
                <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${CONTEXT_COLORS[context] || CONTEXT_COLORS.General}`}>
                        {context}
                    </span>
                    <span className="text-xs text-gray-400">{formattedDate}</span>
                </div>
            </div>
        </div>
    );
}

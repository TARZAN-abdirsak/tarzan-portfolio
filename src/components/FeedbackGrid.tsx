"use client";

import React, { useEffect, useState } from 'react';
import FeedbackCard from './FeedbackCard';

interface FeedbackItem {
    id: string;
    name: string;
    message: string;
    context: string;
    rating?: number;
    createdAt: string;
}

export default function FeedbackGrid() {
    const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchFeedback() {
            try {
                const res = await fetch('/api/feedback');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setFeedback(data);
            } catch (err) {
                setError('Unable to load feedback');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchFeedback();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-2xl h-48 animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>{error}</p>
            </div>
        );
    }

    if (feedback.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No feedback yet. Be the first to share your experience!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedback.map((item) => (
                <FeedbackCard
                    key={item.id}
                    name={item.name}
                    message={item.message}
                    context={item.context}
                    rating={item.rating}
                    createdAt={item.createdAt}
                />
            ))}
        </div>
    );
}

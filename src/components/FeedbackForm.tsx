"use client";

import React, { useState } from 'react';
import { useCursor } from '@/context/CursorContext';

const CONTEXT_OPTIONS = ['Collaboration', 'Project', 'Consultation', 'General'];

export default function FeedbackForm() {
    const { showClick, resetCursor } = useCursor();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        context: '',
        rating: 0,
        honeypot: '' // Hidden field for spam detection
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit');
            }

            setSuccess(true);
            setFormData({ name: '', email: '', message: '', context: '', rating: 0, honeypot: '' });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Thank you!</h3>
                <p className="text-green-700">Your feedback has been submitted for review.</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 text-green-600 underline hover:no-underline"
                >
                    Submit another
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave Feedback</h3>

            {/* Honeypot field - hidden from users, visible to bots */}
            <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="absolute -left-[9999px] opacity-0"
                tabIndex={-1}
                autoComplete="off"
            />

            <div className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors"
                        placeholder="Your name"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors"
                        placeholder="your@email.com"
                    />
                    <p className="text-xs text-gray-400 mt-1">Never shown publicly</p>
                </div>

                {/* Message */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feedback *</label>
                    <textarea
                        required
                        minLength={10}
                        maxLength={1000}
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors resize-none"
                        placeholder="Share your experience..."
                    />
                </div>

                {/* Context */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Context *</label>
                    <select
                        required
                        value={formData.context}
                        onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors bg-white"
                    >
                        <option value="">Select one...</option>
                        {CONTEXT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating (optional)</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setFormData({ ...formData, rating: formData.rating === star ? 0 : star })}
                                className="p-1 transition-transform hover:scale-110"
                                onMouseEnter={showClick}
                                onMouseLeave={resetCursor}
                            >
                                <svg
                                    className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-200'} transition-colors`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={submitting}
                onMouseEnter={showClick}
                onMouseLeave={resetCursor}
                className="mt-6 w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>

            <p className="mt-4 text-xs text-gray-400 text-center">
                Your feedback will be reviewed before publishing.
            </p>
        </form>
    );
}

"use client";

import { useState, useEffect } from 'react';

interface FeedbackItem {
    id: string;
    name: string;
    email: string;
    message: string;
    context: string;
    rating?: number;
    status: 'pending' | 'published' | 'rejected';
    createdAt: string;
}

const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
};

export default function AdminFeedbackPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [adminSecret, setAdminSecret] = useState('');
    const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'published' | 'rejected'>('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Login handler
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Test the password immediately
        try {
            const res = await fetch('/api/admin/feedback', {
                headers: { 'x-admin-secret': password }
            });

            if (res.status === 401) {
                setError('Invalid password. Make sure ADMIN_SECRET is set in .env.local and server is restarted.');
                setLoading(false);
                return;
            }

            if (!res.ok) {
                throw new Error('Failed to connect');
            }

            const data = await res.json();
            setFeedback(data);
            setAdminSecret(password);
            setAuthenticated(true);
        } catch (err) {
            setError('Failed to connect to server');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all feedback (with admin secret)
    const fetchFeedback = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/feedback', {
                headers: { 'x-admin-secret': adminSecret }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await res.json();
            setFeedback(data);
            setError(null);
        } catch (err) {
            setError('Failed to load feedback');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authenticated && adminSecret) {
            fetchFeedback();
        }
    }, [authenticated, adminSecret]);

    // Update status
    const updateStatus = async (id: string, status: 'published' | 'rejected') => {
        try {
            const res = await fetch(`/api/feedback/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-secret': adminSecret
                },
                body: JSON.stringify({ status })
            });

            if (!res.ok) throw new Error('Failed to update');

            // Refresh list
            fetchFeedback();
        } catch (err) {
            console.error(err);
            alert('Failed to update status');
        }
    };

    // Delete feedback
    const deleteFeedback = async (id: string) => {
        if (!confirm('Are you sure you want to delete this feedback?')) return;

        try {
            const res = await fetch(`/api/feedback/${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-secret': adminSecret }
            });

            if (!res.ok) throw new Error('Failed to delete');

            fetchFeedback();
        } catch (err) {
            console.error(err);
            alert('Failed to delete');
        }
    };

    // Filter feedback
    const filteredFeedback = filter === 'all'
        ? feedback
        : feedback.filter(f => f.status === filter);

    // Login screen
    if (!authenticated) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Access</h1>
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:border-black focus:ring-1 focus:ring-black outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Feedback Admin</h1>
                    <button
                        onClick={() => {
                            setAuthenticated(false);
                            setAdminSecret('');
                        }}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Logout
                    </button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    {(['all', 'pending', 'published', 'rejected'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f
                                ? 'bg-black text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-yellow-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-700">
                            {feedback.filter(f => f.status === 'pending').length}
                        </div>
                        <div className="text-sm text-yellow-600">Pending</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-700">
                            {feedback.filter(f => f.status === 'published').length}
                        </div>
                        <div className="text-sm text-green-600">Published</div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-red-700">
                            {feedback.filter(f => f.status === 'rejected').length}
                        </div>
                        <div className="text-sm text-red-600">Rejected</div>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-12 text-gray-500">Loading...</div>
                )}

                {/* Feedback List */}
                {!loading && (
                    <div className="space-y-4">
                        {filteredFeedback.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                No feedback in this category
                            </div>
                        ) : (
                            filteredFeedback.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-semibold text-gray-900">{item.name}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[item.status]}`}>
                                                    {item.status}
                                                </span>
                                                <span className="text-xs text-gray-400">{item.context}</span>
                                            </div>
                                            <p className="text-gray-700 mb-2">{item.message}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                                <span>{item.email}</span>
                                                <span>{new Date(item.createdAt).toLocaleString()}</span>
                                                {item.rating && <span>⭐ {item.rating}/5</span>}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 shrink-0">
                                            {item.status !== 'published' && (
                                                <button
                                                    onClick={() => updateStatus(item.id, 'published')}
                                                    className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {item.status !== 'rejected' && (
                                                <button
                                                    onClick={() => updateStatus(item.id, 'rejected')}
                                                    className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteFeedback(item.id)}
                                                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

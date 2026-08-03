// app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                {/* Error Icon */}
                <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <svg 
                        className="h-8 w-8 text-red-600" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                        />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Something went wrong!
                </h1>

                {/* Error Message */}
                <p className="text-gray-600 mb-6">
                    {error.message || 'An unexpected error occurred'}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try again
                    </button>
                    
                    <Link
                        href="/"
                        className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    );
}
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">😕</div>
        <h1 className="font-serif text-3xl md:text-4xl font-light text-content-primary mb-4">
          Something went wrong
        </h1>
        <p className="text-content-muted mb-8 leading-relaxed">
          We're sorry, but something unexpected happened. Don't worry, our team
          has been notified and we're working on it.
        </p>
        {error.digest && (
          <p className="text-sm text-content-light mb-6">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => reset()}
            className="btn-primary"
          >
            Try again
          </button>
          <a
            href="/"
            className="btn-secondary"
          >
            Go Home
          </a>
          <a
            href="/contact"
            className="text-accent hover:text-accent-dark transition-colors px-6 py-3"
          >
            Report Issue
          </a>
        </div>
      </div>
    </div>
  );
}

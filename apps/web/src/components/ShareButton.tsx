'use client';

interface ShareButtonProps {
  title?: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  return (
    <button
      onClick={() => {
        if (typeof window !== 'undefined') {
          navigator.clipboard.writeText(window.location.href);
        }
      }}
      className="btn-secondary w-full text-center"
    >
      {title ? `Share ${title}` : 'Share Itinerary'}
    </button>
  );
}

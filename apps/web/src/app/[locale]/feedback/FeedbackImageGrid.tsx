'use client';

import { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';

interface FeedbackImageGridProps {
  images: StaticImageData[];
  imageAlt: string;
}

export default function FeedbackImageGrid({
  images,
  imageAlt,
}: FeedbackImageGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) =>
          index === null ? index : (index - 1 + images.length) % images.length,
        );
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((index) =>
          index === null ? index : (index + 1) % images.length,
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group overflow-hidden bg-white/35 text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:ring-offset-[#f7f3ec]"
            aria-label={`${imageAlt} ${index + 1}`}
          >
            <span className="relative block aspect-[4/3]">
              <Image
                src={image}
                alt={`${imageAlt} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={index < 4}
              />
              <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
            </span>
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${imageAlt} ${activeIndex + 1}`}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-2xl text-white transition-colors hover:bg-white hover:text-neutral-950"
            aria-label="Close fullscreen image"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex(
                    (activeIndex - 1 + images.length) % images.length,
                  );
                }}
                className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-2xl text-white transition-colors hover:bg-white hover:text-neutral-950"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((activeIndex + 1) % images.length);
                }}
                className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-2xl text-white transition-colors hover:bg-white hover:text-neutral-950"
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}

          <div
            className="relative h-full max-h-[88vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt={`${imageAlt} ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

import Image from 'next/image';
import { Media } from '@/types';
import { getMediaImageUrl } from '@/lib/api';

interface ImageGalleryProps {
  images: { image: Media | string }[];
  title?: string;
  className?: string;
}

function getImageData(image: Media | string): { url: string; alt: string } | null {
  const url = getMediaImageUrl(image);
  if (!url) return null;
  return {
    url,
    alt: typeof image === 'object' ? image.alt || 'Gallery image' : 'Gallery image',
  };
}

export default function ImageGallery({
  images,
  title,
  className = '',
}: ImageGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className={className}>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((item, index) => {
          const imageData = getImageData(item.image);
          if (!imageData) return null;

          return (
            <div
              key={index}
              className="aspect-square relative rounded-lg overflow-hidden bg-gray-200"
            >
              <Image
                src={imageData.url}
                alt={imageData.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { ReactNode } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface MediaValue {
  id?: string;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  filename?: string;
}

interface RichTextNode {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: RichTextNode[];
  url?: string;
  newTab?: boolean;
  // For upload/image nodes
  value?: MediaValue;
  relationTo?: string;
}

interface RichTextProps {
  content: RichTextNode[];
  className?: string;
}

function renderText(node: RichTextNode): ReactNode {
  let text: ReactNode = node.text || '';

  if (node.bold) {
    text = <strong>{text}</strong>;
  }
  if (node.italic) {
    text = <em>{text}</em>;
  }
  if (node.underline) {
    text = <u>{text}</u>;
  }
  if (node.strikethrough) {
    text = <s>{text}</s>;
  }
  if (node.code) {
    text = <code className="bg-gray-100 px-1 rounded">{text}</code>;
  }

  return text;
}

function renderNode(node: RichTextNode, index: number): ReactNode {
  if (node.text !== undefined) {
    return <span key={index}>{renderText(node)}</span>;
  }

  const children = node.children?.map((child, i) => renderNode(child, i));

  switch (node.type) {
    case 'h1':
      return <h1 key={index}>{children}</h1>;
    case 'h2':
      return <h2 key={index}>{children}</h2>;
    case 'h3':
      return <h3 key={index}>{children}</h3>;
    case 'h4':
      return <h4 key={index}>{children}</h4>;
    case 'h5':
      return <h5 key={index}>{children}</h5>;
    case 'h6':
      return <h6 key={index}>{children}</h6>;
    case 'p':
      return <p key={index}>{children}</p>;
    case 'ul':
      return <ul key={index}>{children}</ul>;
    case 'ol':
      return <ol key={index}>{children}</ol>;
    case 'li':
      return <li key={index}>{children}</li>;
    case 'blockquote':
      return (
        <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic">
          {children}
        </blockquote>
      );
    case 'link':
      return (
        <a
          key={index}
          href={node.url}
          target={node.newTab ? '_blank' : undefined}
          rel={node.newTab ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    case 'upload':
      // Handle image uploads from Payload CMS
      if (node.relationTo === 'media' && node.value) {
        const media = node.value;
        const imageUrl = getImageUrl(media.url);
        if (imageUrl) {
          return (
            <figure key={index} className="my-6">
              <Image
                src={imageUrl}
                alt={media.alt || media.filename || ''}
                width={media.width || 800}
                height={media.height || 600}
                className="rounded-lg w-full h-auto"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              {media.alt && (
                <figcaption className="text-sm text-gray-500 mt-2 text-center">
                  {media.alt}
                </figcaption>
              )}
            </figure>
          );
        }
      }
      return null;
    default:
      return <span key={index}>{children}</span>;
  }
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className={`rich-text ${className}`}>
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
}

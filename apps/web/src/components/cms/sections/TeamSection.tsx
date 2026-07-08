'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/api';

interface TeamMember {
  photo?: { url?: string; alt?: string } | string;
  name: string;
  role?: string;
  bio?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

interface TeamSectionProps {
  config: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    members?: TeamMember[];
  };
}

function SocialIcon({ platform, url }: { platform: string; url: string }) {
  const icons: Record<string, JSX.Element> = {
    linkedin: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  };

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
    >
      {icons[platform] || null}
    </Link>
  );
}

export function TeamSection({ config }: TeamSectionProps) {
  if (!config?.enabled || !config.members?.length) return null;

  return (
    <section className="section-lg bg-surface-primary">
      <div className="container-wide">
        {/* Header */}
        {(config.title || config.subtitle) && (
          <div className="mb-12 lg:mb-16">
            {config.title && (
              <h2 className="font-serif text-heading-xl text-content-primary mb-4">
                Meet <span className="italic">Our Team</span>
              </h2>
            )}
            {config.subtitle && (
              <p className="text-body-lg text-content-muted max-w-3xl">
                {config.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Team Row - Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
          {config.members.map((member, index) => {
            const photoUrl = member.photo && typeof member.photo === 'object' 
              ? getImageUrl(member.photo.url)
              : typeof member.photo === 'string' 
                ? member.photo 
                : null;

            return (
              <div 
                key={index} 
                className="flex-shrink-0 w-[280px] lg:w-[300px] group cursor-pointer"
              >
                {/* Photo with Overlay */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-tertiary flex items-center justify-center">
                      <span className="text-5xl font-serif text-content-light">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-heading-md text-white mb-1">
                      {member.name}
                    </h3>
                    {member.role && (
                      <p className="text-body-sm text-white/80">
                        {member.role}
                      </p>
                    )}
                    
                    {/* Social Links */}
                    {member.socials && (member.socials.linkedin || member.socials.twitter || member.socials.instagram) && (
                      <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {member.socials.linkedin && (
                          <SocialIcon platform="linkedin" url={member.socials.linkedin} />
                        )}
                        {member.socials.twitter && (
                          <SocialIcon platform="twitter" url={member.socials.twitter} />
                        )}
                        {member.socials.instagram && (
                          <SocialIcon platform="instagram" url={member.socials.instagram} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;

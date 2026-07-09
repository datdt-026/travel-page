'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import RichText from '@/components/RichText';
import type { Itinerary, ItineraryDay } from '@/types';
import ItinerarySectionRenderer from './ItinerarySectionRenderer';

type TabKey = 'overview' | 'itinerary' | 'include-exclude' | 'inquiry';

interface ItineraryDetailTabsProps {
  itinerary: Itinerary;
  locale: string;
  editorialSections?: Itinerary['editorialSections'];
  labels?: {
    dayLabel?: string;
    overviewTitle?: string;
    packingListTitle?: string;
    tipsTitle?: string;
  };
  showActivities?: boolean;
  contactHref?: string;
  contactText?: string;
}

const tabLabels: Record<string, Record<TabKey, string>> = {
  vi: {
    overview: 'OVERVIEW',
    itinerary: 'ITINERARY',
    'include-exclude': 'INCLUDE / EXCLUDE',
    inquiry: 'INQUIRY FORM',
  },
  en: {
    overview: 'OVERVIEW',
    itinerary: 'ITINERARY',
    'include-exclude': 'INCLUDE / EXCLUDE',
    inquiry: 'INQUIRY FORM',
  },
  fr: {
    overview: 'OVERVIEW',
    itinerary: 'ITINERARY',
    'include-exclude': 'INCLUDE / EXCLUDE',
    inquiry: 'INQUIRY FORM',
  },
  de: {
    overview: 'OVERVIEW',
    itinerary: 'ITINERARY',
    'include-exclude': 'INCLUDE / EXCLUDE',
    inquiry: 'INQUIRY FORM',
  },
};

const fallbackCopy: Record<string, Record<string, string>> = {
  vi: {
    overview: 'Tong quan hanh trinh',
    itinerary: 'Lich trinh tung ngay',
    noDays: 'Lich trinh chi tiet se duoc cap nhat som.',
    includeExclude: 'Thong tin bao gom va khong bao gom se duoc cap nhat theo thiet ke moi.',
    inquiryTitle: 'Bat dau len ke hoach rieng',
    inquiryBody: 'Gui yeu cau de doi ngu tu van dieu chinh hanh trinh theo thoi gian, ngan sach va phong cach du lich cua ban.',
    inquiryCta: 'Lien he tu van',
    packing: 'Can chuan bi',
    tips: 'Ghi chu du lich',
    day: 'Ngay',
    activities: 'Trai nghiem trong ngay',
    meals: 'Bua an',
    accommodation: 'Luu tru',
  },
  en: {
    overview: 'Journey overview',
    itinerary: 'Day by day itinerary',
    noDays: 'The detailed itinerary will be updated soon.',
    includeExclude: 'Inclusions and exclusions will be updated with the new tab design.',
    inquiryTitle: 'Start planning your private journey',
    inquiryBody: 'Send an inquiry so our team can tailor this journey around your dates, budget, and travel style.',
    inquiryCta: 'Begin planning',
    packing: 'What to bring',
    tips: 'Traveler notes',
    day: 'Day',
    activities: 'Daily experiences',
    meals: 'Meals',
    accommodation: 'Accommodation',
  },
};

function getCopy(locale: string) {
  return fallbackCopy[locale] || fallbackCopy.en;
}

function getCityName(city: ItineraryDay['city']) {
  if (!city) return null;
  return typeof city === 'string' ? city : city.name || city.slug || null;
}

function getDestinationNames(items: Itinerary['countries'] | Itinerary['cities']) {
  return items
    ?.map((item) => (typeof item === 'string' ? item : item.name || item.slug))
    .filter(Boolean) || [];
}

export default function ItineraryDetailTabs({
  itinerary,
  locale,
  editorialSections,
  labels,
  showActivities = true,
  contactHref,
  contactText,
}: ItineraryDetailTabsProps) {
  const copy = getCopy(locale);
  const labelsByLocale = tabLabels[locale] || tabLabels.en;
  const tabs = useMemo(
    () => ([
      { key: 'overview' as const, label: labelsByLocale.overview },
      { key: 'itinerary' as const, label: labelsByLocale.itinerary },
      { key: 'include-exclude' as const, label: labelsByLocale['include-exclude'] },
      { key: 'inquiry' as const, label: labelsByLocale.inquiry },
    ]),
    [labelsByLocale]
  );

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const days = itinerary.days || [];
  const destinationNames = [
    ...getDestinationNames(itinerary.countries),
    ...getDestinationNames(itinerary.cities),
  ];

  const scrollTo = useCallback((index: number) => {
    const carousel = carouselRef.current;
    const slide = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !slide) return;

    carousel.scrollTo({
      left: slide.offsetLeft,
      behavior: 'smooth',
    });
    setSelectedIndex(index);
  }, []);

  const scrollPrev = useCallback(() => {
    scrollTo(Math.max(selectedIndex - 1, 0));
  }, [scrollTo, selectedIndex]);

  const scrollNext = useCallback(() => {
    scrollTo(Math.min(selectedIndex + 1, days.length - 1));
  }, [scrollTo, selectedIndex, days.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let frame = 0;
    const updateSelectedIndex = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = Array.from(carousel.children) as HTMLElement[];
        const nextIndex = slides.reduce((closestIndex, slide, index) => {
          const currentDistance = Math.abs(slide.offsetLeft - carousel.scrollLeft);
          const closestSlide = slides[closestIndex];
          const closestDistance = Math.abs(closestSlide.offsetLeft - carousel.scrollLeft);
          return currentDistance < closestDistance ? index : closestIndex;
        }, 0);

        setSelectedIndex(nextIndex);
      });
    };

    updateSelectedIndex();
    carousel.addEventListener('scroll', updateSelectedIndex, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      carousel.removeEventListener('scroll', updateSelectedIndex);
    };
  }, [days.length]);

  return (
    <section className="bg-[#f7f3ec] border-y border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 bg-[#f7f3ec]/95 backdrop-blur border-b border-neutral-200/80">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto" aria-label="Itinerary detail tabs">
            <div className="flex min-w-max items-center justify-center gap-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative px-5 md:px-10 py-5 text-xs md:text-sm uppercase tracking-[0.18em] transition-colors ${
                      isActive ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                    aria-selected={isActive}
                  >
                    {tab.label}
                    <span
                      className={`absolute inset-x-5 md:inset-x-10 bottom-0 h-px bg-neutral-950 transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="py-14 md:py-20">
          {activeTab === 'overview' && (
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
                    {labelsByLocale.overview}
                  </p>
                  <h2 className="font-serif text-3xl md:text-5xl font-light text-neutral-950 leading-tight">
                    {labels?.overviewTitle || copy.overview}
                  </h2>
                  {destinationNames.length > 0 && (
                    <p className="mt-5 text-sm uppercase tracking-[0.18em] text-neutral-500">
                      {destinationNames.join(' / ')}
                    </p>
                  )}
                </div>

                <div className="space-y-8">
                  {itinerary.description && (
                    <div className="prose prose-lg prose-neutral max-w-none prose-p:text-neutral-700 prose-p:font-light prose-p:leading-relaxed">
                      <RichText content={itinerary.description} />
                    </div>
                  )}

                  {editorialSections && editorialSections.length > 0 && (
                    <ItinerarySectionRenderer
                      sections={editorialSections}
                      locale={locale}
                      className="pt-4"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div>
              <div className="max-w-5xl mx-auto mb-10 md:mb-14 text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
                  {labelsByLocale.itinerary}
                </p>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-neutral-950">
                  {copy.itinerary}
                </h2>
              </div>

              {days.length > 0 ? (
                <>
                  <div
                    className="overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    ref={carouselRef}
                  >
                    <div className="flex gap-5 md:gap-6">
                      {days.map((day) => (
                        <DaySlide
                          key={day.dayNumber}
                          day={day}
                          dayLabel={labels?.dayLabel || copy.day}
                          activitiesLabel={copy.activities}
                          mealsLabel={copy.meals}
                          accommodationLabel={copy.accommodation}
                          showActivities={showActivities}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={scrollPrev}
                        className="h-11 w-11 rounded-full border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-950 transition-colors"
                        aria-label="Previous itinerary day"
                      >
                        <span aria-hidden="true">←</span>
                      </button>
                      <button
                        type="button"
                        onClick={scrollNext}
                        className="h-11 w-11 rounded-full border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-950 transition-colors"
                        aria-label="Next itinerary day"
                      >
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {days.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => scrollTo(index)}
                          className={`h-1.5 rounded-full transition-all ${
                            index === selectedIndex ? 'w-8 bg-neutral-900' : 'w-1.5 bg-neutral-300'
                          }`}
                          aria-label={`Go to itinerary day ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-neutral-500">{copy.noDays}</p>
              )}
            </div>
          )}

          {activeTab === 'include-exclude' && (
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10">
              <div className="bg-white/70 border border-neutral-200 p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-4">
                  {labels?.packingListTitle || copy.packing}
                </p>
                {itinerary.packingList && itinerary.packingList.length > 0 ? (
                  <ul className="space-y-3">
                    {itinerary.packingList.map((item, index) => (
                      <li key={index} className="flex gap-3 text-neutral-700">
                        <span className="mt-2 h-px w-5 bg-neutral-400 flex-shrink-0" />
                        <span>{item.item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-neutral-500 font-light">{copy.includeExclude}</p>
                )}
              </div>

              <div className="bg-white/70 border border-neutral-200 p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-4">
                  {labels?.tipsTitle || copy.tips}
                </p>
                {itinerary.tips ? (
                  <div className="prose prose-neutral max-w-none prose-p:text-neutral-700 prose-p:font-light">
                    <RichText content={itinerary.tips} />
                  </div>
                ) : (
                  <p className="text-neutral-500 font-light">{copy.includeExclude}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'inquiry' && (
            <div className="max-w-3xl mx-auto text-center bg-white/70 border border-neutral-200 px-8 py-12 md:px-14 md:py-16">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-5">
                {labelsByLocale.inquiry}
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-neutral-950 leading-tight mb-6">
                {copy.inquiryTitle}
              </h2>
              <p className="text-neutral-600 font-light leading-relaxed max-w-xl mx-auto mb-10">
                {copy.inquiryBody}
              </p>
              <Link
                href={contactHref || `/${locale}/contact`}
                className="inline-flex items-center justify-center px-10 py-4 border border-neutral-950 text-sm uppercase tracking-[0.16em] text-neutral-950 hover:bg-neutral-950 hover:text-white transition-colors"
              >
                {contactText || copy.inquiryCta}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DaySlide({
  day,
  dayLabel,
  activitiesLabel,
  mealsLabel,
  accommodationLabel,
  showActivities,
}: {
  day: ItineraryDay;
  dayLabel: string;
  activitiesLabel: string;
  mealsLabel: string;
  accommodationLabel: string;
  showActivities: boolean;
}) {
  const cityName = getCityName(day.city);
  const meals = day.meals
    ? [day.meals.breakfast, day.meals.lunch, day.meals.dinner].filter(Boolean)
    : [];

  return (
    <article className="min-w-0 flex-[0_0_88%] md:flex-[0_0_48%] xl:flex-[0_0_32%] snap-start bg-white border border-neutral-200 shadow-sm">
      <div className="p-7 md:p-9 min-h-[560px] flex flex-col">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.22em] text-neutral-400">
            {dayLabel} {day.dayNumber}
          </span>
          <h3 className="mt-3 font-serif text-2xl md:text-3xl font-light text-neutral-950 leading-tight">
            {day.title || `${dayLabel} ${day.dayNumber}`}
          </h3>
          {cityName && (
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-neutral-500">
              {cityName}
            </p>
          )}
        </div>

        {day.description && (
          <div className="prose prose-neutral max-w-none mb-8 prose-p:text-neutral-600 prose-p:font-light prose-p:leading-relaxed prose-p:text-sm">
            <RichText content={day.description} />
          </div>
        )}

        {showActivities && day.activities && day.activities.length > 0 && (
          <div className="mt-auto pt-7 border-t border-neutral-100">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
              {activitiesLabel}
            </p>
            <ul className="space-y-4">
              {day.activities.map((activity, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-900">{activity.activity}</p>
                    {activity.description && (
                      <p className="mt-1 text-sm text-neutral-500 font-light leading-relaxed">
                        {activity.description}
                      </p>
                    )}
                    {(activity.time || activity.duration) && (
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-neutral-400">
                        {[activity.time, activity.duration].filter(Boolean).join(' / ')}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(meals.length > 0 || day.accommodation?.name) && (
          <div className="mt-7 grid gap-4 border-t border-neutral-100 pt-6 text-sm text-neutral-600">
            {meals.length > 0 && (
              <div>
                <span className="block text-xs uppercase tracking-[0.18em] text-neutral-400 mb-2">
                  {mealsLabel}
                </span>
                <span>{meals.join(' / ')}</span>
              </div>
            )}
            {day.accommodation?.name && (
              <div>
                <span className="block text-xs uppercase tracking-[0.18em] text-neutral-400 mb-2">
                  {accommodationLabel}
                </span>
                <span>{day.accommodation.name}</span>
                {day.accommodation.notes && (
                  <p className="mt-1 text-neutral-500 font-light">{day.accommodation.notes}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

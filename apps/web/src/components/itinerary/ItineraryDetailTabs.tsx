"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RichText from "@/components/RichText";
import { getMockImage } from "@/assets/mockImages";
import type { Itinerary, ItineraryDay } from "@/types";
import ItinerarySectionRenderer from "./ItinerarySectionRenderer";

type TabKey = "overview" | "itinerary" | "include-exclude" | "inquiry";

interface ItineraryDetailTabsProps {
  itinerary: Itinerary;
  locale: string;
  editorialSections?: Itinerary["editorialSections"];
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
    overview: "Tổng quan",
    itinerary: "Lịch trình",
    "include-exclude": "Bao gồm / Không bao gồm",
    inquiry: "Biểu mẫu",
  },
  en: {
    overview: "OVERVIEW",
    itinerary: "ITINERARY",
    "include-exclude": "INCLUDE / EXCLUDE",
    inquiry: "FORM",
  },
  fr: {
    overview: "OVERVIEW",
    itinerary: "ITINERARY",
    "include-exclude": "INCLUDE / EXCLUDE",
    inquiry: "FORM",
  },
  de: {
    overview: "OVERVIEW",
    itinerary: "ITINERARY",
    "include-exclude": "INCLUDE / EXCLUDE",
    inquiry: "FORM",
  },
};

const fallbackCopy: Record<string, Record<string, string>> = {
  vi: {
    overview: "Tổng quan hành trình",
    itinerary: "Lịch trình từng ngày",
    noDays: "Lịch trình chi tiết sẽ được cập nhật sớm.",
    includeExclude:
      "Thông tin bao gồm và không bao gồm sẽ được cập nhật theo thiết kế mới.",
    inquiryTitle: "Bắt đầu lên kế hoạch riêng",
    inquiryBody:
      "Gửi yêu cầu để đội ngũ tư vấn điều chỉnh hành trình theo thời gian, ngân sách và phong cách du lịch của bạn.",
    inquiryCta: "Liên hệ tư vấn",
    packing: "Cần chuẩn bị",
    tips: "Ghi chú du lịch",
    day: "Ngày",
    activities: "Trải nghiệm trong ngày",
    narrative: "The Narrative",
    highlight: "Highlight",
    meals: "Bữa ăn",
    accommodation: "Lưu trú",
  },
  en: {
    overview: "Journey overview",
    itinerary: "Day by day itinerary",
    noDays: "The detailed itinerary will be updated soon.",
    includeExclude:
      "Inclusions and exclusions will be updated with the new tab design.",
    inquiryTitle: "Start planning your private journey",
    inquiryBody:
      "Send an inquiry so our team can tailor this journey around your dates, budget, and travel style.",
    inquiryCta: "Begin planning",
    packing: "What to bring",
    tips: "Traveler notes",
    day: "Day",
    activities: "Daily experiences",
    narrative: "The Narrative",
    highlight: "Highlight",
    meals: "Meals",
    accommodation: "Accommodation",
  },
};

function getCopy(locale: string) {
  return fallbackCopy[locale] || fallbackCopy.en;
}

function getCityName(city: ItineraryDay["city"]) {
  if (!city) return null;
  return typeof city === "string" ? city : city.name || city.slug || null;
}

function getDestinationNames(
  items: Itinerary["countries"] | Itinerary["cities"],
) {
  return (
    items
      ?.map((item) =>
        typeof item === "string" ? item : item.name || item.slug,
      )
      .filter(Boolean) || []
  );
}

function getSlideScrollLeft(slide: HTMLElement) {
  const firstSlide = slide.parentElement?.firstElementChild as
    | HTMLElement
    | undefined;

  return slide.offsetLeft - (firstSlide?.offsetLeft || 0);
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
    () => [
      { key: "overview" as const, label: labelsByLocale.overview },
      { key: "itinerary" as const, label: labelsByLocale.itinerary },
      {
        key: "include-exclude" as const,
        label: labelsByLocale["include-exclude"],
      },
      { key: "inquiry" as const, label: labelsByLocale.inquiry },
    ],
    [labelsByLocale],
  );

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideHeight, setSlideHeight] = useState<number | null>(null);

  const days = itinerary.days || [];
  const destinationNames = [
    ...getDestinationNames(itinerary.countries),
    ...getDestinationNames(itinerary.cities),
  ];

  const measureSlideHeight = useCallback((index = selectedIndex) => {
    const carousel = carouselRef.current;
    const slide = carousel?.children[index] as HTMLElement | undefined;
    if (!slide) return;

    setSlideHeight(slide.offsetHeight);
  }, [selectedIndex]);

  const scrollTo = useCallback((index: number) => {
    const carousel = carouselRef.current;
    const slide = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !slide) return;

    carousel.scrollTo({
      left: getSlideScrollLeft(slide),
      behavior: "auto",
    });
    setSelectedIndex(index);
    setSlideHeight(slide.offsetHeight);
  }, []);

  const scrollPrev = useCallback(() => {
    scrollTo(Math.max(selectedIndex - 1, 0));
  }, [scrollTo, selectedIndex]);

  const scrollNext = useCallback(() => {
    scrollTo(Math.min(selectedIndex + 1, days.length - 1));
  }, [scrollTo, selectedIndex, days.length]);

  const canScrollPrev = selectedIndex > 0;
  const canScrollNext = selectedIndex < days.length - 1;

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || activeTab !== "itinerary") return;

    let frame = 0;
    const updateSelectedIndex = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = Array.from(carousel.children) as HTMLElement[];
        if (slides.length === 0) return;

        const nextIndex = slides.reduce((closestIndex, slide, index) => {
          const currentDistance = Math.abs(
            getSlideScrollLeft(slide) - carousel.scrollLeft,
          );
          const closestSlide = slides[closestIndex];
          const closestDistance = Math.abs(
            getSlideScrollLeft(closestSlide) - carousel.scrollLeft,
          );
          return currentDistance < closestDistance ? index : closestIndex;
        }, 0);

        setSelectedIndex(nextIndex);
        setSlideHeight(slides[nextIndex].offsetHeight);
      });
    };

    const scheduleSelectedIndexUpdate = () => {
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }

      scrollDebounceRef.current = setTimeout(updateSelectedIndex, 120);
    };

    updateSelectedIndex();
    carousel.addEventListener("scroll", scheduleSelectedIndexUpdate, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }
      carousel.removeEventListener("scroll", scheduleSelectedIndexUpdate);
    };
  }, [activeTab, days.length]);

  useEffect(() => {
    if (activeTab !== "itinerary") return;

    let frame = requestAnimationFrame(() => {
      measureSlideHeight();
      frame = requestAnimationFrame(() => measureSlideHeight());
    });

    const handleResize = () => measureSlideHeight();

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab, measureSlideHeight]);

  useEffect(() => {
    if (activeTab !== "itinerary") return;

    const carousel = carouselRef.current;
    const slide = carousel?.children[selectedIndex] as HTMLElement | undefined;
    if (!slide || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => measureSlideHeight(selectedIndex));
    observer.observe(slide);

    return () => observer.disconnect();
  }, [activeTab, measureSlideHeight, selectedIndex]);

  return (
    <section className="bg-[#f7f3ec] border-y border-neutral-200/70">
      <div className="mx-auto max-w-[1500px] px-3 sm:px-4 lg:px-5">
        <div className="sticky top-0 z-20 -mx-3 bg-[#f7f3ec]/95 backdrop-blur border-b border-neutral-200/80 sm:-mx-4 lg:-mx-5">
          <nav
            className="mx-auto max-w-[1500px] px-3 sm:px-4 lg:px-5 overflow-x-auto"
            aria-label="Itinerary detail tabs"
          >
            <div className="flex min-w-max items-center justify-center gap-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative px-5 md:px-10 py-5 text-xs md:text-sm uppercase tracking-[0.18em] transition-colors ${
                      isActive
                        ? "text-neutral-950"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                    aria-selected={isActive}
                  >
                    {tab.label}
                    <span
                      className={`absolute inset-x-5 md:inset-x-10 bottom-0 h-px bg-neutral-950 transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="py-10 md:py-14">
          {activeTab === "overview" && (
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
                      {destinationNames.join(" / ")}
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

          {activeTab === "itinerary" && (
            <div>
              <div className="max-w-5xl mx-auto mb-8 md:mb-10 text-center">
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
                    className="flex items-start overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory transition-[height] duration-300 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    ref={carouselRef}
                    style={slideHeight ? { height: slideHeight } : undefined}
                  >
                    {days.map((day, index) => (
                      <DaySlide
                        key={day.dayNumber}
                        day={day}
                        days={days}
                        selectedIndex={selectedIndex}
                        onSelectDay={scrollTo}
                        imageIndex={index}
                        dayLabel={labels?.dayLabel || copy.day}
                        activitiesLabel={copy.activities}
                        narrativeLabel={copy.narrative}
                        highlightLabel={copy.highlight}
                        mealsLabel={copy.meals}
                        accommodationLabel={copy.accommodation}
                        showActivities={showActivities}
                      />
                    ))}
                  </div>

                  <div className="mt-7 flex items-center justify-between gap-8 px-1 md:px-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-neutral-300 disabled:hover:text-neutral-500"
                        aria-label="Previous itinerary day"
                      >
                        <span aria-hidden="true">←</span>
                      </button>
                      <button
                        type="button"
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-neutral-300 disabled:hover:text-neutral-500"
                        aria-label="Next itinerary day"
                      >
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      {days.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => scrollTo(index)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === selectedIndex
                              ? "w-8 bg-neutral-950"
                              : "w-1.5 bg-neutral-300 hover:bg-neutral-500"
                          }`}
                          aria-label={`Go to itinerary day ${index + 1}`}
                          aria-current={
                            index === selectedIndex ? "true" : undefined
                          }
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

          {activeTab === "include-exclude" && (
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:gap-16">
              <div>
                <h2 className="mb-8 font-serif text-xl font-light text-neutral-950">
                  What&apos;s Included
                </h2>
                <ul className="divide-y divide-neutral-200">
                  {[
                    {
                      title: "Specialist photography guiding",
                      description:
                        "Expert local guides and specialist photographers with deep knowledge of Vietnam's landscapes, light, and ethnic communities.",
                    },
                    {
                      title: "Private chauffeur and transfers",
                      description:
                        "Private ground transportation throughout the expedition, including mountain transfers, airport transfers, and local routing support.",
                    },
                    {
                      title: "Curated accommodations",
                      description:
                        "Selected hotels, homestays, guesthouses, and local stays positioned around key sunrise, sunset, and cultural photography locations.",
                    },
                    {
                      title: "Drone permit coordination",
                      description:
                        "Licensed drone access support for Bac Son, Phong Nam Valley, and Ban Gioc Waterfalls where permits and local clearances apply.",
                    },
                    {
                      title: "Community portrait access",
                      description:
                        "Coordinated portrait sessions with Tay, Dao Thanh Phan, Mong, Khang, Hoi An artisans, fishermen, and local communities with consent.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-7 py-8">
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-neutral-950 text-[11px] text-neutral-950">
                        ✓
                      </span>
                      <div>
                        <h3 className="mb-3 text-base font-medium uppercase tracking-[0.04em] text-neutral-950">
                          {item.title}
                        </h3>
                        <p className="max-w-2xl text-[15px] font-light leading-7 text-neutral-600">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="border border-neutral-300 bg-white/35 p-8 md:p-10 lg:self-start">
                <h2 className="mb-7 font-serif text-xl font-light text-neutral-950">
                  Not Included
                </h2>
                <ul className="space-y-5 text-[15px] text-neutral-600">
                  {[
                    "International airfare to/from Vietnam",
                    "Personal travel insurance, highly recommended",
                    "Alcoholic beverages unless specified",
                    "Visa application fees",
                    "Personal laundry and gratuities",
                  ].map((item) => (
                    <li key={item} className="flex gap-4">
                      <span className="text-neutral-500">×</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="my-8 h-px bg-neutral-200" />

                <p className="text-sm uppercase tracking-[0.14em] text-neutral-500">
                  Starting from
                </p>
                <p className="mt-2 text-base font-medium uppercase tracking-[0.04em] text-neutral-950">
                  Custom quotation / person
                </p>

                <div className="mt-10 grid gap-4">
                  <Link
                    href={contactHref || `/${locale}/contact`}
                    className="flex items-center justify-center bg-neutral-950 px-8 py-5 text-sm uppercase tracking-[0.28em] text-white transition-colors hover:bg-neutral-800"
                  >
                    Book This Expedition
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className="flex items-center justify-center border border-neutral-950 px-8 py-5 text-sm uppercase tracking-[0.28em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                  >
                    Download Brochure
                  </Link>
                </div>
              </aside>
            </div>
          )}

          {activeTab === "inquiry" && (
            <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.82fr_1fr] lg:gap-16">
              <div className="relative overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={getMockImage(8)}
                    alt="Private journey consultation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
                    <p className="font-serif text-2xl italic leading-tight md:text-3xl">
                      &ldquo;Luxury is the ease of a journey told through your own lens.&rdquo;
                    </p>
                    <p className="mt-5 text-[11px] uppercase tracking-[0.26em] text-white/70">
                      Vietway · Photography Expeditions
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-neutral-500">
                  {labelsByLocale.inquiry}
                </p>
                <h2 className="font-serif text-4xl font-light leading-tight text-neutral-950 md:text-5xl">
                  Design Your Journey
                </h2>
                <p className="mt-5 max-w-2xl text-[15px] font-light leading-7 text-neutral-600">
                  Tell us how you want to experience this expedition. Our team will tailor the route,
                  timing, hotels, photography access, and special permits around your vision.
                </p>

                <form className="mt-10 grid gap-x-8 gap-y-7 md:grid-cols-2">
                  {[
                    { label: "Your name", placeholder: "Your full name" },
                    { label: "Email address", placeholder: "name@example.com" },
                    { label: "Preferred dates", placeholder: "September - October" },
                    { label: "Travelers", placeholder: "2 guests / private group" },
                    { label: "Photography focus", placeholder: "Landscape, portrait, drone..." },
                    { label: "Budget range", placeholder: "Custom quotation" },
                  ].map((field) => (
                    <label key={field.label} className="block">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                        {field.label}
                      </span>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="mt-3 w-full border-0 border-b border-neutral-300 bg-transparent px-0 pb-3 text-sm text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none focus:ring-0"
                      />
                    </label>
                  ))}

                  <label className="block md:col-span-2">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                      Travel notes and wishes
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your photography goals, access needs, pace, and preferred comfort level."
                      className="mt-3 w-full resize-none border-0 border-b border-neutral-300 bg-transparent px-0 pb-3 text-sm text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none focus:ring-0"
                    />
                  </label>

                  <div className="mt-4 md:col-span-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center bg-neutral-950 px-10 py-4 text-sm uppercase tracking-[0.22em] text-white transition-colors hover:bg-neutral-800"
                    >
                      {contactText || "Begin This Plan"}
                    </button>
                  </div>
                </form>

                <div className="mt-12 grid gap-6 border-t border-neutral-200 pt-8 text-xs uppercase tracking-[0.18em] text-neutral-500 sm:grid-cols-3">
                  <div>
                    <span className="block text-neutral-950">Email</span>
                    <span className="mt-2 block normal-case tracking-normal">hello@vietwaytravel.vn</span>
                  </div>
                  <div>
                    <span className="block text-neutral-950">Phone</span>
                    <span className="mt-2 block normal-case tracking-normal">+84 924 95 8866</span>
                  </div>
                  <div>
                    <span className="block text-neutral-950">Response</span>
                    <span className="mt-2 block normal-case tracking-normal">Within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DaySlide({
  day,
  days,
  selectedIndex,
  onSelectDay,
  imageIndex,
  dayLabel,
  activitiesLabel,
  narrativeLabel,
  highlightLabel,
  mealsLabel,
  accommodationLabel,
  showActivities,
}: {
  day: ItineraryDay;
  days: ItineraryDay[];
  selectedIndex: number;
  onSelectDay: (index: number) => void;
  imageIndex: number;
  dayLabel: string;
  activitiesLabel: string;
  narrativeLabel: string;
  highlightLabel: string;
  mealsLabel: string;
  accommodationLabel: string;
  showActivities: boolean;
}) {
  const cityName = getCityName(day.city);
  const primaryImage = getMockImage(imageIndex * 2);
  const secondaryImage = getMockImage(imageIndex * 2 + 1);
  const dayImages = [primaryImage, secondaryImage];
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const activeImage =
    activeImageIndex === null ? null : dayImages[activeImageIndex];
  const meals = day.meals
    ? [day.meals.breakfast, day.meals.lunch, day.meals.dinner].filter(Boolean)
    : [];
  const featuredActivity = day.activities?.[0];
  const supportingActivities = day.activities?.slice(1) || [];
  const maxVisibleDays = 6;
  const visibleDayStartIndex = Math.min(
    selectedIndex,
    Math.max(days.length - maxVisibleDays, 0),
  );
  const visibleDays = days.slice(
    visibleDayStartIndex,
    visibleDayStartIndex + maxVisibleDays,
  );

  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImageIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((index) =>
          index === null
            ? index
            : (index - 1 + dayImages.length) % dayImages.length,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((index) =>
          index === null ? index : (index + 1) % dayImages.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, dayImages.length]);

  return (
    <>
      <article className="min-w-0 flex-[0_0_100%] snap-start bg-[#f7f3ec]">
        <div className="grid items-start gap-8 bg-[#f7f3ec] lg:grid-cols-[0.92fr_1.08fr] xl:grid-cols-[0.86fr_1.14fr]">
          <div className="grid gap-3 lg:sticky lg:top-28">
            {dayImages.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className="group relative aspect-[16/9] overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:ring-offset-[#f7f3ec]"
                aria-label={`Preview ${day.title || `${dayLabel} ${day.dayNumber}`} image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${day.title || `${dayLabel} ${day.dayNumber}`} image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={imageIndex === 0 && index === 0}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent transition-colors duration-500 group-hover:from-black/35" />
                <span className="absolute bottom-4 right-4 bg-white/90 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-neutral-950 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Preview
                </span>
              </button>
            ))}
          </div>

        <div className="px-1 py-2 md:px-4 lg:px-6 xl:px-8">
          <div className="mb-8 border-b border-neutral-200 pb-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max gap-7 md:gap-9">
              {visibleDays.map((item, index) => {
                const absoluteIndex = visibleDayStartIndex + index;
                const isActive = absoluteIndex === selectedIndex;
                return (
                  <button
                    key={item.dayNumber}
                    type="button"
                    onClick={() => onSelectDay(absoluteIndex)}
                    className={`relative pb-3 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                      isActive
                        ? "text-neutral-950"
                        : "text-neutral-300 hover:text-neutral-600"
                    }`}
                  >
                    {dayLabel} {String(item.dayNumber).padStart(2, "0")}
                    <span
                      className={`absolute left-1/2 top-6 h-1 w-1 -translate-x-1/2 rounded-full bg-neutral-950 transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {cityName && (
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#8a7a32]">
              {cityName}
            </p>
          )}

          <h3 className="font-serif text-3xl font-light leading-[1.08] text-neutral-950 md:text-5xl xl:text-6xl">
            {dayLabel} {String(day.dayNumber).padStart(2, "0")}:<br />
            {day.title || `${dayLabel} ${day.dayNumber}`}
          </h3>

          {featuredActivity && (
            <blockquote className="mt-6 max-w-2xl font-serif text-lg italic leading-relaxed text-neutral-500 md:text-xl">
              &ldquo;{featuredActivity.description || featuredActivity.activity}
              &rdquo;
            </blockquote>
          )}

          <div className="my-7 h-px bg-neutral-200" />

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-900">
              {narrativeLabel}
            </p>
            {day.description ? (
              <div className="prose prose-neutral max-w-none prose-p:text-[15px] prose-p:font-light prose-p:leading-7 prose-p:text-neutral-600">
                <RichText content={day.description} />
              </div>
            ) : (
              <p className="text-[15px] font-light leading-7 text-neutral-600">
                {featuredActivity?.activity || day.title}
              </p>
            )}
          </div>

          {showActivities && supportingActivities.length > 0 && (
            <div className="mt-6 border-l-2 border-neutral-900 bg-white/45 px-5 py-5">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900">
                {highlightLabel}
              </p>
              <ul className="space-y-3">
                {supportingActivities.map((activity, index) => (
                  <li
                    key={index}
                    className="text-[15px] font-light leading-7 text-neutral-600"
                  >
                    <span className="text-neutral-950">
                      {activity.activity}
                    </span>
                    {activity.description && (
                      <span className="text-neutral-500">
                        {" "}
                        - {activity.description}
                      </span>
                    )}
                    {(activity.time || activity.duration) && (
                      <span className="ml-2 text-xs uppercase tracking-[0.14em] text-neutral-400">
                        {[activity.time, activity.duration]
                          .filter(Boolean)
                          .join(" / ")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(meals.length > 0 || day.accommodation?.name) && (
            <div className="mt-6 grid gap-4 border-t border-neutral-200 pt-5 text-sm text-neutral-600 md:grid-cols-2">
              {meals.length > 0 && (
                <div>
                  <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                    {mealsLabel}
                  </span>
                  <span>{meals.join(" / ")}</span>
                </div>
              )}
              {day.accommodation?.name && (
                <div>
                  <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                    {accommodationLabel}
                  </span>
                  <span>{day.accommodation.name}</span>
                  {day.accommodation.notes && (
                    <p className="mt-1 font-light text-neutral-500">
                      {day.accommodation.notes}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-7 h-2 w-44 bg-neutral-950" />
        </div>
      </div>
    </article>

      {activeImage && activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview ${day.title || `${dayLabel} ${day.dayNumber}`} image ${activeImageIndex + 1}`}
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-2xl text-white transition-colors hover:bg-white hover:text-neutral-950"
            aria-label="Close fullscreen image"
          >
            ×
          </button>

          {dayImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveImageIndex(
                    (activeImageIndex - 1 + dayImages.length) %
                      dayImages.length,
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
                  setActiveImageIndex((activeImageIndex + 1) % dayImages.length);
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
              alt={`${day.title || `${dayLabel} ${day.dayNumber}`} image ${activeImageIndex + 1}`}
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

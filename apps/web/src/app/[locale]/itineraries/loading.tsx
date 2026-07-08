export default function Loading() {
  return (
    <div className="animate-pulse min-h-screen bg-white">
      {/* Hero Header Skeleton - Dark background */}
      <header className="relative min-h-[50vh] md:min-h-[60vh] flex items-end bg-stone-800">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative z-10 w-full pb-12 md:pb-16 pt-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="h-3 w-20 bg-white/20 mb-4" />
              {/* Title */}
              <div className="h-12 md:h-14 w-3/4 bg-white/30 mb-5" />
              {/* Subtitle */}
              <div className="space-y-2 max-w-xl">
                <div className="h-5 bg-white/15 w-full" />
                <div className="h-5 bg-white/15 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Collection Skeleton - Compact layout */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          {/* Featured Item */}
          <div className="mb-10 md:mb-14">
            <div className="aspect-[21/9] bg-stone-100" />
            <div className="mt-4">
              <div className="h-8 md:h-10 w-2/3 bg-stone-200 mb-2" />
              <div className="h-4 w-1/2 bg-stone-100" />
            </div>
          </div>

          {/* Grid 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-14">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={i % 2 === 1 ? 'sm:mt-8' : ''}>
                <div className="aspect-[4/3] bg-stone-100" />
                <div className="mt-4">
                  <div className="h-6 w-3/4 bg-stone-200 mb-2" />
                  <div className="h-4 w-1/2 bg-stone-100" />
                </div>
              </div>
            ))}
          </div>

          {/* Triple Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className={i === 1 ? 'lg:mt-6' : ''}>
                <div className="aspect-[4/3] bg-stone-100" />
                <div className="mt-4">
                  <div className="h-5 w-3/4 bg-stone-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Place Profile Loading State
 * Editorial, calm loading skeleton
 */
export default function Loading() {
  return (
    <div className="bg-surface-primary min-h-screen animate-pulse">
      {/* Hero skeleton with dark gradient for header */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] bg-surface-dark -mt-20 md:-mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-primary via-surface-primary/30 to-transparent" />
      </div>

      {/* Intro skeleton */}
      <div className="relative -mt-32 md:-mt-40 pb-16 md:pb-24">
        <div className="container-editorial">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-3 bg-surface-tertiary w-12" />
            <div className="h-3 bg-surface-tertiary w-2" />
            <div className="h-3 bg-surface-tertiary w-16" />
          </div>

          {/* Location */}
          <div className="h-3 bg-surface-tertiary w-32 mb-6" />

          {/* Title */}
          <div className="h-12 md:h-16 bg-surface-tertiary w-2/3 mb-8" />

          {/* Excerpt */}
          <div className="space-y-3 max-w-2xl">
            <div className="h-5 bg-surface-tertiary w-full" />
            <div className="h-5 bg-surface-tertiary w-3/4" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container-editorial py-8 md:py-16">
        <div className="max-w-3xl space-y-6">
          <div className="h-5 bg-surface-tertiary w-full" />
          <div className="h-5 bg-surface-tertiary w-full" />
          <div className="h-5 bg-surface-tertiary w-3/4" />
          <div className="h-5 bg-surface-tertiary w-full" />
          <div className="h-5 bg-surface-tertiary w-2/3" />
        </div>
      </div>

      {/* Practical notes skeleton */}
      <div className="container-editorial py-16 md:py-24">
        <div className="max-w-3xl pt-12 border-t border-border-light">
          <div className="h-3 bg-surface-tertiary w-24 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-2 bg-surface-tertiary w-12 mb-2" />
                <div className="h-4 bg-surface-tertiary w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

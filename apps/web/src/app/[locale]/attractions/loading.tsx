/**
 * Curated Places Loading State
 * Editorial, calm loading skeleton
 */
export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Dark header section skeleton */}
      <div className="bg-surface-dark pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="container-editorial">
          <div className="max-w-2xl space-y-6 animate-pulse">
            <div className="h-3 bg-white/10 w-24" />
            <div className="h-12 md:h-16 bg-white/10 w-3/4" />
            <div className="h-6 bg-white/10 w-full" />
          </div>
        </div>
      </div>
      
      {/* Gradient transition */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-surface-dark to-surface-primary" />

      {/* Gallery skeleton - Non-uniform layout */}
      <div className="container-wide pb-24 md:pb-40 bg-surface-primary">
        <div className="space-y-24 md:space-y-40 animate-pulse">
          {/* First section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <div className="aspect-[4/5] bg-surface-tertiary mb-8" />
              <div className="space-y-4">
                <div className="h-3 bg-surface-tertiary w-20" />
                <div className="h-8 bg-surface-tertiary w-3/4" />
                <div className="h-5 bg-surface-tertiary w-full" />
              </div>
            </div>
            <div className="space-y-12 md:pt-24">
              <div>
                <div className="aspect-[4/3] bg-surface-tertiary mb-6" />
                <div className="space-y-3">
                  <div className="h-3 bg-surface-tertiary w-16" />
                  <div className="h-6 bg-surface-tertiary w-2/3" />
                </div>
              </div>
              <div>
                <div className="aspect-[4/3] bg-surface-tertiary mb-6" />
                <div className="space-y-3">
                  <div className="h-3 bg-surface-tertiary w-16" />
                  <div className="h-6 bg-surface-tertiary w-2/3" />
                </div>
              </div>
            </div>
          </div>

          {/* Second section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-24">
            <div>
              <div className="aspect-[5/6] bg-surface-tertiary mb-6" />
              <div className="space-y-3">
                <div className="h-3 bg-surface-tertiary w-20" />
                <div className="h-7 bg-surface-tertiary w-3/4" />
                <div className="h-5 bg-surface-tertiary w-full" />
              </div>
            </div>
            <div className="md:mt-32">
              <div className="aspect-[5/6] bg-surface-tertiary mb-6" />
              <div className="space-y-3">
                <div className="h-3 bg-surface-tertiary w-20" />
                <div className="h-7 bg-surface-tertiary w-3/4" />
                <div className="h-5 bg-surface-tertiary w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


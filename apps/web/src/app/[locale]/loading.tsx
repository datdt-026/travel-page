export default function HomeLoading() {
  return (
    <div className="overflow-hidden">
      {/* Hero Skeleton - Full Screen */}
      <section className="min-h-screen bg-gray-900 relative flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        <div className="container-wide relative z-10 pt-24">
          <div className="max-w-3xl">
            <div className="h-16 w-96 bg-white/10 mb-8 animate-pulse" />
            <div className="h-10 w-80 bg-white/5 rounded-full mb-12 animate-pulse" />
            <div className="h-4 w-32 bg-white/10 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Destinations Section Skeleton */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="h-3 w-32 bg-gray-200 mb-4 animate-pulse" />
              <div className="h-10 w-64 bg-gray-200 animate-pulse" />
            </div>
            <div className="h-4 w-24 bg-gray-200 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-lg">
              <div className="h-3 w-24 bg-gray-200 mb-6 animate-pulse" />
              <div className="h-12 w-80 bg-gray-200 mb-8 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 animate-pulse" />
                <div className="h-4 w-full bg-gray-200 animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-8 bg-white shadow-sm">
                  <div className="h-12 w-20 bg-gray-200 mx-auto mb-2 animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 mx-auto animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section Skeleton */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="h-3 w-28 bg-gray-200 mb-4 animate-pulse" />
              <div className="h-10 w-56 bg-gray-200 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="aspect-[4/3] bg-gray-100 mb-5 animate-pulse" />
                <div className="h-5 w-32 bg-gray-200 mb-2 animate-pulse" />
                <div className="h-4 w-48 bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

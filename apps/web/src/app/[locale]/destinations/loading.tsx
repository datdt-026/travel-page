export default function DestinationsLoading() {
  return (
    <div>
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-main text-center">
          <div className="h-10 w-64 bg-white/20 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-white/20 rounded mx-auto animate-pulse" />
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="py-16">
        <div className="container-main">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card">
                <div className="aspect-video bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="animate-pulse py-12">
      <div className="container-main">
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded w-1/4 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

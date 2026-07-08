export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-96 bg-gray-200" />
      <div className="container-main py-8">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-8" />
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

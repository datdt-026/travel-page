export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200" />
      <div className="container-main py-8">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

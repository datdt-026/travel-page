export default function Loading() {
  return (
    <div className="animate-pulse py-12">
      <div className="container-main max-w-4xl">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-8" />
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-6" />
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded" />
          <div className="h-6 bg-gray-200 rounded w-5/6" />
          <div className="h-6 bg-gray-200 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}

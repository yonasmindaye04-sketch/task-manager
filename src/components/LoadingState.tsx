/**
 * Loading State Component
 * Displays skeleton screens while tasks are being fetched
 */

const LoadingState = () => {
  return (
    <div className="space-y-3">
      <div className="text-center mb-6">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading tasks...</p>
      </div>
      
      {/* Skeleton screens for tasks */}
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse"
        >
          <div className="flex items-center space-x-3">
            {/* Checkbox skeleton */}
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            
            {/* Text skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            {/* Buttons skeleton */}
            <div className="flex space-x-2">
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
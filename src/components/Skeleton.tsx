import React from 'react';

const Skeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-10 bg-gray-200 rounded"></div>
    ))}
  </div>
);

export default Skeleton;
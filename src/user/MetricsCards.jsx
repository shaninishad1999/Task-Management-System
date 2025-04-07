import React from 'react';

const MetricsCards = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-500 text-sm">Total Tasks</p>
        <p className="text-2xl font-bold">{metrics.tasks}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-500 text-sm">Completed</p>
        <p className="text-2xl font-bold text-green-600">{metrics.completed}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-500 text-sm">Pending</p>
        <p className="text-2xl font-bold text-yellow-600">{metrics.pending}</p>
      </div>
    </div>
  );
};

export default MetricsCards;
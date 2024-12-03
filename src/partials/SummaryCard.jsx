import React from 'react';


function SummaryCard({
  title = 'Title',
  value = '₱0',
  percentageChange = null, 
  percentageChangeType = 'neutral', 
}) {
  
  const changeColor =
    percentageChangeType === 'positive'
      ? 'text-green-700 bg-green-500/20'
      : percentageChangeType === 'negative'
      ? 'text-red-700 bg-red-500/20'
      : 'text-gray-700 bg-gray-500/20';

  return (
    <div className="flex flex-col h bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full">
      <div className="p-8">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
         
        </header>
        <div className="flex items-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{value}</div>
          {percentageChange && (
            <div className={`text-sm font-medium px-1.5 rounded-full ${changeColor}`}>
              {percentageChange}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
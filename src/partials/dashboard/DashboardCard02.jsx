import React from 'react';
import LineChart from '../../charts/LineChart';
import EditMenu from '../../components/DropdownEditMenu';

function DashboardCard02({
  title = 'Monthly Payables',
  chartData,
  sales = '₱17,489',
  percentageChange = '-14%',
  percentageChangeType = 'negative',
  menuOptions = [],
}) {
  const changeColor =
    percentageChangeType === 'positive'
      ? 'text-green-700 bg-green-500/20'
      : 'text-red-700 bg-red-500/20';

  return (
    <div className="flex flex-col col-span-full w-full bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
          <EditMenu align="right" className="relative inline-flex">
            {menuOptions.map((option, index) => (
              <li key={index}>
                <a
                  className={`font-medium text-sm ${
                    option.color || 'text-gray-600 dark:text-gray-300'
                  } hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3`}
                  href={option.link || '#0'}
                >
                  {option.label}
                </a>
              </li>
            ))}
          </EditMenu>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div>
        <div className="flex items-start">
        <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{sales}</div>
          <div className={`text-sm font-medium px-1.5 rounded-full ${changeColor}`}>
            {percentageChange}
          </div>
        </div>
      </div>
      <div className="grow max-h-[450px]">
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  
  );
}

export default DashboardCard02;
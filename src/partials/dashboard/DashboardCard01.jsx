import React from 'react';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import LineChart from '../../charts/LineChart01';

// Import utilities
import { hexToRGB, tailwindConfig } from '../../utils/Utils';

function DashboardCard01({ title, dates, digits }) {
  // Ensure data is valid to prevent rendering issues
  const validDates = Array.isArray(dates) ? dates : [];
  const validDigits = Array.isArray(digits) ? digits : [];

  const chartData = {
    labels: validDates,
    datasets: [
      {
        data: validDigits,
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return; // Prevent errors when chart area is not ready
          return chartAreaGradient(ctx, chartArea, [
            {
              stop: 0,
              color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)`,
            },
            {
              stop: 1,
              color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)`,
            },
          ]);
        },
        borderColor: tailwindConfig().theme.colors.violet[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">₱24,780</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%</div>
        </div>
      </div>
      {/* Chart section */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
      <LineChart
  data={{
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        data: [10, 20, 30],
        borderColor: 'rgba(124, 58, 237, 1)',
        backgroundColor: 'rgba(124, 58, 237, 0.2)',
        tension: 0.2,
      },
    ],
  }}
  width={389}
  height={128}
/>

      </div>
    </div>
  );
}

export default DashboardCard01;
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04({ bills }) {
  // Memoize calculations for performance
  const { chartData, totalPaid, totalUnpaid } = useMemo(() => {
    if (!bills || bills.length === 0) {
      return { chartData: [], totalPaid: 0, totalUnpaid: 0 };
    }

    // Calculate total paid and unpaid
    const totalPaidCalc = bills.reduce((sum, bill) => {
      const paid = bill.amount_paid;
      return sum + (isNaN(paid) ? 0 : paid);
    }, 0);

    const totalAmount = bills.reduce((sum, bill) => {
      const amount = bill.amount;
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    const totalUnpaidCalc = totalAmount - totalPaidCalc;

    // Prepare chart data for Recharts
    const chartDataCalc = [
      { name: 'Paid', Amount: totalPaidCalc },
      { name: 'Unpaid', Amount: totalUnpaidCalc },
    ];

    return { chartData: chartDataCalc, totalPaid: totalPaidCalc, totalUnpaid: totalUnpaidCalc };
  }, [bills]);

  if (!bills || bills.length === 0) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Paid vs Unpaid</h2>
        </header>
        <div className="p-5 text-center">
          <p className="text-gray-500">No billing data available.</p>
        </div>
      </div>
    );
  }

  // Define colors using Tailwind config
  const paidColorStart = tailwindConfig().theme.colors.green[400];
  const paidColorEnd = tailwindConfig().theme.colors.green[600];
  const unpaidColorStart = tailwindConfig().theme.colors.red[400];
  const unpaidColorEnd = tailwindConfig().theme.colors.red[600];
  const tooltipBgColor = tailwindConfig().theme.colors.gray[100];
  const tooltipTextColor = tailwindConfig().theme.colors.gray[800];
  const axisColor = tailwindConfig().theme.colors.gray[400];

  return (
    <div className="flex flex-col w-full col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Billing Status</h2>
        <div className="flex justify-between">
          <div className="flex items-center">
            <span
              className="inline-block w-3 h-3 mr-1 rounded-full"
              style={{ backgroundColor: tailwindConfig().theme.colors.green[500] }}
            ></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Paid: ₱{totalPaid.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center">
            <span
              className="inline-block w-3 h-3 mr-1 rounded-full"
              style={{ backgroundColor: tailwindConfig().theme.colors.red[500] }}
            ></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Unpaid: ₱{totalUnpaid.toLocaleString()}
            </span>
          </div>
        </div>
      </header>
      <div className="p-5">
        <ResponsiveContainer width="100%" height={248}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            {/* Define Gradients */}
            <defs>
              <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={paidColorStart} stopOpacity={1} />
                <stop offset="95%" stopColor={paidColorEnd} stopOpacity={1} />
              </linearGradient>
              <linearGradient id="unpaidGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={unpaidColorStart} stopOpacity={1} />
                <stop offset="95%" stopColor={unpaidColorEnd} stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke={axisColor}
              tick={{ fontSize: 12, fill: tailwindConfig().theme.colors.gray[600] }}
            />
            <YAxis
              stroke={axisColor}
              tick={{ fontSize: 12, fill: tailwindConfig().theme.colors.gray[600] }}
              tickFormatter={(value) => `₱${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBgColor,
                border: 'none',
                borderRadius: '8px',
              }}
              itemStyle={{ color: tooltipTextColor }}
              formatter={(value) => [`₱${value.toLocaleString()}`, 'Amount']}
            />
            <Bar dataKey="Amount" barSize={60}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === 'Paid' ? 'url(#paidGradient)' : 'url(#unpaidGradient)'}
                />
              ))}
              <LabelList
                dataKey="Amount"
                position="top"
                formatter={(value) => `₱${value.toLocaleString()}`}
                style={{ fontSize: '12px', fill: tailwindConfig().theme.colors.gray[700] }}
              />
            </Bar>
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ top: 0, left: 25, right: 25 }}
              iconType="circle"
              iconSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Define prop types for better type checking
DashboardCard04.propTypes = {
  bills: PropTypes.arrayOf(
    PropTypes.shape({
      bill_id: PropTypes.string.isRequired,
      bill_account_id: PropTypes.string.isRequired,
      due_date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired, // Changed to number
      plan: PropTypes.string.isRequired,
      stat: PropTypes.string,
      amount_paid: PropTypes.number.isRequired, // Changed to number
    })
  ).isRequired,
};

export default DashboardCard04;
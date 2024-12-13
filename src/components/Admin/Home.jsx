// src/pages/Home.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import LineChart from '../../charts/LineChart01';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';
import DashboardCard10 from '../../partials/dashboard/DashboardCard10';
import SummaryCard from '../../partials/SummaryCard';
import { hexToRGB, tailwindConfig } from '../../utils/Utils';

// Import date-fns for date manipulation
import {
  format,
  isSameDay,
  isSameMonth,
  isSameQuarter,
  parseISO,
} from 'date-fns';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  const [Unpaid, setUnpaid] = useState([]);
  // States for Today
  const [todayTotal, setTodayTotal] = useState(0);

  // States for This Month
  const [monthTotal, setMonthTotal] = useState(0);

  // States for This Quarter
  const [quarterTotal, setQuarterTotal] = useState(0);

  // State for Line Chart (monthly totals)
  const [monthlyTotals, setMonthlyTotals] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.post(`${window.host}/auth/getTransactions`, {
        token: sessionStorage.getItem(
          '3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0'
        ),
      });
      const data = response.data;

      const today = new Date();

      // Initialize aggregators
      let totalToday = 0;
      let totalMonth = 0;
      let totalQuarter = 0;
      const aggregatedMonthly = {};

      data.forEach((item) => {
        const paymentDate = parseISO(item.payment_date);

        // Aggregation for Today
        if (isSameDay(paymentDate, today)) {
          totalToday += parseFloat(item.total_paid) || 0;
        }

        // Aggregation for This Month
        if (isSameMonth(paymentDate, today)) {
          totalMonth += parseFloat(item.total_paid) || 0;
        }

        // Aggregation for This Quarter
        if (isSameQuarter(paymentDate, today)) {
          totalQuarter += parseFloat(item.total_paid) || 0;
        }

        // Aggregation for Line Chart (per month)
        const formattedMonth = format(paymentDate, 'MM-dd-yyyy'); // Use first day of the month
        const firstDayOfMonth = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), 1);
        const formattedMonthKey = format(firstDayOfMonth, 'MM-dd-yyyy'); // Ensures consistency

        if (!aggregatedMonthly[formattedMonthKey]) {
          aggregatedMonthly[formattedMonthKey] = 0;
        }
        aggregatedMonthly[formattedMonthKey] += parseFloat(item.total_paid) || 0;
      });

      // Sort the monthlyTotals by date
      const sortedMonthlyKeys = Object.keys(aggregatedMonthly).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      const sortedMonthlyTotals = {};
      sortedMonthlyKeys.forEach((key) => {
        sortedMonthlyTotals[key] = aggregatedMonthly[key];
      });

      // Update states
      setTodayTotal(totalToday);
      setMonthTotal(totalMonth);
      setQuarterTotal(totalQuarter);
      setMonthlyTotals(sortedMonthlyTotals);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUnpaid_bill = async () => {
    try {
      const response = await axios.post(`${window.host}/auth/getUpaid`, {
        token: sessionStorage.getItem('3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0')
      });
      console.log(response.data.resp);
      setUnpaid(response.data.resp);
    }
    catch (error) {
      console.error('Error fetching unpaid bill data:', error);
    }
  };

  const fetchBillsData = async () => {
    try {
      const response = await axios.post(`${window.host}/auth/getBills`, {
        token: sessionStorage.getItem('3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0')
      });

      const rawBills = response.data.resp;

      const transformedBills = rawBills.map(bill => ({
        bill_id: bill.bill_id,
        bill_account_id: bill.bill_account_id,
        due_date: bill.due_date,
        amount: parseFloat(bill.ammount), // Corrected key and converted to number
        plan: bill.plan,
        stat: bill.stat,
        amount_paid: parseFloat(bill.ammount_paid) // Corrected key and converted to number
      }));

      setBills(transformedBills);
    } catch (error) {
      console.error('Error fetching bills data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    fetchBillsData();
    fetchUnpaid_bill();
  }, []);


  // Prepare chart data for the line chart
  const prepareLineChartData = () => {
    const labels = Object.keys(monthlyTotals);
    const data = Object.values(monthlyTotals);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Monthly Sales',
          data: data,
          fill: true,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return 'rgba(124, 58, 237, 0.2)'; // Fallback color
            return chartAreaGradient(ctx, chartArea, [
              { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)` },
              { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)` },
            ]);
          },
          borderColor: tailwindConfig().theme.colors.violet[500],
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.4,
        },
      ],
    };
  };

  // Define chart data for the line chart
  const chartDataLine = prepareLineChartData();

  // Placeholder percentage changes (you can replace these with actual calculations)
  const percentageChangeToday = "+12%";
  const percentageChangeTypeToday = "positive";

  const percentageChangeMonth = "+8%";
  const percentageChangeTypeMonth = "positive";

  const percentageChangeQuarter = "-5%";
  const percentageChangeTypeQuarter = "negative";

  // Menu options
  const menuOptions = [
    { label: 'Option 1', link: '#0', color: 'text-gray-600' },
    { label: 'Option 2', link: '#0', color: 'text-gray-600' },
    { label: 'Remove', link: '#0', color: 'text-red-500' },
  ];

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Dashboard Header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Dashboard Summary Cards */}
        <div className="flex justify-evenly w-full items-center gap-6 mb-4">
          {loading ? (
            <p className="col-span-full text-center text-gray-500">Loading data...</p>
          ) : (
            <>
              {/* Today Card */}
              <SummaryCard
                title="Today"
                value={`₱${todayTotal.toLocaleString()}`}
                percentageChange={percentageChangeToday}
                percentageChangeType={percentageChangeTypeToday}
                menuOptions={menuOptions}
              />

              {/* This Month Card */}
              <SummaryCard
                title="This Month"
                value={`₱${monthTotal.toLocaleString()}`}
                percentageChange={percentageChangeMonth}
                percentageChangeType={percentageChangeTypeMonth}
                menuOptions={menuOptions}
              />

              {/* This Quarter Card */}
              <SummaryCard
                title="This Quarter"
                value={`₱${quarterTotal.toLocaleString()}`}
                percentageChange={percentageChangeQuarter}
                percentageChangeType={percentageChangeTypeQuarter}
                menuOptions={menuOptions}
              />
            </>
          )}
        </div>

        {/* Line Chart */}
        <div className="flex col-2 justify-center  w-full items-center gap-6 mb-4">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Monthly Sales</h2>
            {loading ? (
              <p className="text-center text-gray-500">Loading chart...</p>
            ) : Object.keys(monthlyTotals).length > 0 ? (
              <div className="h-64">
                <LineChart
                  data={chartDataLine}
                  width={600}
                  height={400}
                />
              </div>
            ) : (
              <p className="text-center text-gray-500">No data available for the chart.</p>
            )}
          </div>
          {loading ? null : (
            <>
              <DashboardCard04 bills={bills} />
            </>
          )}
        </div>

        {/* Other Dashboard Cards */}
        <div className="w-full">
          <DashboardCard10 title="Unpaid Customers" data={Unpaid} />
        </div>
      </div>
    </main>
  );
};

export default Home;
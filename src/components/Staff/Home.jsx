import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';
import DashboardCard10 from '../../partials/dashboard/DashboardCard10';

function Home() {

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Unpaid, setUnpaid] = useState([]);

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

  useEffect(() => {
    fetchBillsData();
    fetchUnpaid_bill();
  }, []);

  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        {/* Dashboard actions */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">

          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
          </div>
        </div>


        {/* Cards */}
        <div className="grid grid-cols-2 gap-6">
          {/* Bar chart (Direct vs Indirect) */}
          <DashboardCard04 bills={bills} />
          <DashboardCard10 title="Unpaid Customers" data={Unpaid} />
        </div>
        <div className="w-full">
        </div>

      </div>
    </main>
  );
}

export default Home;
import React, { useState, useEffect } from 'react';
import DashboardCard01 from '../../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../../partials/dashboard/DashboardCard05';
import axios from 'axios';

const Home = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dates, setDates] = useState([]);
    const [digits, setDigits] = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios.post(
                window.host+"/auth/getTransactions",
                {
                    token: sessionStorage.getItem(
                        "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
                    ),
                }
            );
            const x = response.data;
            setDates(x.map(x => x.total_paid));
            setDigits(x.map(x => x.payment_date));
            console.log(dates);
            console.log(digits);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
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
                <div className="grid grid-cols-12 gap-6">
                    {/* Line chart (Acme Plus) */}
                    {loading ? (
                        <DashboardCard01 title="Today" dates={dates} digits={digits} />
                    ) : (
                        <DashboardCard01 title="This Month" dates={[123, 123, 13, 123, 123, 13, 123, 123, 123]} digits={[123, 123, 13, 123, 123, 13, 123, 123, 123]} />
                    )}

                    {/* Line chart (Acme Advanced) */}
                    <DashboardCard01 title="This Month" dates={[123, 123, 13, 123, 123, 13, 123, 123, 123]} digits={[123, 123, 13, 123, 123, 13, 123, 123, 123]} />
                    {/* Line chart (Acme Professional) */}
                    <DashboardCard01 title="This Quarter" dates={[123, 123, 13, 123, 123, 13, 123, 123, 123]} digits={[123, 123, 13, 123, 123, 13, 123, 123, 123]} />
                    {/* Bar chart (Direct vs Indirect) */}
                    <DashboardCard04 />
                    {/* Line chart (Real Time Value) */}
                    <DashboardCard05 />
                </div>
            </div>
        </main>
    );
}

export default Home;
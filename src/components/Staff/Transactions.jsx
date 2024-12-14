import React, { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {
  const [transaction, setTransactions] = useState([]); // Initial state as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredTransaction, setFilteredTransaction] = useState([]);

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.post(
        window.host + "/auth/getTransactions",
        {
          token: sessionStorage.getItem(
            "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
          ),
        }
      );
      setTransactions(response.data);
      setFilteredTransaction(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  let i = 0;
  const renderData = [];
  while (i < transaction.length) {
    renderData.push(
      <tr
        key={i}
        className="text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <td scope="col" className="px-4 py-4 font-nunito">
          {transaction[i].payment_id}
        </td>
        <td scope="col" className="px-4 py-4 font-nunito">
          {transaction[i].customer}
        </td>
        <td scope="col" className="px-4 py-4 font-nunito">
          {transaction[i].cashier}
        </td>
        <td scope="col" className="px-4 py-4 font-nunito">
          {transaction[i].plan_name}
        </td>
        <td scope="col" className="px-4 py-4 font-nunito">
          {new Date(transaction[i].due_date).toISOString().split('T')[0]}
        </td>
        <td scope="col" className="px-4 py-4 font-nunito">
          {new Date(transaction[i].payment_date).toISOString().split('T')[0]}
        </td>
        <td scope="col" className="px-4 py-4 font-nunito">
          ₱ {transaction[i].rebate}.00
        </td>
        <td scope="col" className="text-green-600 px-4 py-4 font-nunito">
          ₱ {transaction[i].total_paid}.00
        </td>
      </tr>

    );
    i++;
  }

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <div className="flex justify-end items-end">
          <h2 className="font-bold mx-10 pt-5 text-lg font-lg text-gray-800 dark:text-white">
            Transactions
          </h2>
        </div>
      </div>

      <div className="flex flex-col mt-6 place-items-center w-full">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 text-center">
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-base font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap"
                    >
                      <div className="w-full flex justify-center items-center gap-x-3">
                        <span>Transaction Number</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-base font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap"
                    >
                      <div className="w-full flex justify-center items-center gap-x-3">
                        <span>Customer</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-base font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap"
                    >
                      <div className="w-full flex justify-center items-center gap-x-3">
                        <span>Cashier</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-base font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap"
                    >
                      <div className="w-full flex justify-center items-center gap-x-3">
                        <span>Plan Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-base font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap"
                    >
                      <div className="w-full flex justify-center items-center gap-x-3">
                        <span>Due Date</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-base font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap"
                    >
                      <div className="w-full flex justify-center items-center gap-x-3">
                        <span>Date Paid</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-base font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap"
                    >
                      <div className="w-full flex justify-center items-center gap-x-3">
                        <span>Prorated</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-base font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap"
                    >
                      <div className="w-full flex justify-center items-center gap-x-3">
                        <span>Total Paid</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="7" className="text-center text-red-600">
                        {error}
                      </td>
                    </tr>
                  ) : renderData.length > 0 ? (
                    renderData
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Nothing to Show
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transactions;

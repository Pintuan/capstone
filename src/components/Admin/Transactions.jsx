import React, { useEffect, useState } from "react";
import axios from "axios";
import ExportTransactions from "../Modals/exportTransactions";

const Transactions = () => {
  const [transaction, setTransactions] = useState([]); // Initial state as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ '76523': false, '76524': false });


  const verifyPayment = async (bill_id) => {
    try {
      const resp = await axios.post(window.host + "/auth/verifyPayment", {
        token: sessionStorage.getItem("3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"),
        bill_id: bill_id,
        user_id: sessionStorage.getItem("user_id")
      });
      if (resp) {
        alert(resp.data.message);
        fetchData(); // Refresh the data after successful payment
      } else {
        alert("Payment failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.post(window.host + "/auth/getTransactions", {
        token: sessionStorage.getItem(
          "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
        ),
      });
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = Object.values(filters).some(Boolean)
    ? transaction.filter(item => filters[item.stat])
    : transaction;
  const toggleFilter = (status) => {
    if (status === '76523') {
      setFilters({ '76524': false, '76523': true });
    }
    else if (status === '76524') {
      setFilters({ '76524': true, '76523': false });
    }
    else {
      setFilters({ '76524': false, '76523': false });
    }

  };
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <div className="flex justify-end items-end">
          <h2 className="font-bold mx-10 pt-5 text-lg font-lg text-gray-800 dark:text-white">
            Transactions
          </h2>
        </div>
      </div>
      <ExportTransactions />
      <div className="flex flex-col mt-6 place-items-center w-full">
        <div className="mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
          <div className="ml-8 inline-block bg-white border divide-x rounded-lg  dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
            <button
              onClick={() => {
                toggleFilter('all');
              }}
              className=" px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Show All
            </button>
            <button
              onClick={() => toggleFilter('76523')}
              className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Verified
            </button>

            <button
              onClick={() => toggleFilter('76524')}
              className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              On Hold
            </button>
          </div>
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
                        <span>Payment Type</span>
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
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-base font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap"
                    >
                      <div className="w-full flex justify-center items-center gap-x-3">
                        <span>Status</span>
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
                  ) : filteredData.length > 0 ? (
                    filteredData.map(item => (
                      <tr
                        key={item.payment_id}
                        className="text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <td scope="col" className="px-4 py-4 font-nunito">
                          {item.payment_id}
                        </td>
                        <td scope="col" className="px-4 py-4 font-nunito">
                          {item.customer}
                        </td>
                        <td scope="col" className="px-4 py-4 font-nunito">
                          {item.cashier}
                        </td>
                        <td scope="col" className="px-4 py-4 font-nunito">
                          {item.payment_type === "100000001" ? "Cash" : "Xendit"}
                        </td>
                        <td scope="col" className="px-4 py-4 font-nunito">
                          {new Date(item.due_date).toISOString().split("T")[0]}
                        </td>
                        <td scope="col" className="px-4 py-4 font-nunito">
                          {new Date(item.payment_date).toISOString().split("T")[0]}
                        </td>
                        <td scope="col" className="px-4 py-4 font-nunito">
                          {item.rebate}
                        </td>
                        <td scope="col" className="text-green-600 px-4 py-4 font-nunito">
                          ₱{item.total_paid}.00
                        </td>
                        <td scope="col" className="px-4 py-4 font-nunito">
                          {item.stat === "76524" ? (
                            <div>
                              <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" value={item.bill_id} onClick={(e) => { verifyPayment(e.target.value) }} type="button">
                                Accept Payment
                              </button>
                            </div>
                          ) : (
                            <div>
                              Payment Verified
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                    )
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

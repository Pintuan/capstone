import React, { useEffect, useState } from "react";
import DashboardCard06 from "../../partials/dashboard/DashboardCard06";
import Soa from "../Modals/SOA";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.post(
        window.host + "/auth/getCustomers",
        {
          token: sessionStorage.getItem(
            "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
          ),
          search: search
        }
      );
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);




  const renderData = [];
  let i = 0;
  while (i < customers.length) {
    renderData.push(
      <tr key={i}>
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {customers[i].account_id}
        </td>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center gap-x-3">
            <div className="flex items-center gap-x-2">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
              />
              <div>
                <h2 className="font-medium text-gray-800 dark:text-white ">
                  {customers[i].fullName}
                </h2>
              </div>
            </div>
          </div>
        </td>
        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

            <h2 className="text-sm font-normal text-emerald-500">
              {customers[i].stat == 5522 ? "Active" : "Waiting for Installation"}
            </h2>
          </div>
        </td>
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {customers[i].plan_name}
        </td>
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {customers[i].billing_date}
        </td>
        <td>
          <Soa account_id={customers[i].account_id} />
        </td>
      </tr>

    );
    i++;
  };

  return (
    <main className="grow">
      <div className="pl-4 w-full mx-auto">
        <div className="flex h-screen overflow-hidden">
          <section className="container px-4 mx-auto">
            <div className="flex items-center gap-x-2">
              <h1 className="mx-6 text-lg font-lg text-gray-800 dark:text-white font-bold">
                Customers List
              </h1>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                {customers.length} user
              </span>
            </div>
            <div>
              <label htmlFor="search" className="block text-sm text-gray-500 dark:text-gray-300">Search</label>

              <input id="search" onChange={(e) => { setSearch(e.target.value); fetchData(); }} type="text" className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />

              <p className="mt-3 text-xs text-gray-400 dark:text-gray-600">Search Specific Customers by Name</p>
            </div>
            <div className="flex flex-col mt-6">
              <div className="px-3 mx-4 my-2 overflow-x-auto sm:mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-4 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Account Number</span>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Name</span>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            <button className="flex items-center gap-x-2">
                              <span>Status</span>

                              <svg
                                className="h-3"
                                viewBox="0 0 10 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="0.1"
                                />
                                <path
                                  d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="0.1"
                                />
                                <path
                                  d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="0.3"
                                />
                              </svg>
                            </button>
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Current Plan
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Billing Date
                          </th>
                          <th>

                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              Loading...
                            </td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td
                              colSpan="7"
                              className="text-center text-red-600"
                            >
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
        </div>
      </div>
    </main>

  );
}

export default Customers;

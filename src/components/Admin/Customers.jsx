import React, { useEffect, useState } from "react";
import DashboardCard06 from "../../partials/dashboard/DashboardCard06";
import Soa from "../Modals/SOA";
import axios from "axios";
import UpdatePlan from "../Modals/UpdatePlan";
import ExportCustomers from "../Modals/exportCustomers";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({ '6201': false, '5522': true, '5462': false });
  const fetchData = async () => {
    try {
      const response = await axios.post(window.host + "/auth/getCustomers", {
        token: sessionStorage.getItem(
          "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
        ),
        search: search,
      });
      setCustomers(response.data);
      setFilteredCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  function countByStat(data) {
    return data.reduce((counts, item) => {
      counts[item.stat] = (counts[item.stat] || 0) + 1;
      return counts;
    }, {});
  }

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);

    // Filter rows based on the search term
    const filtered = customers.filter((row) =>
      Object.values(row).some(
        (value) =>
          value != null && // Check that value is not null or undefined
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );

    setFilteredCustomers(filtered); // Update filtered data
  };
  const filteredData = Object.values(filters).some(Boolean)
    ? filteredCustomers.filter(item => filters[item.stat])
    : filteredCustomers;

  const toggleFilter = (status) => {
    if (status === '5462') {
      setFilters({ '5462': true, '5522': false, '6201': false });
    }
    else if (status === '5522') {
      setFilters({ '5462': false, '5522': true, '6201': false });
    }
    else if (status === '6201') {
      setFilters({ '5462': false, '5522': false, '6201': true });
    }

  };


  const statCounts = countByStat(filteredCustomers);
  return (
    <main className="grow">
      <div className="pl-4 w-full mx-auto">
        <div className="flex h-screen overflow-hidden">
          <section className="container px-4 mx-auto">
            <div className="flex items-center gap-x-2">
              <h1 className="my-6 mx-6 text-lg font-lg text-gray-800 dark:text-white font-bold">
                Customers List
              </h1>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                {customers.length} user
              </span>
            </div>
            <div className="px-2">
              <label
                htmlFor="search"
                className="ml-4 block text-sm text-gray-500 dark:text-gray-300"
              >
                Search
              </label>
              <input
                id="search"
                onChange={handleSearch}
                type="text"
                className="mx-2 mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
              <p className="ml-2 mt-3 text-xs text-gray-400 dark:text-gray-600">
                Search Specific Customers by Name
              </p>
            </div>
            <div className="flex flex-col mt-2">
              <ExportCustomers />
              <div className="px-3 mx-4 my-2 sm:mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-4 align-middle md:px-6 lg:px-8">
                  <div className="ml-8 inline-block bg-white border divide-x rounded-lg  dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
                    <button
                      onClick={() => {
                        toggleFilter('5522');
                      }}
                      className=" px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                      Active
                      <div className={`text-sm font-medium px-1.5 rounded-full text-green-700 bg-green-500/20`}>
                        {statCounts['5522']}
                      </div>
                    </button>
                    <button
                      onClick={() => toggleFilter('6201')}
                      className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                      Waiting for Installation
                      <div className={`text-sm font-medium px-1.5 rounded-full text-blue-700 bg-blue-500/20`}>
                        {statCounts['6201']}
                      </div>
                    </button>

                    <button
                      onClick={() => toggleFilter('5462')}
                      className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                      Denied
                      <div className={`text-sm font-medium px-1.5 rounded-full text-red-700 bg-red-500/20`}>
                        {statCounts['5462']}
                      </div>
                    </button>
                  </div>
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <div className="max-h-96 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 px-4 text-sm font-normal text-center rtl:text-center text-gray-500 dark:text-gray-400"
                            >
                              <div className="flex items-center justify-center gap-x-3">
                                <span>Account Number</span>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 px-4 text-sm font-normal text-center rtl:text-center text-gray-500 dark:text-gray-400"
                            >
                              <div className="flex items-center justify-center gap-x-3">
                                <span>Name</span>
                              </div>
                            </th>

                            <th
                              scope="col"
                              className="px-12 py-3.5 text-sm font-normal text-center flex items-center justify-center rtl:text-center text-gray-500 dark:text-gray-400"
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
                              className="px-4 py-3.5 text-sm font-normal text-center rtl:text-center text-gray-500 dark:text-gray-400"
                            >
                              Current Plan
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-center rtl:text-center text-gray-500 dark:text-gray-400"
                            >
                              Billing Date
                            </th>
                            <th></th>
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
                          ) : filteredData.length > 0 ? (
                            filteredData.map(item => (
                              <tr key={item.account_id}>
                                <td className="text-center px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  {item.account_id}
                                </td>
                                <td className="text-center px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="inline-flex items-center gap-x-3">
                                    <div className="flex items-center gap-x-2">
                                      <h2 className="font-medium text-gray-800 dark:text-white">
                                        {item.fullName}
                                      </h2>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                    <span className={`h-1.5 w-1.5 rounded-full ${item.stat == 5522 ? "bg-emerald-500" : item.stat == 5462 ? "bg-red-500" : "bg-blue-500"}`}></span>

                                    <h2 className={`text-sm font-normal ${item.stat == 5522 ? "text-emerald-500" : item.stat == 5462 ? "text-red-500" : "text-blue-500"}`}>
                                      {item.stat == 5522
                                        ? "Active"
                                        : item.stat == 5462 ? "Denied" : "Waiting for Installation"}
                                    </h2>
                                  </div>
                                </td>
                                <td className="text-center px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  {item.plan_name}
                                </td>
                                <td className="text-center px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  {item.billing_date}
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  {item.stat != 5522 ? null :
                                    <div className="flex items-center gap-x-6">
                                      <Soa
                                        account_id={item.account_id}
                                        email={item.email}
                                      />
                                    </div>
                                  }
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
            </div>

          </section>
        </div>
      </div>
    </main>
  );
}

export default Customers;

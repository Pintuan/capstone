import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {format} from "date-fns"

function DashboardCard12() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post(window.host + "/auth/getLogs", { token: sessionStorage.getItem("3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"), });
      setLogs(response.data.data);
      console.log(response);

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
  const renderData = logs.map((logs) => (
    <tr
      key={logs.log_id}
      className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {logs.fullname}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {format(new Date(logs.time_date), "yyyy-MM-dd")}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {logs.action_taken}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {logs.ip_address}
      </td>
    </tr>
  ));

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-1">
        <table className="min-w-full w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="py-3.5 px-4 text-base font-medium text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                User's Name
              </th>
              <th className="py-3.5 px-4 text-base font-medium text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Date
              </th>
              <th className="py-3.5 px-4 text-base font-medium text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Action Taken
              </th>
              <th className="py-3.5 px-4 text-base font-medium text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody className="content-center">
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
  );
}

export default DashboardCard12;

import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardCard06 from "../../partials/dashboard/DashboardCard06";
import PlanModal from "../Modals/planModal";
import Select_Plan from "../Modals/Select_Plan";
import Deactivate from "../Modals/Deactivate";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.post("http://13.211.183.92/auth/getPlans", {
        token: sessionStorage.getItem(
          "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
        ),
      });
      setPlans(response.data);
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
  while (i < plans.length) {
    renderData.push(
      <tr key={plans[i].planId} className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
        <td></td>
        <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">{plans[i].plan_name}</td>
        <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">{plans[i].plan_speed}</td>
        <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">{plans[i].plan_price}</td>
        <td className="flex justify-center gap-2 py-4 px-4 whitespace-nowrap">
          <Select_Plan action="edit" plan_id={plans[i].planId} />
          {plans[i].stat == 16340 ? (
            <Deactivate />
          ) : (
            <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Activate
            </button>
          )}
        </td>
      </tr>
    );
    i++;
  }

  return (
    <main className="grow">
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <div className="flex justify-end items-end">
            <h2 className="font-bold mx-10 pt-5 text-lg font-lg text-gray-800 dark:text-white">
              Plans
            </h2>
          </div>
        </div>

        <div className="flex flex-col mt-6 place-items-center w-full">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 text-center">
              <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                        Subscriber Count
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                        Plan Name
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                        Speed
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                        Price
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                        Action
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
    </main>
  );
};

export default Plans;

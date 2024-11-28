import axios from "axios";
import React, { useState } from "react";

const Approved = () => {
  const [i_error, seti_Error] = useState(null);
  const [i_showModal, seti_ShowModal] = useState(false);
  const [i_tech, seti_Tech] = useState("");
  const [i_tl, seti_TL] = useState("");
  const [i_status, seti_Status] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Selected time: ${time.hour}:${time.minute} ${time.period}`);

    try {
      const response = await axios.post(
        "http://localhost:7222/auth/hjgsahdghahasdhasdnjansgdSAKNB",
        {
          i_tech,
          i_tl,
          i_status,
        }
      );
      seti_ShowModal(false); // Close modal on successful submission
    } catch (err) {
      seti_Error("Failed to submit form: " + err.message);
    }
  };
  return (
    <>
      <button
        className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        type="button"
        onClick={() => seti_ShowModal(true)}
      >
        {" "}
        Approved
      </button>
      {i_showModal ? (
        <>
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="relative p-6 bg-white rounded-md shadow-md dark:bg-gray-800 max-w-6xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-4">
                  Approved
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => seti_ShowModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="ml-2 max-w-6xl p-6 mx-auto bg-white dark:bg-gray-800 mt-4 overflow-y-auto max-h-[80vh] text-left">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-200">
                      Status
                    </label>
                    <select
                      value={i_status}
                      onChange={(e) => seti_Status(e.target.value)}
                      className="block w-full px-5 py-3 mt-1 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="" disabled>
                        Status
                      </option>
                      <option value="Stat1">Completed</option>
                      <option value="Stat2">Re-Schedule</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Team Leader
                      </label>
                      <select
                        value={i_tl}
                        onChange={(e) => seti_TL(e.target.value)}
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      >
                        <option value="" disabled>
                          Select Team Leader
                        </option>
                        <option value="TL2">RAUL GONZALES</option>
                        <option value="TL3">JAKE JARELLE CARLOS</option>
                        <option value="TL4">ARMAN PEÑARANDA</option>
                        <option value="TL5">CHRISTOPHER ALFONSO</option>
                        <option value="TL6">Other:</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Technician
                      </label>
                      <select
                        value={i_tech}
                        onChange={(e) => seti_Tech(e.target.value)}
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      >
                        <option value="" disabled>
                          Select Tech
                        </option>
                        <option value="Tech1">JOEL FELIPE</option>
                        <option value="Tech2">JAKE JARELLE CARLOS</option>
                        <option value="Tech3">JAIME LUMPAYAO</option>
                        <option value="Tech4">RAMON SOL CRUZ</option>
                        <option value="Tech5">JOBERT VILLAFAÑA</option>
                        <option value="Tech6">Other: </option>
                      </select>
                    </div>
                    {i_error && (
                      <p className="mt-4 text-red-600 dark:text-red-400 text-right">
                        {i_error}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button className="flex items-center justify-center w-50 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 hover:bg-blue-800 rounded-lg bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      <span className="text-center">Submit</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default Approved;

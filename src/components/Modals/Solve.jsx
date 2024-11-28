import axios from "axios";
import React, { useState } from "react";

const Solve = () => {
  const [s_error, sets_Error] = useState(null);
  const [s_showModal, sets_ShowModal] = useState(false);
  const [s_contactNum, sets_ContactNum] = useState("");
  const [s_time, sets_Time] = useState({ hour: "", minute: "", period: "AM" });
  const [s_tech, sets_Tech] = useState("");
  const [s_server, sets_Server] = useState("");
  const [s_firstName, sets_FirstName] = useState("");
  const [s_middleName, sets_MiddleName] = useState("");
  const [s_lastName, sets_LastName] = useState("");
  const [s_maps, sets_Maps] = useState("");
  const [s_plans, sets_Plans] = useState("");
  const [s_pppoe, sets_PPPEO] = useState("");
  const [s_o_contact, sets_O_Contact] = useState("");
  const [s_napPort, sets_NapPort] = useState("");
  const [s_napReading, sets_NapReading] = useState("");
  const [s_insideReading, sets_InsideReading] = useState("");
  const [s_comment, sets_Comment] = useState("");
  const [s_duration, sets_Duration] = useState("");
  const [s_opticalReading, sets_OpticalReading] = useState("");
  const [s_tl, sets_TL] = useState("");
  const [s_status, sets_Status] = useState("");
  const [s_napfName, sets_NapFName] = useState("");
  const [s_barangay, sets_Barangay] = useState("");
  const [s_purok, sets_Purok] = useState("");
  const [s_street, sets_Street] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    s_time((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Selected time: ${time.hour}:${time.minute} ${time.period}`);

    try {
      const response = await axios.post(
        "http://localhost:7222/auth/hjgsahdghahasdhasdnjansgdSAKNB",
        {
          s_contactNum,
          s_time,
          s_tech,
          s_server,
          s_maps,
          s_plans,
          s_pppoe,
          s_napfName,
          s_napPort,
          s_napReading,
          s_insideReading,
          s_comment,
          s_tl,
          s_status,
          s_firstName,
          s_middleName,
          s_lastName,
          s_o_contact,
          s_opticalReading,
          s_duration,
          s_barangay,
          s_purok,
          s_street,
        }
      );
      sets_ShowModal(false); 
    } catch (err) {
      sets_Error("Failed to submit form: " + err.message);
    }
  };
  return (
    <>
      <button
        className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        type="button"
        onClick={() => sets_ShowModal(true)}
      >
        {" "}
        Solve
      </button>
      {s_showModal ? (
        <>
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="relative p-6 bg-white rounded-md shadow-md dark:bg-gray-800 max-w-6xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-4">
                  {" "}
                  Installation{" "}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => sets_ShowModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="ml-2 max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-4 overflow-y-auto max-h-[80vh] text-left">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-200">
                      Status
                    </label>
                    <select
                      value={s_status}
                      onChange={(e) => sets_Status(e.target.value)}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
                        value={s_tl}
                        onChange={(e) => sets_TL(e.target.value)}
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
                        value={s_tech}
                        onChange={(e) => sets_Tech(e.target.value)}
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
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Server
                    </label>
                    <select
                      value={s_server}
                      onChange={(e) => sets_Server(e.target.value)}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="" disabled>
                        {" "}
                        Select Server
                      </option>
                      <option value="Server1">
                        MAIN (SANTA ELENA, SAGRADA, SAN PABLO, SAN PEDRO, SAN
                        AGUSTIN)
                      </option>
                      <option value="Server2">
                        SAN SEBASTIAN (SAN NICOLAS, SAN SEBASTIAN, MERCADO, SAN
                        JOSE, SANTA MONICA, STO. NIÑO)
                      </option>
                      <option value="Server3">
                        SAN ISIDRO (TAMPOK, SAN ISIDRO, PANDUCOT)
                      </option>
                      <option value="Server4">
                        PALAPAT (IBA, CARILLO, PALAPAT, SAN MIGUEL, SAN JUAN,
                        SAN ISIDRO, PANDUCOT)
                      </option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <h3 className="col-span-3 font-semibold text-gray-700 dark:text-gray-300 mt-2">
                      Subscriber's Name
                    </h3>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={s_firstName}
                        onChange={(e) => sets_FirstName(e.target.value)}
                        placeholder="Enter first name"
                        className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        value={s_middleName}
                        onChange={(e) => sets_MiddleName(e.target.value)}
                        placeholder="Enter middle name (optional)"
                        className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={s_lastName}
                        onChange={(e) => sets_LastName(e.target.value)}
                        placeholder="Enter last name"
                        className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <h3 className="col-span-3 font-semibold text-gray-700 dark:text-gray-300 mt-2">
                      Address Details
                    </h3>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Street
                      </label>
                      <input
                        type="text"
                        value={s_street}
                        onChange={(e) => sets_Street(e.target.value)}
                        placeholder="Enter street name"
                        className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Purok
                      </label>
                      <input
                        type="text"
                        value={s_purok}
                        onChange={(e) => sets_Purok(e.target.value)}
                        placeholder="Enter purok"
                        className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Barangay
                      </label>
                      <input
                        type="text"
                        value={s_barangay}
                        onChange={(e) => sets_Barangay(e.target.value)}
                        placeholder="Enter barangay"
                        className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Contact number
                    </label>
                    <div className="flex items-center mt-2">
                      <p className="py-2.5 px-3 text-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-r-0 rtl:rounded-r-lg rtl:rounded-l-none rtl:border-l-0 rtl:border-r rounded-l-lg">
                        +63
                      </p>
                      <input
                        type="text"
                        placeholder="9XX-XXX-XXXX"
                        value={s_contactNum}
                        onChange={(e) => sets_ContactNum(e.target.value)}
                        className="block w-full rounded-l-none rtl:rounded-l-lg rtl:rounded-r-none placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Other Contact Number
                    </label>
                    <input
                      type="text"
                      value={s_o_contact}
                      onChange={(e) => sets_O_Contact(e.target.value)}
                      placeholder="Optional"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      PPPOE
                    </label>
                    <input
                      type="text"
                      value={s_pppoe}
                      onChange={(e) => sets_PPPEO(e.target.value)}
                      placeholder=""
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        NAP Facility Name
                      </label>
                      <input
                        type="text"
                        value={s_napfName}
                        onChange={(e) => sets_NapFName(e.target.value)}
                        placeholder=""
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        NAP PORT Number
                      </label>
                      <input
                        type="text"
                        value={s_napPort}
                        onChange={(e) => sets_NapPort(e.target.value)}
                        placeholder=""
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        NAP Reading
                      </label>
                      <input
                        type="text"
                        value={s_napReading}
                        onChange={(e) => sets_NapReading(e.target.value)}
                        placeholder=""
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Inside Reading
                    </label>
                    <input
                      type="text"
                      value={s_insideReading}
                      onChange={(e) => sets_InsideReading(e.target.value)}
                      placeholder=""
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Optical Reading
                    </label>
                    <input
                      type="text"
                      value={s_opticalReading}
                      onChange={(e) => sets_OpticalReading(e.target.value)}
                      placeholder=""
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Maps Location
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      value={s_maps}
                      onChange={(e) => sets_Maps(e.target.value)}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Start Time
                      </label>
                      <div className="flex items-center">
                        <select
                          name="hour"
                          value={s_time.hour}
                          onChange={handleChange}
                          className="mr-2 px-3 py-2 border rounded w-40 dark:bg-gray-600 dark:text-gray-100 bg-gray-300 text-gray-800"
                        >
                          <option value="" disabled>
                            Select Hour
                          </option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (hour) => (
                              <option key={hour} value={hour}>
                                {hour}
                              </option>
                            )
                          )}
                        </select>
                        <select
                          name="minute"
                          value={s_time.minute}
                          onChange={handleChange}
                          className="mr-2 px-3 py-2 border rounded w-40 dark:bg-gray-600 dark:text-gray-100 bg-gray-300 text-gray-800"
                        >
                          <option value="" disabled>
                            Select Minute
                          </option>
                          {Array.from({ length: 60 }, (_, i) => i).map(
                            (minute) => (
                              <option key={minute} value={minute}>
                                {minute < 10 ? `0${minute}` : minute}
                              </option>
                            )
                          )}
                        </select>
                        <select
                          name="period"
                          value={s_time.period}
                          onChange={handleChange}
                          className="mr-2 px-3 py-2 border rounded w-40 dark:bg-gray-600 dark:text-gray-100 bg-gray-300 text-gray-800"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        End Time
                      </label>
                      <div className="flex items-center">
                        <select
                          name="hour"
                          value={s_time.hour}
                          onChange={handleChange}
                          className="mr-2 px-3 py-2 border rounded w-40 dark:bg-gray-600 dark:text-gray-100 bg-gray-300 text-gray-800"
                        >
                          <option value="" disabled>
                            Select Hour
                          </option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (hour) => (
                              <option key={hour} value={hour}>
                                {hour}
                              </option>
                            )
                          )}
                        </select>
                        <select
                          name="minute"
                          value={s_time.minute}
                          onChange={handleChange}
                          className="mr-2 px-3 py-2 border rounded w-40 dark:bg-gray-600 dark:text-gray-100 bg-gray-300 text-gray-800"
                        >
                          <option value="" disabled>
                            Select Minute
                          </option>
                          {Array.from({ length: 60 }, (_, i) => i).map(
                            (minute) => (
                              <option key={minute} value={minute}>
                                {minute < 10 ? `0${minute}` : minute}
                              </option>
                            )
                          )}
                        </select>
                        <select
                          name="period"
                          value={s_time.period}
                          onChange={handleChange}
                          className="mr-2 px-3 py-2 border rounded w-40 dark:bg-gray-600 dark:text-gray-100 bg-gray-300 text-gray-800"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      value={s_duration}
                      onChange={(e) => sets_Duration(e.target.value)}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Remarks
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      value={s_comment}
                      onChange={(e) => sets_Comment(e.target.value)}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {s_error && (
                      <p className="mt-4 text-red-600 dark:text-red-400 text-right">
                        {s_error}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button className="flex items-center justify-center w-50 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform hover:bg-blue-800 rounded-lg bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
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
export default Solve;

import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";

const ExportTransaction = () => {
  // Ensure 'email' is passed as a prop
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bill, setBill] = useState([]);
  const [filteredBill, setFilteredBill] = useState([]);
  // States for start and end dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const componentRef = useRef(); // Reference to the component

  const getBills = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${window.host}/auth/getTransactions`, {
        authorizationToken: sessionStorage.getItem("user_id"),
      });
      setBill(response.data);
      setFilteredBill(response.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch Transaction history. Please try again later.");
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!componentRef.current) return; // Ensure the ref is attached

    try {
      setLoading(true);
      setError("");

      console.log("Generating PDF...");
      const element = componentRef.current; // Get the component DOM element
      const canvas = await html2canvas(element, { scale: 1 }); // Reduced scale factor
      const imgData = canvas.toDataURL("image/jpeg", 1); // Use JPEG with 80% quality
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 280; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF("p", "mm", "A4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight); // Use JPEG format

      let position = 0;

      // Add the first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add page number
        pdf.setFontSize(11);
        const pageNumber = pdf.internal.getNumberOfPages();
        pdf.text(`${pageNumber}`, 105, 290, null, null, "center"); // Centered at the bottom
      }
      pdf.save("Sales_report" + Date.now() + ".pdf");
      setLoading(false);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      setError("An error occurred while exporting the PDF.");
      setLoading(false);
    }
  };

  const convertToMMDDYYYY = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };
  const handleFilter = () => {
    console.log(startDate, endDate);
    if (!startDate || !endDate) setFilteredBill(bill);

    const filtered = bill.filter((item) => {
      const itemDate = new Date(item.payment_date);
      return (
        itemDate >= new Date(convertToMMDDYYYY(startDate)) && itemDate <= new Date(convertToMMDDYYYY(endDate))
      );
    });

    setFilteredBill(filtered);
  };
  const renderData = [];
  const bill_id = [];
  let i = 0;
  let invoicedAmount = 0; // Corrected spelling
  let amount_paid = 0; // Corrected spelling
  let fullName = "";
  let address = "";
  while (i < filteredBill.length) {
    renderData.push(
      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          {new Date(filteredBill[i].payment_date).toLocaleDateString()}
        </td>
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          {filteredBill[i].customer}
        </td>
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          {filteredBill[i].payment_id}
        </td>
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          {filteredBill[i].payment_type === "100000001" ? "Cash" : "Xendit"}
        </td>
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          PHP {Number(filteredBill[i].total_paid).toFixed(2)}
        </td>
      </tr>
    );
    bill_id.push(filteredBill[i].bill_id);
    invoicedAmount += Number(filteredBill[i].ammount);
    amount_paid += Number(filteredBill[i].total_paid);
    fullName = `${filteredBill[i].first_name} ${filteredBill[i].last_name}`;
    address = filteredBill[i].address;
    i++;
  }

  return (
    <>
      <div className="flex justify-end ">
        <button
          className="ml-auto mr-9 px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          onClick={() => {
            console.log("View Statement of Account clicked");
            getBills();
            setShowModal(true);
          }}
        >
          Export Transactions
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="relative w-full max-w-6xl mx-4">
            <div className="border-0 rounded-lg shadow-lg flex flex-col w-full bg-white dark:bg-gray-800">
              <button
                className="absolute top-[26px] right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none border-[1px] border-gray-200 rounded-sm px-2 py-1"
                onClick={() => setShowModal(false)}
                aria-label="Close Modal"
              >
                ✕
              </button>
              <div className="p-6 overflow-y-auto max-h-screen">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleExportPDF}
                    className="mr-8 px-8 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Processing..." : "Export PDF"}
                  </button>
                </div>
                {/* Date Filters */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-1">
                  <label className="flex flex-col text-gray-700 font-medium">
                    Start Date:
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900"
                    />
                  </label>
                  <label className="flex flex-col text-gray-700 font-medium">
                    End Date:
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900"
                    />
                  </label>
                  <button onClick={handleFilter}>Filter Data</button>
                </div>
                <div
                  ref={componentRef}
                  className="p-8 bg-gray-100 border border-gray-300 rounded-lg"
                >
                  <div className="flex items-center mb-6">
                    <img
                      src="/onekonek logo_only.svg"
                      alt="OneKonek Logo"
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">
                        ONE-KONEK NETWORK AND DATA SOLUTION
                      </h1>
                      <h1 className="text-2xl font-bold text-gray-800">
                        TRANSACTIONS REPORT
                      </h1>
                      <p className="text-gray-600">Company ID: 001</p>
                      <p className="text-gray-600">Tax ID: 343297890000</p>
                      <p className="text-gray-600">0505 Purok 2 Looban</p>
                      <p className="text-gray-600">Barangay Santa Elena</p>
                      <p className="text-gray-600">
                        Hagonoy Bulacan 3002, Philippines
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        Coverage Date : {convertToMMDDYYYY(startDate)} - {convertToMMDDYYYY(endDate)}
                      </p>
                      <h3 className=" text-xl text-gray-600">Total Ammount : PHP {amount_paid}.00</h3>

                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Date
                          </th><th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Customer Name
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Transactions Number
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Payment Type
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-4 py-6 text-center text-gray-600"
                            >
                              Loading...
                            </td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-4 py-6 text-center text-red-600"
                            >
                              {error}
                            </td>
                          </tr>
                        ) : renderData.length > 0 ? (
                          renderData
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-4 py-6 text-center text-gray-600"
                            >
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
        </div>
      )}
    </>
  );
};

export default ExportTransaction;

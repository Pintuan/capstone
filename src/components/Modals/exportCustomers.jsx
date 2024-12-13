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
  // States for start and end dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const componentRef = useRef(); // Reference to the component

  const getBills = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${window.host}/auth/exportCustomers`, {
        authorizationToken: sessionStorage.getItem("user_id"),
      });
      setBill(response.data.resp);
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
      pdf.save("CustomerReport" + Date.now() + ".pdf");
      setLoading(false);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      setError("An error occurred while exporting the PDF.");
      setLoading(false);
    }
  };

  const renderData = [];
  let i = 0;
  let invoicedAmount = 0; // Corrected spelling
  let amount_paid = 0; // Corrected spelling
  while (i < bill.length) {
    if (bill[i].stat != 6201 && bill[i].Payables != null) {
      renderData.push(
        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
          <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
            {bill[i].account_id}
          </td>
          <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
            {bill[i].fullName}
          </td>
          <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
            {bill[i].address}
          </td>
          <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
            PHP {Number(bill[i].Payables).toFixed(2)}
          </td>
          <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
            PHP {Number(bill[i].Paid).toFixed(2)}
          </td>
        </tr>
      );
      amount_paid += Number(bill[i].Paid);
      invoicedAmount += Number(bill[i].Payables);
    }
    i++;
  }

  return (
    <>
      <div className="flex justify-end ">
        <button
          className="ml-auto mr-9 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          onClick={() => {
            console.log("View Statement of Account clicked");
            getBills();
            setShowModal(true);
          }}
        >
          Generate Customers Data
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
                      <p className="text-gray-600">Company ID: 001</p>
                      <p className="text-gray-600">Tax ID: 343297890000</p>
                      <p className="text-gray-600">0505 Purok 2 Looban</p>
                      <p className="text-gray-600">Barangay Santa Elena</p>
                      <p className="text-gray-600">
                        Hagonoy Bulacan 3002, Philippines
                      </p>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-gray-600">
                    Total Payables : PHP {invoicedAmount}.00
                  </div>
                  <div className="text-2xl font-bold text-gray-600">
                    Total Paid : PHP {amount_paid}.00
                  </div>
                  <div className="text-2xl font-bold text-gray-600">
                    Total Balance : PHP {invoicedAmount - amount_paid}.00
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Account Number
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Full Name
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Address
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Recievables
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Paid
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

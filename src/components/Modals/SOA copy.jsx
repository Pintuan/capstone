import React from "react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Downloads = ({ account_id }) => {

  const componentRef = useRef(); // Reference to the component

  const handleExportPDF = async () => {
    const element = componentRef.current; // Get the component DOM element
    const canvas = await html2canvas(element); // Render the element to a canvas
    const imgData = canvas.toDataURL("image/png"); // Get the image data from the canvas

    const pdf = new jsPDF("p", "mm", "legal");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Add the image to the PDF
    pdf.save(account_id + "SOA" + Date.now() + ".pdf"); // Save the PDF
  };
  return (

    <div className="bg-gray-100 text-gray-800 font-sans max-w-5xl mx-auto p-5 border border-gray-300 rounded-lg">
      {/* SOA1 */}
      <div className="flex justify-between items-center mb-5">

        <div>
          <button onClick={handleExportPDF} className="mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Download PDF
          </button>
        </div>
      </div>
      <div
        ref={componentRef}
        style={{
          padding: "20px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      >
        <div className="mt-10 text-gray-800">

          <div className="flex justify-between mb-5">
            <div>
              <p>To</p>
              <p className="font-semibold">DITAS RAMOS</p>
              <p>02N2-SSVILLA - Wawa Uno</p>
              <p>Barangay San Sebastian</p>
              <p>Hagonoy</p>
              <p>3002 Bulacan, Philippines</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-bold">
                ONE-KONEK NETWORK AND DATA SOLUTION
              </h2>
              <p>Company ID: 001</p>
              <p>Tax ID: 343297890000</p>
              <p>0505 Purok 2 Looban</p>
              <p>Barangay Santa Elena</p>
              <p>Hagonoy Bulacan 3002, Philippines</p>
            </div>
          </div>

          <div className="flex justify-end w-full">
            <div className="w-1/3">
              <h3 className="text-center text-xl font-bold mb-2">
                STATEMENT OF ACCOUNT
              </h3>
              <p className="text-right border-y border-y-gray-900 text-center mb-2">
                01 Jan 2024 To 31 Dec 2024
              </p>

              <div className="flex justify-between mb-5">
                <div className="w-full">
                  <div className="bg-gray-300  rounded-md text-left">
                    <h4 className="ml-2 font-semibold p-2">Account Summary</h4>
                  </div>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <td className="px-3 py-2">Opening Balance</td>
                        <td className="px-3 py-2 text-right">PHP 0.00</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Invoiced Amount</td>
                        <td className="px-3 py-2 text-right">PHP 0.00</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Amount Paid</td>
                        <td className="px-3 py-2 text-right">PHP 0.00</td>
                      </tr>
                      <tr className="bg-gray-200">
                        <td className="px-3 py-2">Balance Due</td>
                        <td className="px-3 py-2 text-right">PHP 0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <table className="w-full border-collapse border border-gray-300 mt-5">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2">Date</th>
                <th className="border border-gray-300 px-3 py-2">Transactions</th>
                <th className="border border-gray-300 px-3 py-2">Details</th>
                <th className="border border-gray-300 px-3 py-2">Amount</th>
                <th className="border border-gray-300 px-3 py-2">Payments</th>
                <th className="border border-gray-300 px-3 py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2">01 Jan 2024</td>
                <td className="border border-gray-300 px-3 py-2">
                  ***Opening Balance***
                </td>
                <td className="border border-gray-300 px-3 py-2"></td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  0.00
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  0.00
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  0.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Downloads;

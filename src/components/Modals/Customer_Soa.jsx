import React from "react";

const CustomerSoa = ({ isOpen, onClose, receiptData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className="text-blue-500 underline hover:text-blue-600"
          >
            &lt; Back to Payments Made
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Download PDF
          </button>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">ONE-KONEK NETWORK AND DATA SOLUTION</h2>
          <p className="text-gray-600">
            Company ID: 001 <br />
            Tax ID: 342937890000 <br />
            0029 MH Del Pilar, Barangay San Sebastian, Hagonoy Bulacan 3002, Philippines
          </p>
        </div>

        <h3 className="text-xl font-semibold text-center mt-8 mb-4">PAYMENT RECEIPT</h3>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <p><strong>Payment Date:</strong> {receiptData.paymentDate}</p>
            <p><strong>Reference Number:</strong> {receiptData.referenceNumber}</p>
            <p><strong>Payment Mode:</strong> {receiptData.paymentMode}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-green-800 font-bold">Amount Received</p>
            <p className="text-2xl font-bold text-green-700">PHP {receiptData.amountReceived}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold">Bill To:</h3>
          <p className="text-gray-700">
            {receiptData.customerName} <br />
            {receiptData.customerAddress} <br />
            {receiptData.customerCity}, {receiptData.customerZip}, Philippines
          </p>
        </div>

        <table className="w-full border border-gray-200 mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-medium text-gray-600">Invoice Number</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600">Invoice Date</th>
              <th className="py-2 px-4 text-right font-medium text-gray-600">Invoice Amount</th>
              <th className="py-2 px-4 text-right font-medium text-gray-600">Payment Amount</th>
            </tr>
          </thead>
          <tbody>
            {receiptData.payments.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 text-gray-700">{payment.invoiceNumber}</td>
                <td className="py-2 px-4 text-gray-700">{payment.invoiceDate}</td>
                <td className="py-2 px-4 text-right text-gray-700">PHP {payment.invoiceAmount}</td>
                <td className="py-2 px-4 text-right text-gray-700">PHP {payment.paymentAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSoa;

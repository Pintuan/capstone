import React, { useState } from "react";
import { useParams } from "react-router-dom";

const LoginFP = () => {
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  setUserId(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (regex.test(newPassword)) {
        const resp = await axios.post(window.host + 'auth/ActivateAccount', {
          newPassword: newPassword,
          account_id: userId
        });
        if (resp.data.success) {
          alert("Password updated successfully!");
          window.location.replace("/login");
        }
      }
      else {
        setError("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
      }
    } else {
      setError("Password does not match");
      // Handle password update logic here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-blue-700 dark:from-gray-800 dark:to-gray-500">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-left text-gray-800 dark:text-white mb-6">
          Create your Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-base font-medium text-gray-800 dark:text-gray-200"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
              required
            />
            <p className="my-2">
              Please enter your new password.
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-base font-medium text-gray-800 dark:text-gray-200"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
              required
            />
            <p className="my-2">
              Re-enter your new password to confirm it matches. This helps
              ensure your password is correct.
            </p>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-end mt-6">
            <button className="px-6 py-3 text-base font-semibold text-white  bg-blue-600 dark:bg-blue-700 rounded-lg dark:hover:bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginFP;

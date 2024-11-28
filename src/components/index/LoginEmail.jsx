import React, { useState } from "react";
import axios from "axios";

const LoginEmail = () => {
  const [email, setEmail] = useState("");
  const [resp, setResponse] = useState("To retrieve access to your account, please enter your email address.");
  const [state, setState] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://13.211.183.92/auth/forgot-password", { email: email });
      console.log(response);
      setResponse(response.data.resp);
      setState("text-green-100");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-blue-700 dark:from-gray-800 dark:to-gray-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-left text-gray-800 dark:text-white mb-6">
          Forgot your Password?
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className='mb-4'>
            <div className={state}> {resp}</div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
              required
              aria-label="Email"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button type="submit"
              className="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginEmail;

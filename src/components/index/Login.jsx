import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!username || !password) {
      setError(
        "Please enter both username and password. not connecting to  authenticator"
      );
      return;
    }

    try {
      const response = await axios.post(window.host + "/auth/login", {
        username,
        password,
      });
      if (
        response != null ||
        localStorage.getItem(
          "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
        ) == null
      ) {
        let data = response.data.zhas2chasT;
        const path = await axios.post(window.host + "/auth/redirect", {
          data,
        });
        sessionStorage.setItem(
          "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0",
          response.data.token
        );
        sessionStorage.setItem(
          sessionStorage.getItem(
            "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
          ),
          response.data.auth
        );
        sessionStorage.setItem(
          "a0af9f865bf637e6736817f4ce552e4cdf7b8c36ea75bc254c1d1f0af744b5bf",
          path.data.path
        );
        const authorizationToken = sessionStorage.getItem(
          sessionStorage.getItem(
            "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
          )
        );
        const resp = await axios.post(
          window.host + "/auth/fgbjmndo234bnkjcslknsqewrSADqwebnSFasq",
          { authorizationToken }
        );
        let metadata = resp.data.rawData[0];
        Object.entries(metadata).forEach(([key, value]) => {
          sessionStorage.setItem(key, value);
        });
        sessionStorage.setItem("image", resp.data.image);
        sessionStorage.setItem("username", username);
        window.location.href = path.data.path;
        console.log(path.data.path);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-gray-50 to-blue-700 dark:from-gray-800 dark:to-gray-500 min-h-screen overflow-hidden">
      <div className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transition-transform transform hover:scale-105">
        <div className="absolute inset-x-0 top-[-4rem] flex justify-center">
          <div className="w-36 h-36 rounded-full bg-gray-100 dark:bg-gray-700 border-4 border-gray-300 dark:border-gray-500 flex items-center justify-center">
            <img
              className="brightness-90 w-32 h-32 rounded-full"
              src="profile_icon.png" // Replace with your image path
              alt="User Profile"
            />
          </div>
        </div>
        <div className="pt-14"></div>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-base font-medium text-gray-800 dark:text-gray-200"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
              required
              aria-label="Username"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-800 dark:text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
              required
              aria-label="Password"
            />
          </div>
          <div className="my-4">
            {error && (
              <p className="text-red-500 text-sm text-right">{error}</p>
            )}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-6 py-3 text-base font-semibold text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
              Sign In
            </button>
          </div>
          <div className="text-right">
            <a
              href="/loginEmail"
              className="text-sm text-gray-800 dark:text-gray-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

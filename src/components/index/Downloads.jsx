import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Downloads = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/splashscreen_app.png",
    "/login_app.png",
    "/landingpage_app.png",
  ];

  // Previous slide function
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Next slide function
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        <div className="w-full md:w-1/3 flex items-center justify-center py-4 md:py-0">
          <div className="relative w-full max-w-[500px] h-auto">
            <div className="relative w-full h-[400px] md:h-[750px] mx-auto mt-32 md:mt-0">
              <img
                src="/phone-mockup.png"
                alt="phone mockup"
                className="w-full h-full object-contain"
              />

              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="w-full h-full flex justify-center items-center overflow-hidden">
                  <img
                    src={images[currentIndex]}
                    alt="carousel"
                    className="object-contain w-[85%] h-[85%] rounded-lg"
                  />
                </div>

                <button
                  onClick={prevSlide}
                  className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 p-4 bg-white text-black rounded-full shadow-lg hover:bg-gray-300 w-12 h-12 flex items-center justify-center"
                >
                  &#10094;
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 p-4 bg-white text-black rounded-full shadow-lg hover:bg-gray-300 w-12 h-12 flex items-center justify-center"
                >
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center text-center py-8 md:py-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Download Our App
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-xl mx-auto">
            Experience the fastest and most reliable way to access our services.
            Download the app today and enjoy seamless functionality, available
            for Android!
          </p>

          <div className="mb-8">
            <a
              href="https://kmgrecuskcytplpqblbi.supabase.co/storage/v1/object/public/lacerase/onekonek-app.apk"
              download
              className="flex items-center bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-8 h-8 mr-4"
              >
                <path d="M12 5v14m7-7l-7 7-7-7" />
              </svg>
              <span className="font-semibold text-xl">Download Now</span>
            </a>
          </div>
          <div className="text-center mt-8 border-t border-gray-600 pt-4">
            <p className="text-sm text-gray-400">
              © 2024 ONE-KONEK Network and Data Solutions. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
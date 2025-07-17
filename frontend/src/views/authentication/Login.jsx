import React, { useState } from "react";

import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser, setToken, setNotification } = useStateContext();
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "syndic",
    rememberMe: false,
    agreeToTerms: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // Validation côté client uniquement pour confirmation mot de passe
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!formData.agreeToTerms) {
        setError("You must agree to the Terms of Service.");
        return;
      }
    }

    const statut = isLogin ? true : false;
    switch (statut) {
      case true: {
        axiosClient
          .post("/login", {
            email: formData.email,
            password: formData.password,
          })
          .then((response) => {
            setToken(response.data.token);
            setUser(response.data.user);
            setNotification("Login successful!");
            window.location.href = "/immeubleform";
          })
          .catch((error) => {
            setError("Login failed. Please check your credentials.");
          });
        break;
      }
      case false: {
        const payload = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          role: "syndic",
        };

        axiosClient
          .post("/register", payload)
          .then((response) => {
            setToken(response.data.token);
            setUser(response.data.user);
            setNotification("Account created successfully!");
            window.location.href = "/immeubleform";
          })
          .catch((error) => {
            setError("Registration failed. Please check your details.");
          });
        break;
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
      agreeToTerms: false,
    });
    setError(null);
  };

  const switchMode = (loginMode) => {
    setIsLogin(loginMode);
    resetForm();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              {/* ... SVG logos here ... */}
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              {/* ... SVG logos here ... */}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* Auth Container */}
        <div className="bg-white rounded-xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          {/* Toggle Buttons */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => switchMode(true)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                isLogin
                  ? "bg-teal-500 text-white shadow-md transform translate-x-0"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchMode(false)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                !isLogin
                  ? "bg-teal-500 text-white shadow-md transform translate-x-0"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Register
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-700 text-sm font-medium">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Full Name, Phone number - Register Only */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter your phone number"
                    required={!isLogin}
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 shadow-sm hover:shadow-md"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 shadow-sm hover:shadow-md"
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                required
              />
            </div>

            {/* Confirm Password - Register Only */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Remember Me / Terms */}
            <div className="flex items-center justify-between">
              {isLogin ? (
                <>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-teal-500 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-teal-500 hover:text-teal-600 font-medium transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </>
              ) : (
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-teal-500 focus:ring-teal-500 mt-1"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-teal-500 hover:text-teal-600 font-medium"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-teal-500 hover:text-teal-600 font-medium"
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-teal-600 border-2 border-teal-500 hover:border-teal-600 transform hover:-translate-y-1"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>

            <button
              onClick={() => {
                navigate(-1);
              }}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-red-500 hover:border-red-600 transform hover:-translate-y-1 mt-2"
            >
              GO Back
            </button>
          </div>

          {/* Social Login */}
          {/* ... */}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2024 Dashboard. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

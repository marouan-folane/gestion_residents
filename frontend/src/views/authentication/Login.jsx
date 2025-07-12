import React, { useState } from "react";

import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const { setUser, setToken, setNotification, notification } = useStateContext();
    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "syndic",
        rememberMe: false,
        agreeToTerms: false,
    });
    const Navigate=useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = () => {
        const statut = isLogin ? true : false;
        switch (statut) {
            case true: {
                axiosClient
                    .post("/login", {
                        email: formData.email,
                        password: formData.password,
                    })
                    .then((response) => {
                        console.log("Login successful:", response.data);
                        setToken(response.data.token);
                        setUser(response.data.user);
                        setNotification("Login successful!"); // Set notification

                    })
                    .catch((error) => {
                        console.error("Login error:", error);
                        setError(
                            "Login failed. Please check your credentials."
                        );
                    });
                break;
            }

            case false: {
                const payload = {
                    name: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    role: "syndic",
                };
                  console.log("Form Data:", payload);

                axiosClient
                    .post("/register", payload)
                    .then((response) => {
                        console.log("Registration successful:", response.data);
                        setToken(response.data.token);
                        setUser(response.data.user);
                        setNotification("Account created successfully!"); // Set notification

                    })
                    .catch((error) => {
                        console.error("Registration error:", error);
                        setError(
                            "Registration failed. Please check your details."
                        );
                    });
                break;
            }
        }
    };

    const resetForm = () => {
        setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            rememberMe: false,
            agreeToTerms: false,
        });
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
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Dashboard
                    </h1>
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
                                        name="fullName"
                                        value={formData.fullName}
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
                                placeholder={
                                    isLogin
                                        ? "Enter your password"
                                        : "Create a password"
                                }
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
                                        <span className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </span>
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
                           <button onClick={()=>{Navigate(-1)}}
                            className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl  border-2 border-red-500 hover:border-red-600 transform hover:-translate-y-1"
>
                            GO Back
                        </button>
                    </div>

                    {/* Social Login */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <button className="w-full inline-flex justify-center py-3 px-4 border-2 border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:shadow-md transform hover:-translate-y-1">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="ml-2">Google</span>
                            </button>
                            <button className="w-full inline-flex justify-center py-3 px-4 border-2 border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:shadow-md transform hover:-translate-y-1">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                                <span className="ml-2">Twitter</span>
                            </button>
                        </div>
                    </div>
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

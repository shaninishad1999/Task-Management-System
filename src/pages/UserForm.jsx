import React, { useState } from "react";
import { LogIn, User, Lock, X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api/UserApi";
import { toast } from "react-hot-toast";

const UserForm = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please fill in both email and password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await userLogin(email, password);
      console.log("Login successful:", response);
      toast.success(response.msg || "Login successful");

      handleClose(); // Close modal
      navigate("/user-dashboard"); // Redirect
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.msg || "An error occurred while logging in");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold">User Access</h2>
          <p className="text-gray-400 text-sm mt-1">Secure login required</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="group">
            <label htmlFor="email" className="text-sm text-gray-400 block mb-2">
              Email
            </label>
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus-within:border-indigo-500 transition-colors">
              <User className="text-gray-400" size={18} />
              <input
                id="email"
                type="email"
                placeholder="user@example.com"
                className="bg-transparent w-full pl-3 outline-none text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="password" className="text-sm text-gray-400 block mb-2">
              Password
            </label>
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus-within:border-indigo-500 transition-colors">
              <Lock className="text-gray-400" size={18} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent w-full pl-3 outline-none text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-indigo-500 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-medium py-3 px-4 rounded-lg mt-6 flex items-center justify-center transition-colors`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="mr-2" size={18} />
                Sign In as User
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Authorized personnel only. Activity is monitored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserForm;

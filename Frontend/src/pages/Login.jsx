import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import BASE_URL from "../api";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitch, FaApple, FaFire } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, ArrowLeft, X } from "lucide-react";
import bannerBg from "../assets/images/branding_background.c0ec82a7.png";

axios.defaults.withCredentials = true;

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFormFilled =
    formData.username.length > 0 && formData.password.length > 0;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormFilled) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        formData,
        { withCredentials: true },
      );

      if (response.data.success) {
        localStorage.setItem("isAuthenticated", "true");
        if (response.data.user?.username) {
          localStorage.setItem("username", response.data.user.username);
        }
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true },
      );

      if (response.data.success) {
        console.log("Google Login Success");
        localStorage.setItem("isAuthenticated", "true");
        if (response.data.user?.username) {
          localStorage.setItem("username", response.data.user.username);
        }
        navigate("/");
      }
    } catch (err) {
      console.error("Google Auth Error:", err);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans flex flex-col w-full">
      {/* Header Banner */}
      <header className="w-full bg-[#4D003E] relative flex flex-col items-center py-12 md:py-16 px-4 shrink-0">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-screen"
          style={{
            backgroundImage: `url(${bannerBg})`,
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
          }}
        ></div>

        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-6 md:hidden text-white hover:bg-white/20 p-1 rounded-full transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h1 className="text-white text-[28px] md:text-4xl font-extrabold mb-3 tracking-tight relative z-10 text-center">
          Sign in to Fandom
        </h1>
        <p className="text-white text-[13px] md:text-sm font-bold text-center max-w-md md:max-w-none relative z-10">
          The world's largest fan-generated entertainment & gaming platform.
        </p>

        {/* Fandom Logo Icon */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-[#1A0A22] rounded-full w-12 h-12 flex items-center justify-center border-[4px] border-[#F5F5F5]">
            <FaFire className="text-[#FA005A] w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full bg-[#F5F5F5] flex-1 flex justify-center pb-20 relative">
        {/* Desktop Back Button */}
        <button
          onClick={() => navigate("/")}
          className="hidden md:flex absolute top-8 left-8 items-center text-[11px] font-black text-gray-900 uppercase tracking-widest hover:text-[#FA005A] transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" strokeWidth={3} /> BACK
        </button>

        <div className="w-full max-w-[960px] mx-auto flex flex-col md:flex-row mt-16 md:mt-20 px-6 md:px-8">
          {/* Left Side: Social Login */}
          <div className="w-full md:w-1/2 flex flex-col md:pr-16 mb-10 md:mb-0">
            <h2 className="text-[17px] font-extrabold text-gray-900 mb-6 tracking-tight">
              Sign in with account
            </h2>
            <div className="space-y-3">
              {/* Google Button */}
              <div className="w-full relative h-[42px] border border-gray-300 bg-white rounded flex items-center hover:bg-gray-50 transition cursor-pointer overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <FcGoogle className="w-5 h-5 absolute left-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">
                    Sign in with Google
                  </span>
                </div>
                <div className="opacity-0 absolute inset-0 w-full h-full z-10">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => console.log("Login Failed")}
                    width="400"
                  />
                </div>
              </div>

              {/* Facebook Button */}
              <button className="w-full h-[42px] bg-[#1877F2] rounded flex items-center justify-center hover:bg-[#166FE5] transition relative shadow-sm">
                <FaFacebook className="w-5 h-5 text-white absolute left-4" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white">
                  Sign in with Facebook
                </span>
              </button>

              {/* Twitch Button */}
              <button className="w-full h-[42px] bg-[#9146FF] rounded flex items-center justify-center hover:bg-[#7D3CE0] transition relative shadow-sm">
                <FaTwitch className="w-5 h-5 text-white absolute left-4" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white">
                  Sign in with Twitch
                </span>
              </button>

              {/* Apple Button */}
              <button className="w-full h-[42px] bg-black rounded flex items-center justify-center hover:bg-gray-900 transition relative shadow-sm">
                <FaApple className="w-5 h-5 text-white absolute left-4 pb-0.5" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white">
                  Sign in with Apple
                </span>
              </button>
            </div>
          </div>

          {/* OR Divider (Mobile Only) */}
          <div className="md:hidden flex items-center justify-center w-full my-8">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="px-4 text-[11px] font-black text-gray-700 uppercase tracking-widest">
              OR
            </span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-1/2 flex flex-col md:pl-8">
            <h2 className="text-[17px] font-extrabold text-gray-900 mb-6 tracking-tight hidden md:block">
              Sign in
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[13px] text-gray-600 mb-2 font-medium">
                  Username <span className="text-[#FA005A]">*</span>
                </label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Username"
                  required
                  className="w-full px-3 py-2.5 border border-gray-400 rounded bg-white focus:border-[#7D3CE0] focus:ring-1 focus:ring-[#7D3CE0] outline-none transition text-[15px] text-gray-900"
                />
              </div>

              <div className="relative">
                <label className="block text-[13px] text-gray-600 mb-2 font-medium">
                  Password <span className="text-[#FA005A]">*</span>
                </label>
                <div className="relative">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="w-full px-3 py-2.5 border border-gray-400 rounded bg-white focus:border-[#7D3CE0] focus:ring-1 focus:ring-[#7D3CE0] outline-none transition text-[15px] text-gray-900 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-left pt-1">
                <span className="text-[#b20a9e] text-[13px] font-black tracking-tight cursor-pointer hover:underline">
                  Forgot Password?
                </span>
              </div>

              <button
                type="submit"
                disabled={!isFormFilled || isLoading}
                className={`w-full text-white font-black py-3 rounded uppercase tracking-widest text-[13px] transition-all mt-6 ${
                  isFormFilled && !isLoading
                    ? "bg-[#FA005A] hover:bg-[#c40046] shadow-md cursor-pointer"
                    : "bg-[#9B9398] cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></div>
                ) : (
                  "SIGN IN"
                )}
              </button>

              <p className="text-[12px] text-gray-800 leading-relaxed pt-2">
                By continuing, you agree to Fandom's{" "}
                <span className="text-[#b20a9e] font-bold cursor-pointer hover:underline">
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-[#b20a9e] font-bold cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                .
              </p>
            </form>

            <div className="mt-10 text-center flex flex-col items-center">
              <p className="text-[13px] text-gray-800">
                Don't have account?{" "}
                <span
                  className="text-[#b20a9e] font-extrabold cursor-pointer hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Register now
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Legal notice */}
      <footer className="w-full bg-[#F5F5F5] py-8 text-center px-4 shrink-0">
        <p className="text-[11px] text-gray-800">
          This site is protected by reCAPTCHA and the Google{" "}
          <span className="text-[#b20a9e] font-bold hover:underline cursor-pointer">
            Privacy Policy
          </span>{" "}
          and{" "}
          <span className="text-[#b20a9e] font-bold hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          apply.
        </p>
      </footer>
    </div>
  );
}

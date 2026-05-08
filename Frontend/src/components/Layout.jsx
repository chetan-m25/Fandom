import React, { useState } from "react";
import {
  Home,
  Bookmark,
  CheckCircle,
  MoreHorizontal,
  Search,
  Menu,
  X,
  Clock,
  Moon,
  User,
  ChevronLeft,
  Plus,
  PlaySquare,
  Gamepad2,
  Film,
  Tv,
  MonitorPlay,
  Star,
  Bell,
  Heart,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api";

const getImg = (name) =>
  new URL(`../assets/images/${name}`, import.meta.url).href;

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [isDesktopMoreOpen, setIsDesktopMoreOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const [isMobileNotifMenuOpen, setIsMobileNotifMenuOpen] = useState(false);
  const [isDesktopUserMenuOpen, setIsDesktopUserMenuOpen] = useState(false);
  const [isDesktopNotifMenuOpen, setIsDesktopNotifMenuOpen] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const username = localStorage.getItem("username") || "User";

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch {
      console.error("Logout failed");
    } finally {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
      window.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f2f2f2] overflow-hidden font-sans w-full">
      {/* Top Navbar */}
      <header className="h-[60px] bg-[#FAFAFA] flex items-center justify-between px-4 md:px-6 shrink-0 z-50">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Icon */}
          <button
            className="md:hidden p-1 text-gray-800 hover:bg-gray-100 rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
          <Link to="/">
            <img
              src={getImg("Fandom_logo_2021_lockup_1.png")}
              alt="Fandom"
              className="h-6 md:h-7 object-contain"
            />
          </Link>
        </div>

        <div
          className={`flex items-center space-x-4 shrink-0 ml-auto ${isAuthenticated ? "w-full max-w-[800px] justify-end" : ""}`}
        >
          {/* Desktop Search Bar */}
          <div
            className={`hidden md:flex items-center mr-2 ${isAuthenticated ? "flex-1" : "w-[260px]"}`}
          >
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" strokeWidth={2} />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white border border-[#e2e2e2] text-black text-sm rounded-none px-10 py-1.5 focus:outline-none focus:border-[#b20a9e] transition-colors"
                onFocus={() => setIsDesktopSearchOpen(true)}
                onBlur={() =>
                  setTimeout(() => setIsDesktopSearchOpen(false), 150)
                }
              />
              {/* Recent Searches Dropdown */}
              {isDesktopSearchOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-[#e2e2e2] border-t-0 shadow-lg z-50 py-3 px-4">
                  <p className="text-[13px] font-black text-gray-900 mb-2">
                    Recent Searches
                  </p>
                  <p className="text-[14px] text-gray-500">
                    No recent searches
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search & User Icons */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="p-1 text-[#3D0026] hover:bg-gray-100 rounded-full"
            >
              <Search className="w-6 h-6" strokeWidth={2} />
            </button>
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsMobileNotifMenuOpen(!isMobileNotifMenuOpen);
                  setIsMobileUserMenuOpen(false);
                }}
                className={`relative p-1 rounded-full transition-colors mr-1 ${isMobileNotifMenuOpen ? "bg-gray-200 text-[#b20a9e]" : "text-[#3D0026] hover:bg-gray-100"}`}
              >
                <Bell className="w-6 h-6" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#4D003E] rounded-full border-[1.5px] border-[#FAFAFA]"></span>
              </button>
            )}
            <button
              onClick={() => {
                setIsMobileUserMenuOpen(!isMobileUserMenuOpen);
                setIsMobileNotifMenuOpen(false);
              }}
              className={`p-1 hover:bg-gray-100 rounded-full transition-colors ${isMobileUserMenuOpen ? "text-[#b20a9e]" : "text-[#3D0026]"}`}
            >
              <User
                className="w-6 h-6"
                strokeWidth={isMobileUserMenuOpen ? 2.5 : 1.5}
              />
            </button>
          </div>

          {/* Desktop Auth Buttons OR Logged In Icons */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4 ml-4 relative">
              <button
                onClick={() => {
                  setIsDesktopNotifMenuOpen(!isDesktopNotifMenuOpen);
                  setIsDesktopUserMenuOpen(false);
                }}
                className={`relative p-1.5 rounded-full transition-colors group ${isDesktopNotifMenuOpen ? "bg-gray-200 text-[#b20a9e]" : "text-[#3D0026] hover:bg-gray-200"}`}
              >
                <Bell
                  className={`w-[22px] h-[22px] transition-colors ${isDesktopNotifMenuOpen ? "text-[#b20a9e]" : "group-hover:text-[#FA005A]"}`}
                  strokeWidth={isDesktopNotifMenuOpen ? 2.5 : 2}
                />
                <span className="absolute top-0 right-0 bg-[#4D003E] text-white text-[10px] font-black px-1.5 rounded-full border-[1.5px] border-[#FAFAFA]">
                  1
                </span>
              </button>
              <button
                onClick={() => {
                  setIsDesktopUserMenuOpen(!isDesktopUserMenuOpen);
                  setIsDesktopNotifMenuOpen(false);
                }}
                className={`p-1.5 rounded-full transition-colors group ${isDesktopUserMenuOpen ? "bg-gray-200 text-[#b20a9e]" : "text-[#3D0026] hover:bg-gray-200"}`}
              >
                <User
                  className={`w-[24px] h-[24px] transition-colors ${isDesktopUserMenuOpen ? "text-[#b20a9e]" : "group-hover:text-[#FA005A]"}`}
                  strokeWidth={isDesktopUserMenuOpen ? 2.5 : 2}
                />
              </button>

              {/* Desktop User Menu Dropdown */}
              {isDesktopUserMenuOpen && (
                <div className="absolute top-[48px] right-[-10px] w-[320px] bg-[#F5F5F5] shadow-2xl border border-gray-200 z-50 py-8 px-6">
                  <div className="flex flex-col items-center">
                    <div className="w-[84px] h-[84px] rounded-full border-[5px] border-[#4D003E] flex items-center justify-center mb-4 text-[#4D003E]">
                      <User className="w-12 h-12" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-[19px] font-black text-[#4D003E] mb-4">
                      {username}
                    </h3>
                    <button className="w-full bg-[#4D003E] text-white py-[10px] rounded-[3px] text-[13px] font-black uppercase tracking-widest flex items-center justify-center gap-2 mb-8 hover:bg-[#35002a] transition-colors">
                      <Heart className="w-[18px] h-[18px]" strokeWidth={2.5} />{" "}
                      VISIT MY FANDOM
                    </button>
                    <button className="text-[15px] text-gray-800 font-medium hover:text-black transition-colors self-start mb-10">
                      View Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-[130px] bg-transparent text-black border-[1.5px] border-black py-2.5 rounded-[3px] text-[12px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
                    >
                      SIGN OUT
                    </button>
                  </div>
                </div>
              )}

              {/* Desktop Notifications Dropdown */}
              {isDesktopNotifMenuOpen && (
                <div className="absolute top-[52px] right-[10px] w-[340px] bg-[#F5F5F5] shadow-2xl border border-gray-200 z-50 flex flex-col">
                  {/* Upward pointing triangle */}
                  <div className="absolute -top-[9px] right-[40px] w-4 h-4 bg-[#F5F5F5] border-t border-l border-gray-200 transform rotate-45"></div>

                  <div className="px-5 py-4 border-b border-gray-300 relative z-10 bg-[#F5F5F5]">
                    <h3 className="text-[14px] font-black text-gray-800 tracking-tight">
                      Notifications
                    </h3>
                  </div>

                  <div className="flex px-4 pt-2 relative z-10 bg-[#F5F5F5] border-b border-gray-300">
                    <button className="flex-1 text-center py-2.5 border-b-2 border-[#b20a9e] text-[#b20a9e] font-black text-[12px] tracking-widest uppercase">
                      Fandom
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-gray-600 font-bold text-[12px] tracking-widest uppercase">
                      Gamepedia
                      <span className="bg-[#4A4A4A] text-white text-[10px] font-black px-1.5 rounded-full leading-relaxed">
                        1
                      </span>
                    </button>
                  </div>

                  <div className="h-[380px] bg-[#F0F0F0] flex flex-col items-center justify-center p-6 text-center relative z-10">
                    <div className="w-14 h-14 bg-[#E0E0E0] rounded-full flex items-center justify-center mb-6">
                      <Bell
                        className="w-6 h-6 text-[#4D003E]"
                        strokeWidth={2}
                      />
                    </div>
                    <h4 className="text-[17px] font-extrabold text-[#2A2A2A] mb-2 tracking-tight">
                      You have no notifications.
                    </h4>
                    <p className="text-[13px] text-gray-600">
                      Check back later for new notifications.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="text-[11px] font-extrabold text-[#4D003E] border border-[#4D003E] px-4 py-1.5 hover:bg-[#4D003E] hover:text-white transition-colors tracking-widest uppercase rounded-sm"
              >
                SIGN IN
              </Link>
              <Link
                to="/signup"
                className="text-[11px] font-extrabold bg-[#4D003E] text-white px-4 py-1.5 hover:bg-[#35002a] transition-colors tracking-widest uppercase whitespace-nowrap rounded-sm shadow-md"
              >
                CREATE A FREE ACCOUNT
              </Link>
            </div>
          )}
        </div>

        {/* Mobile User Dropdown Menu */}
        {isMobileUserMenuOpen && (
          <div className="absolute top-[60px] right-2 md:hidden w-[calc(100%-16px)] max-w-[360px] bg-[#F5F5F5] shadow-2xl p-5 z-50 border border-gray-200">
            {/* Upward pointing triangle */}
            <div className="absolute -top-[9px] right-[22px] w-4 h-4 bg-[#F5F5F5] border-t border-l border-gray-200 transform rotate-45"></div>

            <div className="relative z-10">
              {isAuthenticated ? (
                <>
                  <button className="w-full bg-[#4D003E] text-white py-[10px] rounded-[3px] text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-2 mb-4 hover:bg-[#35002a] transition-colors shadow-sm">
                    <Heart className="w-4 h-4" strokeWidth={2.5} /> VISIT MY
                    FANDOM
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-[14px] text-gray-700 font-medium hover:text-black transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <p className="text-center text-[13px] text-gray-700 mb-3 font-medium">
                    Manage your fandoms in one place!
                  </p>
                  <button className="w-full bg-[#4D003E] text-white py-[10px] rounded-[3px] text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-2 mb-4 hover:bg-[#35002a] transition-colors shadow-sm">
                    <Heart className="w-4 h-4" strokeWidth={2.5} /> VISIT MY
                    FANDOM
                  </button>

                  <div className="border-t border-gray-300 mb-4 w-full"></div>

                  <p className="text-center text-[13px] text-gray-700 mb-3 font-medium">
                    Don't have an account?
                  </p>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileUserMenuOpen(false)}
                    className="block text-center w-full bg-[#4D003E] text-white py-[10px] rounded-[3px] text-[12px] font-black uppercase tracking-widest mb-3 hover:bg-[#35002a] transition-colors shadow-sm"
                  >
                    CREATE A FREE ACCOUNT
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileUserMenuOpen(false)}
                    className="block text-center w-full bg-transparent text-black border-[1.5px] border-black py-[10px] rounded-[3px] text-[12px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
                  >
                    SIGN IN
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Lower Section (Sidebar + Content) */}
      <div className="flex flex-1 overflow-hidden w-full relative z-30">
        {/* Desktop Primary Sidebar */}
        <aside className="w-[60px] hidden md:flex bg-[#FAFAFA] border-r border-gray-200 flex-col justify-between items-center py-2 z-40 shrink-0 h-full relative">
          <div className="flex flex-col space-y-6 mt-10 w-full relative z-20">
            <div className="flex flex-col items-center cursor-pointer group w-full px-1">
              <div className="p-2 rounded-lg group-hover:bg-[#e0e0e0] transition-colors flex flex-col items-center w-full">
                <Home
                  className="w-[22px] h-[22px] text-gray-700 group-hover:text-black transition-colors"
                  strokeWidth={1.5}
                />
                <span className="text-[9px] mt-1.5 text-gray-700 group-hover:text-black font-medium tracking-tight">
                  Home
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center cursor-pointer group w-full px-1">
              <div className="p-2 rounded-lg group-hover:bg-[#e0e0e0] transition-colors flex flex-col items-center w-full">
                <Bookmark
                  className="w-[22px] h-[22px] text-gray-700 group-hover:text-black transition-colors"
                  strokeWidth={1.5}
                />
                <span className="text-[9px] mt-1.5 text-gray-700 group-hover:text-black font-medium tracking-tight">
                  Saved
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center cursor-pointer group w-full px-1">
              <div className="p-2 rounded-lg group-hover:bg-[#e0e0e0] transition-colors flex flex-col items-center w-full">
                <CheckCircle
                  className="w-[22px] h-[22px] text-gray-700 group-hover:text-black transition-colors"
                  strokeWidth={1.5}
                />
                <span className="text-[9px] mt-1.5 text-gray-700 group-hover:text-black font-medium text-center leading-none tracking-tight">
                  Progress
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer group w-full mb-2 px-1 relative z-20"
            onClick={() => setIsDesktopMoreOpen(!isDesktopMoreOpen)}
          >
            <div
              className={`p-2 rounded-lg transition-colors flex flex-col items-center w-full ${isDesktopMoreOpen ? "bg-[#e0e0e0]" : "group-hover:bg-[#e0e0e0]"}`}
            >
              <MoreHorizontal
                className="w-[22px] h-[22px] text-gray-700 group-hover:text-black transition-colors"
                strokeWidth={1.5}
              />
              <span className="text-[9px] mt-1.5 text-gray-700 group-hover:text-black font-medium tracking-tight">
                More
              </span>
            </div>
          </div>
        </aside>

        {/* Desktop Expanded "More" Sidebar */}
        {isDesktopMoreOpen && (
          <div className="hidden md:flex w-[240px] bg-[#FAFAFA] h-full shadow-2xl relative z-40 shrink-0 border-r border-gray-200 animate-in slide-in-from-left-[-240px] duration-300">
            {/* Close button that sits on the border */}
            <button
              onClick={() => setIsDesktopMoreOpen(false)}
              className="absolute -right-3 top-12 bg-[#3D0026] text-white rounded-full p-1 shadow-lg hover:bg-[#FA005A] transition-colors z-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden pt-4 pb-8">
              <h2 className="text-xl font-extrabold text-gray-900 px-6 mb-6">
                More
              </h2>

              <div className="px-4 mb-2">
                <button className="w-full flex items-center justify-start text-[#FA005A] hover:bg-white px-2 py-2 rounded-lg transition-colors font-extrabold text-xs tracking-widest uppercase">
                  <Plus className="w-4 h-4 mr-3" strokeWidth={3} />
                  Start a Wiki
                </button>
              </div>

              <div className="flex flex-col space-y-0.5 px-4 mb-4">
                <div className="flex items-center px-2 py-2 hover:bg-white rounded-lg cursor-pointer transition-colors text-gray-800 hover:text-black group">
                  <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <Star
                      className="w-4 h-4 text-[#4D003E] group-hover:text-[#FA005A]"
                      strokeWidth={2}
                    />
                  </div>
                  <span className="text-sm font-bold">Fan Central</span>
                </div>
                <div className="flex items-center px-2 py-2 hover:bg-white rounded-lg cursor-pointer transition-colors text-gray-800 hover:text-black">
                  <PlaySquare
                    className="w-4 h-4 mr-4 text-[#4D003E]"
                    strokeWidth={2}
                  />
                  <span className="text-sm font-bold">Video</span>
                </div>
                <div className="flex items-center px-2 py-2 hover:bg-white rounded-lg cursor-pointer transition-colors text-gray-800 hover:text-black">
                  <Gamepad2
                    className="w-4 h-4 mr-4 text-[#4D003E]"
                    strokeWidth={2}
                  />
                  <span className="text-sm font-bold">Games</span>
                </div>
                <div className="flex items-center px-2 py-2 hover:bg-white rounded-lg cursor-pointer transition-colors text-gray-800 hover:text-black">
                  <Film
                    className="w-4 h-4 mr-4 text-[#4D003E]"
                    strokeWidth={2}
                  />
                  <span className="text-sm font-bold">Movies</span>
                </div>
                <div className="flex items-center px-2 py-2 hover:bg-white rounded-lg cursor-pointer transition-colors text-gray-800 hover:text-black">
                  <Tv className="w-4 h-4 mr-4 text-[#4D003E]" strokeWidth={2} />
                  <span className="text-sm font-bold">TV</span>
                </div>
                <div className="flex items-center px-2 py-2 hover:bg-white rounded-lg cursor-pointer transition-colors text-gray-800 hover:text-black">
                  <MonitorPlay
                    className="w-4 h-4 mr-4 text-[#4D003E]"
                    strokeWidth={2}
                  />
                  <span className="text-sm font-bold">Anime</span>
                </div>
                <div className="flex items-center px-2 py-2 hover:bg-white rounded-lg cursor-pointer transition-colors text-gray-800 hover:text-black">
                  <span className="text-sm font-bold ml-8">
                    Community Central
                  </span>
                </div>
              </div>

              <div className="px-6 pt-4 border-t border-gray-300">
                <h3 className="text-xs font-black text-gray-900 mb-4 tracking-wide">
                  Fandom Brands
                </h3>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center cursor-pointer group">
                    <div className="w-6 flex justify-center mr-2">
                      <span className="text-orange-500 font-bold text-lg">
                        F
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 group-hover:text-black transition-colors">
                      Fanatical
                    </span>
                  </div>
                  <div className="flex items-center cursor-pointer group">
                    <div className="w-6 flex justify-center mr-2">
                      <span className="text-yellow-500 font-bold text-lg">
                        M
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 group-hover:text-black transition-colors">
                      Metacritic
                    </span>
                  </div>
                  <div className="flex items-center cursor-pointer group">
                    <div className="w-6 flex justify-center mr-2">
                      <span className="text-red-500 font-bold text-lg">G</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 group-hover:text-black transition-colors">
                      Gamespot
                    </span>
                  </div>
                  <div className="flex items-center cursor-pointer group">
                    <div className="w-6 flex justify-center mr-2">
                      <span className="text-red-600 font-bold text-lg">TV</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 group-hover:text-black transition-colors">
                      TV Guide
                    </span>
                  </div>
                  <div className="flex items-center cursor-pointer group">
                    <div className="w-6 flex justify-center mr-2">
                      <span className="text-blue-500 font-bold text-lg">
                        GF
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 group-hover:text-black transition-colors">
                      GameFAQs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div className="w-[85%] max-w-[320px] bg-[#f4f4f4] h-full relative z-10 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                <img
                  src={getImg("Fandom_logo_2021_lockup_1.png")}
                  alt="Fandom"
                  className="h-6 object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1"
                >
                  <X className="w-6 h-6 text-gray-800" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-col py-4 overflow-y-auto">
                <div className="flex flex-col space-y-1 px-2 border-b border-gray-300 pb-4 mb-4">
                  <div className="flex items-center px-4 py-3 hover:bg-[#e0e0e0] rounded-lg cursor-pointer transition-colors">
                    <Home
                      className="w-5 h-5 text-gray-800 mr-4"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-bold text-gray-800">
                      Home
                    </span>
                  </div>
                  <div className="flex items-center px-4 py-3 hover:bg-[#e0e0e0] rounded-lg cursor-pointer transition-colors">
                    <Bookmark
                      className="w-5 h-5 text-gray-800 mr-4"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-bold text-gray-800">
                      Saved
                    </span>
                  </div>
                  <div className="flex items-center px-4 py-3 hover:bg-[#e0e0e0] rounded-lg cursor-pointer transition-colors">
                    <CheckCircle
                      className="w-5 h-5 text-gray-800 mr-4"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-bold text-gray-800">
                      Progress
                    </span>
                  </div>
                  <div className="flex items-center px-4 py-3 hover:bg-[#e0e0e0] rounded-lg cursor-pointer transition-colors">
                    <Clock
                      className="w-5 h-5 text-gray-800 mr-4"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-bold text-gray-800">
                      History
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-1 px-2 border-b border-gray-300 pb-4 mb-4">
                  <div className="flex items-center px-4 py-3 hover:bg-[#e0e0e0] rounded-lg cursor-pointer transition-colors">
                    <span className="text-sm font-bold text-gray-800">
                      Browse Wikis
                    </span>
                  </div>
                  <div className="flex items-center px-4 py-3 hover:bg-[#e0e0e0] rounded-lg cursor-pointer transition-colors">
                    <span className="text-sm font-bold text-gray-800">
                      Community Central
                    </span>
                  </div>
                </div>

                <div className="flex items-center px-6 py-3 hover:bg-[#e0e0e0] rounded-lg cursor-pointer transition-colors mx-2">
                  <Moon
                    className="w-5 h-5 text-gray-800 mr-4"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm font-bold text-gray-800">
                    Switch to Dark Theme
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#F4F4F4]">
          <Outlet />
        </main>
      </div>

      {/* Mobile Full-Screen Notifications Menu */}
      {isMobileNotifMenuOpen && (
        <div className="fixed inset-0 bg-[#F5F5F5] z-[100] flex flex-col md:hidden animate-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <header className="h-[60px] bg-[#FAFAFA] flex items-center justify-between px-4 shrink-0 border-b border-gray-200">
            <img
              src={getImg("Fandom_logo_2021_lockup_1.png")}
              alt="Fandom"
              className="h-7 object-contain"
            />
            <button
              onClick={() => setIsMobileNotifMenuOpen(false)}
              className="p-1 text-[#3D0026] hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 py-5">
              <h3 className="text-[14px] font-black text-[#1A1A1A] tracking-widest uppercase">
                Notifications
              </h3>
            </div>

            <div className="flex px-4 relative bg-[#F5F5F5] border-b border-gray-300">
              <button className="flex-1 text-center py-3.5 border-b-2 border-[#b20a9e] text-[#b20a9e] font-black text-[13px] tracking-widest">
                Fandom
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3.5 text-gray-600 font-bold text-[13px] tracking-widest">
                Gamepedia
                <span className="bg-[#4A4A4A] text-white text-[11px] font-black px-1.5 rounded-full leading-relaxed">
                  1
                </span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center p-6 text-center mt-24">
              <div className="w-[72px] h-[72px] bg-[#E0E0E0] rounded-full flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-[#4D003E]" strokeWidth={2} />
              </div>
              <h4 className="text-[19px] font-extrabold text-[#1A1A1A] mb-2 tracking-tight">
                You have no notifications.
              </h4>
              <p className="text-[14px] text-gray-700 mt-2 font-medium">
                Check back later for new notifications.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Full-Screen Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col md:hidden">
          {/* Header */}
          <header className="h-[60px] bg-[#FAFAFA] flex items-center justify-between px-4 shrink-0 border-b border-gray-200">
            <img
              src={getImg("Fandom_logo_2021_lockup_1.png")}
              alt="Fandom"
              className="h-7 object-contain"
            />
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-1 text-[#3D0026] hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
          </header>

          {/* Nav Links */}
          <div className="flex items-center gap-5 px-4 py-3 border-b border-gray-200 overflow-x-auto whitespace-nowrap text-[11px] font-extrabold tracking-widest uppercase text-[#4D003E]">
            <button className="hover:text-[#b20a9e] transition-colors leading-tight text-center shrink-0">
              VISIT MY
              <br />
              FANDOM
            </button>
            <button className="hover:text-[#b20a9e] transition-colors shrink-0">
              GAMES
            </button>
            <button className="hover:text-[#b20a9e] transition-colors shrink-0">
              MOVIES
            </button>
            <button className="hover:text-[#b20a9e] transition-colors shrink-0">
              TV
            </button>
            <button className="hover:text-[#b20a9e] transition-colors shrink-0">
              VIDEO
            </button>
            <button className="flex items-center gap-0.5 hover:text-[#b20a9e] transition-colors shrink-0">
              WIKIS{" "}
              <ChevronLeft
                className="w-3.5 h-3.5 rotate-[-90deg]"
                strokeWidth={3}
              />
            </button>
          </div>

          {/* Search Input */}
          <div className="px-4 pt-5">
            <div className="flex items-center border-b-2 border-[#b20a9e]">
              <input
                autoFocus
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent text-[17px] text-gray-800 placeholder-gray-400 outline-none py-2.5 px-1"
              />
              <button className="bg-[#b20a9e] p-2.5 rounded-sm ml-2 hover:bg-[#8e0880] transition-colors">
                <Search className="w-5 h-5 text-white" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Newspaper, Users, UserRound, FileText, FileOutput, LogOut, Lock } from "lucide-react";
import { ChangePasswordDialog } from "../../components/changePasswordDialog";
import Image from "../../data/logo.png";

const Sidebar = () => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { to: "/dashboard/novinky", label: "Novinky", icon: <Newspaper size={24} /> },
    { to: "/dashboard/uzivatele", label: "Uživatelé", icon: <Users size={24} /> },
    { to: "/dashboard/zamestnanci", label: "Zaměstnanci", icon: <UserRound size={24} /> },
    { to: "/dashboard/prijimacirizeni", label: "Přijímací řízení", icon: <FileText size={24} /> },
    { to: "/dashboard/prijimacirizeniexport", label: "Export přijímacího řízení", icon: <FileOutput size={24} /> },
  ];

  const handleLogout = () => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token"));
  
    if (token) {
      const tokenValue = token.split("=")[1];
      document.cookie = `token=logout; path=/; Secure`;
      window.location.href = "/adminlogin";
    } else {
      console.error("No token found!")
    }
  };

  return (
    <nav className={`flex flex-col h-screen bg-gray-100 ${isSidebarOpen ? 'w-64' : 'w-0'} md:w-64 transition-all pl-2 pr-2`}>
      <div className="flex justify-center items-center mb-6">
        <Link to="/dashboard">
          <img
            src={Image}
            alt="Logo"
            className="w-40"
            style={{ marginRight: '20px', marginTop: '5px' }}
          />
        </Link>
        <button className="md:hidden ml-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          ☰
        </button>
      </div>
      <ul className="space-y-2 flex-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.to} className="flex items-center space-x-2 text-gray-700 hover:text-black ml-1">
              {item.icon}
              <span className="text-lg">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6 space-y-2 pb-4">
        <Button
          variant="outline"
          className="w-full justify-start py-3 text-lg ml-2"
          onClick={() => setIsChangePasswordOpen(true)}
        >
          <Lock className="mr-2 h-5 w-5" />
          Změnit heslo
        </Button>
        <Button
          variant="destructive"
          className="w-full justify-start py-3 text-lg ml-2"
          onClick={handleLogout} // Trigger logout on button click
        >
          <LogOut className="mr-2 h-5 w-5" />
          Odhlásit se
        </Button>
      </div>
      <ChangePasswordDialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen} />
    </nav>
  );
};

export default Sidebar;
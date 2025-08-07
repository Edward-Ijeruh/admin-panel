"use client";

import {
  UserCircle,
  Bell,
  Gear,
  LockKey,
  SignOut,
  Globe,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { supabase } from './../supabaseClient';
import { useNavigate } from "react-router-dom";



export default function Settings() {
  const [language, setLanguage] = useState("en");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Load settings from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("settings_language");
    const savedEmail = localStorage.getItem("settings_emailAlerts");
    const savedPush = localStorage.getItem("settings_pushNotifications");

    if (savedLang) setLanguage(savedLang);
    if (savedEmail !== null) setEmailAlerts(savedEmail === "true");
    if (savedPush !== null) setPushNotifications(savedPush === "true");

    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Failed to get user', error.message);
      } else {
        setUser(user);
        // Step 2: Get additional user info from your custom `users` table
      const { data, error } = await supabase
        .from('users')
        .select('full_name')
        .eq('id', user.id)
        .single();
        
        setUserName(data.full_name);

      }
    };


    fetchUser();

  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      console.log('Logged out');
      navigate('/login');
     }
  };

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("settings_language", language);
    localStorage.setItem("settings_emailAlerts", String(emailAlerts));
    localStorage.setItem(
      "settings_pushNotifications",
      String(pushNotifications)
    );
  }, [language, emailAlerts, pushNotifications]);

  return (
    <div className="space-y-8 mx-auto py-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white shadow-sm rounded-lg divide-y">
        {/* Account Section */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-3 text-lg font-medium text-gray-800">
            <UserCircle size={24} />
            Account
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Name: {userName}</p>
           {user ? (
              <p>{user.email}</p>
            ) : (
              <p></p>
            )}
            <button className="text-indigo-600 hover:underline cursor-pointer mt-2">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-lg font-medium text-gray-800">
            <Bell size={24} />
            Notifications
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Email Alerts</span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={() => setEmailAlerts(!emailAlerts)}
              className="accent-indigo-600 w-4 h-4 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Push Notifications</span>
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={() => setPushNotifications(!pushNotifications)}
              className="accent-indigo-600 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        {/* Security Section */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-lg font-medium text-gray-800">
            <LockKey size={24} />
            Security
          </div>
          <button className="text-sm text-indigo-600 hover:underline cursor-pointer">
            Change Password
          </button>
        </div>

        {/* Logout Section */}
        <div className="p-6">
          <button className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm cursor-pointer" onClick={handleLogout}>
            <SignOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

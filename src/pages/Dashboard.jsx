import {
  CalendarCheck,
  UsersThree,
  CalendarBlank,
  Clock,
  ChartLineUp,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { supabase } from './../supabaseClient';

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
      const fetchCounts = async () => {

        const { data: evData, error: evErr } = await supabase
        .from('events')
        .select() // Or select only the fields you need
        .order('created_at', { ascending: false });

        console.log('Number of events:', evData?.length ?? 0);
        console.log('Error:', evErr);
        setEventCount(evData?.length ?? 0);


        const { data: userData, error: usErr } = await supabase
          .from('users')
          .select() // Or select only the fields you need
          .order('created_at', { ascending: false });
        console.log('Number of users:', userData?.length);
        console.log('User Error:', usErr);
        setUserCount(userData?.length ?? 0);


      };
  
      fetchCounts();
    }, []);

  const stats = [
    {
      id: "total-events",
      label: "Total Events",
      value: eventCount,
      icon: <CalendarCheck size={28} className="text-indigo-600" />,
    },
    {
      id: "active-users",
      label: "Active Users",
      value: userCount,
      icon: <UsersThree size={28} className="text-indigo-600" />,
    },
    {
      id: "upcoming-events",
      label: "Upcoming Events",
      value: "0",
      icon: <CalendarBlank size={28} className="text-indigo-600" />,
    },
    {
      id: "ongoing-events",
      label: "Ongoing Events",
      value: "0",
      icon: <Clock size={28} className="text-indigo-600" />,
    },
  ];

  return (
    <div className="py-4 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Dashboard Overview
      </h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h2 className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </h2>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Graph Overview */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ChartLineUp size={20} className="text-indigo-600" />
            Event Overview
          </h2>
          <span className="text-sm text-gray-400">Last 30 days</span>
        </div>

        {/* Placeholder for graph */}
        <div className="h-64 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-400 text-sm">
          {/* We would replace this div with a chart.js / recharts / apexcharts component later */}
          Graph coming soon...
        </div>
      </div>
    </div>
  );
}

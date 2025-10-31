import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Notification({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch jobs data
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      
      // Get first 3 jobs and format them as notifications
      const recentJobs = data.jobs.slice(0, 3).map((job) => ({
        id: job.id,
        title: job.title,
        message: `${job.title} is ${job.status}`,
        status: job.status,
        timestamp: new Date().toISOString(), // You can replace with actual timestamp if available
      }));

      setNotifications(recentJobs);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setLoading(false);
    }
  }

  function getStatusColor(status) {
    return status === "active" ? "text-green-600" : "text-gray-500";
  }

  function getStatusIcon(status) {
    return status === "active" ? "bi-check-circle-fill" : "bi-archive-fill";
  }

  function getRelativeTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }

  function handleViewAll() {
    onClose(); // Close the notification panel
    navigate("/jobs"); // Navigate to jobs page
  }

  return (
    <>
      {/* Overlay to close notification when clicking outside */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      ></div>

      {/* Notification Panel */}
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl z-50 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-800">
            Notifications
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close notifications"
          >
            <i className="bi bi-x-lg text-lg"></i>
          </button>
        </div>

        {/* Notification List */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <i className="bi bi-arrow-repeat animate-spin text-2xl"></i>
              <p className="mt-2 text-sm">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <i className="bi bi-bell-slash text-3xl"></i>
              <p className="mt-2 text-sm">No notifications yet</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => {
                    onClose();
                    navigate("/jobs");
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div
                      className={`mt-1 ${getStatusColor(notification.status)}`}
                    >
                      <i
                        className={`bi ${getStatusIcon(
                          notification.status
                        )} text-lg`}
                      ></i>
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 font-medium truncate">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Status: <span className={`font-semibold ${getStatusColor(notification.status)}`}>
                          {notification.status === "active" ? "Active" : "Archived"}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {getRelativeTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={handleViewAll}
            className="w-full text-center text-sm text-[#1ac2b6] font-medium hover:underline transition"
          >
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
}

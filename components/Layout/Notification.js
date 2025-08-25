"use client";
"use client";

import { useEffect, useState } from 'react';
import { X, Bell, CheckCircle, Truck, Package } from 'lucide-react';

export default function Notification({ message, onClose, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getNotificationIcon = () => {
    if (message.includes('received')) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (message.includes('dispatched')) return <Truck className="h-5 w-5 text-blue-500" />;
    return <Bell className="h-5 w-5 text-chak-blue" />;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getNotificationIcon()}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Notification</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
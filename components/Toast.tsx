"use client";
import { useState, useEffect } from "react";
import {
  FaTimes,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

export default function Toast({
  message,
  type = "info",
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // انتظار انتهاء الانتقال
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const typeConfig = {
    success: {
      icon: FaCheckCircle,
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      textColor: "text-white",
      borderColor: "border-green-400",
      shadowColor: "shadow-green-500/25",
    },
    error: {
      icon: FaExclamationTriangle,
      bgColor: "bg-gradient-to-r from-red-500 to-red-600",
      textColor: "text-white",
      borderColor: "border-red-400",
      shadowColor: "shadow-red-500/25",
    },
    warning: {
      icon: FaExclamationTriangle,
      bgColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
      textColor: "text-white",
      borderColor: "border-yellow-400",
      shadowColor: "shadow-yellow-500/25",
    },
    info: {
      icon: FaInfoCircle,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      textColor: "text-white",
      borderColor: "border-blue-400",
      shadowColor: "shadow-blue-500/25",
    },
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-500 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div
        className={`${config.bgColor} ${config.textColor} ${config.borderColor} ${config.shadowColor}
        border-2 rounded-2xl shadow-2xl p-5 min-w-[320px] max-w-[420px] 
        backdrop-blur-md flex items-center gap-4 relative overflow-hidden
        before:absolute before:inset-0 before:bg-white/10 before:opacity-0 
        hover:before:opacity-100 before:transition-opacity before:duration-300`}
      >
        {/* شريط تقدم */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
          <div
            className="h-full bg-white/60 transition-all duration-300 ease-linear"
            style={{
              width: isVisible ? "100%" : "0%",
              transitionDuration: `${duration}ms`,
            }}
          />
        </div>

        <div className="relative z-10 flex items-center gap-4 w-full">
          <div className="flex-shrink-0">
            <IconComponent className="text-2xl drop-shadow-sm" />
          </div>
          <p className="flex-1 text-base font-semibold leading-relaxed">
            {message}
          </p>
          <button
            onClick={handleClose}
            className="flex-shrink-0 hover:bg-white/20 rounded-full p-2 transition-all duration-200 
                     hover:scale-110 active:scale-95"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook لإدارة Toast
export function useToast() {
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      message: string;
      type: "success" | "error" | "warning" | "info";
      duration?: number;
    }>
  >([]);

  const addToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "info",
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="transform transition-all duration-300 ease-out"
          style={{
            transform: `translateY(${index * 8}px)`,
            zIndex: 1000 - index,
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );

  return { addToast, removeToast, ToastContainer };
}

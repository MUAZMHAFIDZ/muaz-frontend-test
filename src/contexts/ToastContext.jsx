import { createContext, useContext, useState, useEffect } from "react";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ type = "green", message = "" }) => {
    const id = idCounter++;
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded shadow text-white animate-slide-in-right transition-all
              ${toast.type === "green" && "bg-green-500"}
              ${toast.type === "red" && "bg-red-500"}
              ${toast.type === "yellow" && "bg-yellow-500 text-black"}
              ${toast.type === "blue" && "bg-blue-500"}
            `}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

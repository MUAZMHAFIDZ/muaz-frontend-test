import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import useApiUrl from "../hooks/useApiUrl";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { showToast } = useToast();
  const apiUrl = useApiUrl();

  const login = async (username, password) => {
    const isValid = validateInput(username, password, showToast);
    if (!isValid) {
      return {
        status: "error",
        message: "Input tidak valid",
      };
    }

    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();

      if (!res.ok || json.status !== "success") {
        throw new Error(json.message || "Login gagal");
      }

      const userData = {
        token: json.data.token,
        admin: json.data.admin,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setAuthUser(userData);
      showToast({ type: "green", message: json.message });

      return {
        status: "success",
        message: json.message,
        data: userData,
      };
    } catch (err) {
      showToast({ type: "red", message: err.message });
      return {
        status: "error",
        message: err.message || "Terjadi kesalahan saat login",
      };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;

const validateInput = (username, password, showToast) => {
  if (!username || !password) {
    showToast({ type: "red", message: "Isi semua field!" });
    return false;
  }
  if (password.length < 6) {
    showToast({ type: "red", message: "Password minimal 6 karakter!" });
    return false;
  }
  return true;
};

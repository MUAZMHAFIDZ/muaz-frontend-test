import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { showToast } = useToast();

  const login = (username, password) => {
    const isValid = validateInput(username, password, showToast);
    if (!isValid) {
      return {
        status: "error",
        message: "Input tidak valid",
      };
    }

    setLoading(true);

    const STATIC_USER = {
      username: "Admin",
      password: "pastibisa",
      admin: {
        id: "uuid-admin-123",
        name: "Admin Muaz",
        username: "admin",
        phone: "08123456789",
        email: "admin@example.com",
      },
      token: "fake-token",
    };

    if (
      username === STATIC_USER.username &&
      password === STATIC_USER.password
    ) {
      const response = {
        status: "success",
        message: "Login berhasil",
        data: {
          token: STATIC_USER.token,
          admin: STATIC_USER.admin,
        },
      };

      localStorage.setItem("user", JSON.stringify(response.data));
      setAuthUser(response.data);
      showToast({ type: "green", message: response.message });

      setLoading(false);
      return response;
    } else {
      const errorResponse = {
        status: "error",
        message: "Username atau password salah",
      };
      showToast({ type: "red", message: errorResponse.message });
      setLoading(false);
      return errorResponse;
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

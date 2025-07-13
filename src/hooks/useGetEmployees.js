import { useState, useEffect } from "react";
import { useToast } from "../contexts/ToastContext";
import useApiUrl from "./useApiUrl";
import { useAuthContext } from "../contexts/AuthContext";

const useGetEmployees = (keyword = "") => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const apiUrl = useApiUrl();
  const { authUser } = useAuthContext();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/employees?name=${keyword}`, {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          Accept: "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok || json.status !== "success") {
        throw new Error(json.message || "Gagal memuat data karyawan");
      }

      setEmployees(json.data.employees || []);
    } catch (error) {
      showToast({ type: "red", message: error.message });
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [keyword]);

  return { employees, loading, refetch: fetchEmployees };
};

export default useGetEmployees;

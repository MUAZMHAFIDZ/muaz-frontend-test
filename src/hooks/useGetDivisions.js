import { useState, useEffect } from "react";
import useApiUrl from "./useApiUrl";
import { useAuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const useGetDivisions = () => {
  const [divisions, setDivisions] = useState([]);
  const apiUrl = useApiUrl();
  const { authUser } = useAuthContext();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const res = await fetch(`${apiUrl}/divisions`, {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            Accept: "application/json",
          },
        });

        const json = await res.json();

        if (!res.ok || json.status !== "success") {
          throw new Error(json.message || "Gagal memuat divisi");
        }

        setDivisions(json.data.divisions || []);
      } catch (err) {
        showToast({ type: "red", message: err.message });
      }
    };

    fetchDivisions();
  }, [apiUrl, authUser?.token]);

  return { divisions };
};

export default useGetDivisions;

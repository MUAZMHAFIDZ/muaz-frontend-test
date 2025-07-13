import useApiUrl from "./useApiUrl";
import { useToast } from "../contexts/ToastContext";
import { useAuthContext } from "../contexts/AuthContext";

const useDeleteEmployee = (refetch) => {
  const apiUrl = useApiUrl();
  const { showToast } = useToast();
  const { authUser } = useAuthContext();

  return async (id) => {
    try {
      const response = await fetch(`${apiUrl}/employees/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          Accept: "application/json",
        },
      });

      const json = await response.json();

      if (json.status === "success") {
        showToast({ type: "green", message: json.message });
        refetch();
      } else {
        showToast({
          type: "red",
          message: json.message || "Gagal menghapus data.",
        });
      }
    } catch (err) {
      showToast({
        type: "red",
        message: "Terjadi kesalahan saat menghapus data.",
      });
    }
  };
};

export default useDeleteEmployee;

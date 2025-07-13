import { useAuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import useApiUrl from "./useApiUrl";

const useUpdateEmployee = (refetch) => {
  const { showToast } = useToast();
  const apiUrl = useApiUrl();
  const { authUser } = useAuthContext();

  return async (updatedEmp) => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", updatedEmp.name);
      formData.append("phone", updatedEmp.phone);
      formData.append("position", updatedEmp.position);
      formData.append("division", updatedEmp.division.id);

      if (updatedEmp.image instanceof File) {
        formData.append("image", updatedEmp.image);
      }

      const response = await fetch(`${apiUrl}/employees/${updatedEmp.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const json = await response.json();

      if (json.status === "success") {
        showToast({ type: "green", message: json.message });
        refetch();
      } else {
        showToast({
          type: "red",
          message: json.message || "Gagal update data.",
        });
      }
    } catch (err) {
      showToast({ type: "red", message: "Terjadi kesalahan saat update." });
    }
  };
};

export default useUpdateEmployee;

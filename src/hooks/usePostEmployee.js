import { useToast } from "../contexts/ToastContext";
import useApiUrl from "./useApiUrl";
import { useAuthContext } from "../contexts/AuthContext";

const usePostEmployee = (refetch) => {
  const { showToast } = useToast();
  const apiUrl = useApiUrl();
  const { authUser } = useAuthContext();

  return async (newEmployee) => {
    const formData = new FormData();
    formData.append("image", newEmployee.image);
    formData.append("name", newEmployee.name);
    formData.append("phone", newEmployee.phone);
    formData.append("division", newEmployee.division.id);
    formData.append("position", newEmployee.position);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await fetch(`${apiUrl}/employees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || json.status !== "success") {
        throw new Error(json.message || "Gagal menambahkan karyawan");
      }

      refetch();

      showToast({
        type: "green",
        message: json.message || "Berhasil menambahkan karyawan",
      });
    } catch (error) {
      showToast({ type: "red", message: error.message });
    }
  };
};

export default usePostEmployee;

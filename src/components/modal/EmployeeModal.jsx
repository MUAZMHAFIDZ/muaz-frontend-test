import { useState, useEffect } from "react";
import useGetDivisions from "../../hooks/useGetDivisions";

export default function EmployeeModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    image: null,
    position: "",
    division: { id: "", name: "" },
  });

  const { divisions } = useGetDivisions();

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else if (name === "division.id") {
      const selected = divisions.find((d) => d.id === value);
      setForm((prev) => ({
        ...prev,
        division: { id: selected?.id || "", name: selected?.name || "" },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
    setForm({
      name: "",
      phone: "",
      image: null,
      position: "",
      division: { id: "", name: "" },
    });
  };

  const handleClose = () => {
    setForm({
      name: "",
      phone: "",
      image: null,
      position: "",
      division: { id: "", name: "" },
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit" : "Tambah"} Karyawan
        </h2>
        <div className="space-y-3">
          <input
            name="name"
            placeholder="Nama"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded dark:bg-gray-800"
          />
          <input
            name="phone"
            placeholder="Telepon"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded dark:bg-gray-800"
          />
          <input
            name="position"
            placeholder="Jabatan"
            value={form.position}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded dark:bg-gray-800"
          />
          <select
            name="division.id"
            value={form.division.id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded dark:bg-gray-800"
          >
            <option value="">Pilih Divisi</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded dark:bg-gray-800"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

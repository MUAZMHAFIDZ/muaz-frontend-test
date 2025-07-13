import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import EmployeeModal from "../components/modal/EmployeeModal";
import useGetEmployees from "../hooks/useGetEmployees";
import usePostEmployee from "../hooks/usePostEmployee";
import useUpdateEmployee from "../hooks/useUpdateEmployee";
import useDeleteEmployee from "../hooks/useDeleteEmployee";

const perPage = 4;

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const { employees, setEmployees } = useGetEmployees();
  const postEmployee = usePostEmployee(setEmployees);
  const updateEmployee = useUpdateEmployee(setEmployees);
  const deleteEmployee = useDeleteEmployee(setEmployees);

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const currentData = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    setSearchParams({ q: keyword, page });
  }, [keyword, page]);

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (emp) => {
    setEditData(emp);
    setModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (editData) {
      updateEmployee(data);
    } else {
      postEmployee(data);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Data Karyawan</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            + Tambah Karyawan
          </button>
        </div>

        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
          placeholder="Cari nama karyawan..."
          className="w-full px-4 py-2 rounded border mb-4 dark:bg-gray-800 dark:text-white"
        />

        {currentData.length === 0 ? (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Tidak ada data.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {currentData.map((e) => (
              <div
                key={e.id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow relative"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">{e.name}</h2>
                    <p>{e.phone}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {e.position} - {e.division.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-3 justify-end">
                  <button
                    onClick={() => handleEdit(e)}
                    className="px-3 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEmployee(e.id)}
                    className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Halaman {page} dari {totalPages || 1}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages || totalPages === 0}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <EmployeeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editData}
      />
    </div>
  );
}

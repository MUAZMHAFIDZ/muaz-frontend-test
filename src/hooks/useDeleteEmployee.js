const useDeleteEmployee = (setEmployees) => {
  return (id) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const updated = employees.filter((emp) => emp.id !== id);
    localStorage.setItem("employees", JSON.stringify(updated));
    setEmployees(updated);
  };
};

export default useDeleteEmployee;

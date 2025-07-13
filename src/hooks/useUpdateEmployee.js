const useUpdateEmployee = (setEmployees) => {
  return (updatedEmp) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const updated = employees.map((emp) =>
      emp.id === updatedEmp.id ? updatedEmp : emp
    );
    localStorage.setItem("employees", JSON.stringify(updated));
    setEmployees(updated);
  };
};

export default useUpdateEmployee;

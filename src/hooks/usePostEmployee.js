const generateRandomId = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 16; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const usePostEmployee = (setEmployees) => {
  return (newEmployee) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employeeWithId = {
      ...newEmployee,
      id: generateRandomId(),
    };
    const updated = [...employees, employeeWithId];
    localStorage.setItem("employees", JSON.stringify(updated));
    setEmployees(updated);
  };
};

export default usePostEmployee;

import { useState, useEffect } from "react";
import { dummyEmployees } from "./dummyEmployees";

const useGetEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const existing = localStorage.getItem("employees");

    if (!existing) {
      localStorage.setItem("employees", JSON.stringify(dummyEmployees));
      setEmployees(dummyEmployees);
    } else {
      setEmployees(JSON.parse(existing));
    }
  }, []);

  return { employees, setEmployees };
};

export default useGetEmployees;

"use client";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const pathname = usePathname();
  // state

  const [modal, setModal] = useState(false); // modal form to add cashier
  const [deleteModal, setDeleteModal] = useState(false); // modal to delete cashier
  const [cashiers, setCashiers] = useState([]); // list of cashiers
  const [curr, setCurr] = useState(null); // current cashier to delete
  const [sales, setSales] = useState([]);

  // pathname.endsWith("/cashiers") &&
  useEffect(() => {
    const fetcher = async () => {
      const req = await axios.get("http://localhost:5000/cashiers");
      setCashiers([...req.data]);
    };

    fetcher();
  }, []);

  // pathname.endsWith("/sales") &&
  useEffect(() => {
    const saleFetcher = async () => {
      const req = await axios.get("http://localhost:7000/api/salesData");
      setSales([...req.data]);
    };

    saleFetcher();
  }, []);

  const deleteCashier = async (id) => {
    // await fetch(`http://localhost:5000/cashiers/${id}`, {
    //   method: "DELETE",
    // });

    axios.delete(`http://localhost:5000/cashiers/${id}`);

    const update = cashiers.filter((item) => item.id !== id);
    setCashiers(update);
    setDeleteModal(false);
  };

  const addCashier = async (id, name, email, contact) => {
    const data = {
      id,
      name,
      email,
      contact,
      status: true,
    };
    await axios.post("http://localhost:5000/cashiers", data);

    setCashiers((prev) => [...prev, data]);

    setModal(false);
  };

  return (
    <AdminContext.Provider
      value={{
        // statevalues
        deleteModal,
        curr,
        modal,
        cashiers,
        sales,
        // stateSetters
        setDeleteModal,
        setCurr,
        setModal,
        setCashiers,
        setSales,
        // methods
        deleteCashier,
        addCashier,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;

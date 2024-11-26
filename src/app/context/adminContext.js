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
  const [chartData, setChartData] = useState([]);
  const [chartFrame, setChartFrame] = useState("1Y");

  // pathname.endsWith("/cashiers") &&
  // useEffect(() => {
  //   const fetcher = async () => {
  //     const req = await axios.get("http://localhost:5000/cashiers");
  //     setCashiers([...req.data]);
  //   };

  //   fetcher();
  // }, []);

  // pathname.endsWith("/sales") &&
  useEffect(() => {
    const saleFetcher = async () => {
      const req = await axios.get(
        "http://localhost:7000/merchant/api/salesData"
      );
      setSales([...req.data]);
    };

    saleFetcher();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/merchant/api/allTimeSales?range=${chartFrame}`
        );
        const result = await response.json();

        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const chartRule = (entry, chartFrame) => {
          switch (chartFrame) {
            case "1D":
              return `${entry._id.hour}:${entry._id.minute}`;

            case "5D":
            case "1M":
              return `${entry._id.day} ${monthNames[entry._id.month]}`;

            case "1Y":
              return `${monthNames[entry._id.month]} ${entry._id.year}`;
            default:
              return "invalid ChartFrame";
          }
        };

        const formattedData = result.sales.map((entry) => ({
          // Create a readable date label
          label: chartRule(entry, chartFrame),

          // Round up sales
          sales: Math.ceil(entry.sales),
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setChartData, chartFrame]);

  const deleteCashier = async (id) => {
    // await fetch(`http://localhost:5000/cashiers/${id}`, {
    //   method: "DELETE",
    // });

    // axios.delete(`http://localhost:5000/cashiers/${id}`);

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
    // await axios.post("http://localhost:5000/cashiers", data);

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
        chartData,
        setChartData,
        chartFrame,
        setChartFrame,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;

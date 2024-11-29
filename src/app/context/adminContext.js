"use client";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { admin } = useAuthContext();

  // state

  const [modal, setModal] = useState(false); // modal form to add cashier
  const [deleteModal, setDeleteModal] = useState(false); // modal to delete cashier
  const [cashiers, setCashiers] = useState([]); // list of cashiers
  const [curr, setCurr] = useState(null); // current cashier to delete
  const [sales, setSales] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartFrame, setChartFrame] = useState("1Y");
  const [dashboard, setDashboard] = useState({});
  const [adminField, setAdminField] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    merchant_id: "",
  });

  const [onboardField, setOnboardField] = useState({
    name: "",
    address: "",
    state: "",
    logo: "https://banner2.cleanpng.com/20180712/tl/aawy1ozzf.webp",
  });

  const [loginField, setLoginField] = useState({
    email: "",
    password: "",
  });

  // useEffects
  useEffect(() => {
    const localAdmin = localStorage.getItem("admin");
    if (
      !localAdmin &&
      !pathname.includes("auth") &&
      pathname.includes("admin")
    ) {
      router.push("admin/auth/login");
    }
    if (localAdmin && pathname.includes("auth") && pathname.includes("admin")) {
      router.push("/admin/app");
    }
  }, []);

  useEffect(() => {
    if (!admin) return;

    const getCashiers = async () => {
      const res = await axios.get(
        "http://localhost:7000/merchant/api/getCashiers",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${admin?.token}`,
          },
        }
      );

      setCashiers(res.data);
    };
    getCashiers();
  }, [admin]);

  useEffect(() => {
    const saleFetcher = async () => {
      const req = await axios.get(
        "http://localhost:7000/merchant/api/salesData",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${admin?.token}`,
          },
        }
      );

      setSales(...req.data);
    };

    admin && saleFetcher();
  }, [admin]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/merchant/api/allTimeSales?range=${chartFrame}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${admin?.token}`,
            },
          }
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

    admin && fetchData();
  }, [setChartData, chartFrame, admin]);

  useEffect(() => {
    if (!admin?.hasMerch) return;

    const dashboard = async () => {
      const req = await axios.get(
        "http://localhost:7000/merchant/api/dashboard",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${admin?.token}`,
          },
        }
      );

      setDashboard(req.data);
    };

    dashboard();
  }, [admin]);

  const deleteCashier = async (id) => {
    // await fetch(`http://localhost:5000/cashiers/${id}`, {
    //   method: "DELETE",
    // });

    // axios.delete(`http://localhost:5000/cashiers/${id}`);

    const update = cashiers.filter((item) => item.id !== id);
    setCashiers(update);
    setDeleteModal(false);
  };

  const addCashier = async (fullName, email, phoneNumber, badge_id) => {
    const data = {
      fullName,
      email,
      phoneNumber,
      badge_id,
    };
    console.log(email);
    const result = await axios.post(
      "http://localhost:7000/merchant/api/createCashier",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${admin?.token}`,
        },
      }
    );

    setCashiers((prev) => [...prev, result.data]);

    setModal(false);
  };

  const onboardHandler = async () => {
    try {
      const res = await fetch("http://localhost:7000/merchant/api/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${admin?.token}`,
        },
        body: JSON.stringify({
          name: onboardField.name,
          address: onboardField.address,
          state: onboardField.state,
          logo: "https://banner2.cleanpng.com/20180712/tl/aawy1ozzf.webp",
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to onboard: ${res.status} ${res.statusText}`);
      }

      const result = await res.json();
      console.log("Onboarding successful:", result);
      localStorage.setItem(
        "admin",
        JSON.stringify({ ...admin, hasMerch: true })
      );
      router.push("/admin");
    } catch (error) {
      console.error("Error onboarding merchant:", error);
    }
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
        adminField,
        setAdminField,
        onboardField,
        setOnboardField,
        onboardHandler,
        loginField,
        setLoginField,
        dashboard,
        setDashboard,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;

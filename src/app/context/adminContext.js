"use client";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useLogout } from "@/app/hooks/useLogout";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  // const { admin } = useAuthContext();
  const { logout } = useLogout();
  const searchParams = useSearchParams();

  // STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modal, setModal] = useState(false); // modal form to add cashier
  const [deleteModal, setDeleteModal] = useState(false); // modal to delete cashier
  const [cashiers, setCashiers] = useState([]); // list of cashiers
  const [linkModal, setLinkModal] = useState(false);
  const [link, setLink] = useState("");
  const [curr, setCurr] = useState(null); // current cashier to delete
  const [sales, setSales] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartFrame, setChartFrame] = useState("1Y");
  const [dashboard, setDashboard] = useState({});
  const [cashierSearch, setCashierSearch] = useState("");
  const [salesSearch, setSalesSearch] = useState("");
  const [adminField, setAdminField] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    merchant_id: "",
  });
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [activePaymentTypes, setActivePaymentTypes] = useState([]);

  const [onboardField, setOnboardField] = useState({
    name: "",
    address: "",
    state: "Lagos",
    logo: "",
    lat: "",
    lng: "",
  });

  const [loginField, setLoginField] = useState({
    email: "",
    password: "",
  });

  const [urlField, setUrlField] = useState({
    get_api: "",
    update_api: {
      url: "",
      method: "put",
    },
  });

  const [schemaDef, setSchemaDef] = useState({
    name: "",
    quantity: "",
    price: "",
    gtin: "",
  });

  const [paySetting, setPaySetting] = useState({
    cash: true,
    card: true,
    transfer: true,
  });

  // USE EFFECTS
  useEffect(() => {
    // Only proceed if the current path is within the admin platform
    if (!pathname.startsWith("/admin")) return; // This is the main gateway for the admin platform

    // Step 1: Check if the user is authenticated (verify token)
    const checkAuthentication = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7000/merchant/api/check-auth",
          {
            withCredentials: true,
          }
        );

        if (res.data.success && res.data.hasMerch) {
          if (!pathname.includes("/admin/app")) {
            router.push("/admin/app");
          }

          setIsAuthenticated(true); // Token is valid
        } else if (res.data.success && !res.data.hasMerch) {
          if (!pathname.includes("/admin/onboard")) {
            router.push("/admin/onboard");
          }
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        router.push("/admin/auth/login");
      }
    };

    checkAuthentication();
  }, [router]);

  // get cashiers
  useEffect(() => {
    if (!isAuthenticated) return;
    const getCashiers = async () => {
      const res = await axios.get(
        `http://localhost:7000/merchant/api/getCashiers?${searchParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `Bearer ${admin?.token}`,
          },
          withCredentials: true,
        }
      );
      setCashiers(res.data);
    };

    getCashiers();
  }, [searchParams, isAuthenticated]);

  // sales data
  useEffect(() => {
    if (!isAuthenticated) return;
    const saleFetcher = async () => {
      try {
        const req = await axios.get(
          `http://localhost:7000/merchant/api/salesData?${searchParams.toString()}`,
          {
            headers: {
              "Content-Type": "application/json",
              // authorization: `Bearer ${admin.token}`,
            },
            withCredentials: true,
          }
        );
        setSales(req.data || []);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    saleFetcher();
  }, [isAuthenticated]);

  // all time sales
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/merchant/api/allTimeSales?range=${chartFrame}`,
          {
            headers: {
              "Content-Type": "application/json",
              // authorization: `Bearer ${admin?.token}`,
            },
            credentials: "include",
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
              return `${entry._id.day} ${monthNames[entry._id.month - 1]}`;
            case "1Y":
              return `${monthNames[entry._id.month - 1]}, ${entry._id.year}`;
            default:
              return "invalid ChartFrame";
          }
        };

        const formattedData = result.sales?.map((entry) => ({
          // Create a readable date label

          label: chartRule(entry, chartFrame),

          // Round up sales
          sales: entry.sales,
        }));

        setChartData(formattedData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setChartData, chartFrame, isAuthenticated]);

  // payment types
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetcher = async () => {
      try {
        const req = await fetch(
          "http://localhost:7000/merchant/api/paymentTypes",
          {
            headers: {
              "Content-Type": "application/json",
              // authorization: `Bearer ${admin?.token}`,
            },
            credentials: "include",
          }
        );

        const result = await req.json();

        setPaymentTypes(result.paymentTypes);
        setActivePaymentTypes(() =>
          result.merchantPaymentTypes?.map((item) => item._id)
        );
      } catch (error) {
        console.log(error.message);
      }
    };

    fetcher();
  }, [isAuthenticated]);

  // dashboard
  useEffect(() => {
    if (!isAuthenticated) return;

    const dashboard = async () => {
      const req = await axios.get(
        "http://localhost:7000/merchant/api/sales-summary",
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `Bearer ${admin?.token}`,
          },
          withCredentials: true,
        }
      );

      setDashboard(req.data);
    };

    dashboard();
  }, [isAuthenticated]);

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
    try {
      const result = await axios.post(
        "http://localhost:7000/merchant/api/createCashier",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `Bearer ${admin?.token}`,
          },
          withCredentials: true,
        }
      );

      setCashiers((prev) => [...prev, result.data]);

      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onboardHandler = async () => {
    try {
      const res = await fetch("http://localhost:7000/merchant/api/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${admin?.token}`,
        },
        credentials: "include",
        body: JSON.stringify(onboardField),
      });

      if (!res.ok) {
        throw new Error(`Failed to onboard: ${res.status} ${res.statusText}`);
      }

      const result = await res.json();
      console.log("Onboarding successful:", result);
      // localStorage.setItem(
      //   "admin",
      //   JSON.stringify({ ...admin, hasMerch: true })
      // );
      router.push("/admin/app");
    } catch (error) {
      console.error("Error onboarding merchant:", error);
    }
  };

  const addAdmin = async () => {
    const res = await axios.get("http://localhost:7000/merchant/api/getHash", {
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${admin.token}`,
      },
      withCredentials: true,
    });

    if (res.status === 200) {
      setLinkModal(true);
      setLink(
        `http://localhost:3000/admin/auth/signup?merch_id=${res.data.merch_id}`
      );
    }

    console.log(linkModal);
  };

  const logoutHandler = async () => {
    const success = await logout();
    console.log(success);
    if (success) {
      alert(success);
      router.push("/admin/auth/login");
    }
  };

  const settingsHandler = async () => {
    const res = await fetch("http://localhost:7000/merchant/api/configureApi", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${admin.token}`,
      },
      credentials: "include",

      body: JSON.stringify({ urlField, schemaDef }),
    });

    const response = await res.json();
  };

  const paymentTypesHandler = async () => {
    try {
      const res = await fetch(
        "http://localhost:7000/merchant/api/paymentTypes",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // authorization: `Bearer ${admin.token}`,
          },
          credentials: "include",

          body: JSON.stringify({ paymentTypes: activePaymentTypes }),
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to update payment types: ${res.status}`);
      }

      if (res.ok) {
        await res.json();
        alert("Payment types updated successfully");
      }
    } catch (error) {
      console.error("Error updating payment types:", error);
    }
  };

  const handleSearchCashier = async (e) => {
    e.preventDefault();
    const setParams = new URLSearchParams(searchParams);
    setParams.set("search", cashierSearch);
    router.push(`/admin/app/cashiers?${setParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const handleSearchSale = async (e) => {
    e.preventDefault();
    const setParams = new URLSearchParams(searchParams);
    setParams.set("search", salesSearch);
    router.push(`/admin/app/sales?${setParams.toString()}`, undefined, {
      shallow: true,
    });
  };
  const handleActiveCashier = async (cashierStatus) => {
    const setParams = new URLSearchParams(searchParams);
    setParams.set("cashierStatus", cashierStatus);
    router.push(`/admin/app/cashiers?${setParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const paymentMethodFilter = async (paymentMethod) => {
    const setParams = new URLSearchParams(searchParams);
    setParams.set("paymentMethod", paymentMethod);
    router.push(`/admin/app/sales?${setParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  // danger zone
  const deactivate = async () => {
    try {
      const res = await fetch("http://localhost:7000/merchant/api/deactivate", {
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        router.push("/admin/auth/signup");
      }
    } catch (error) {
      console.log("ERROR:", error.message);
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
        addAdmin,
        linkModal,
        setLinkModal,
        link,
        setLink,
        logoutHandler,
        urlField,
        setUrlField,
        schemaDef,
        setSchemaDef,
        paySetting,
        setPaySetting,
        settingsHandler,
        paymentTypes,
        setPaymentTypes,
        activePaymentTypes,
        setActivePaymentTypes,
        paymentTypesHandler,
        cashierSearch,
        setCashierSearch,
        handleSearchCashier,
        handleActiveCashier,
        salesSearch,
        setSalesSearch,
        handleSearchSale,
        paymentMethodFilter,
        deactivate,
        setIsAuthenticated,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;

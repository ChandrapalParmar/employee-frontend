import axios from "axios";
import { useNavigate } from "react-router-dom";

// 👇 Helper Component for Button Actions
export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employee/${Id}`)} // ✅ FIXED
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${Id}`)} // ✅ FIXED
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${Id}`)} // ✅ FIXED
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employee/leaves/${Id}`)} // ✅ FIXED
      >
        Leave
      </button>
    </div>
  );
};

// 👇 Table Columns
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Image",
    // selector: (row) => (
    //   <img
    //     src={`https://employee-backend-nu.vercel.app/${row.profileImage}`} // ✅ Cloud path fix
    //     alt="profile"
    //     width={40}
    //     className="rounded-full"
    //   />
    // ),
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => <EmployeeButtons Id={row._id} />, // ✅ Buttons injected here
    center: true,
  },
];

// 👇 Fetch departments
export const fetchDepartments = async () => {
  // let departments;
  try {
    const response = await axios.get(
      "https://employee-backend-nu.vercel.app/api/department",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        timeout: 10000,
      }
    );
    if (response.data.success) {
      return response.data.departments || [];
    }
    return [];
  } catch (error) {
    alert(error.response?.data?.error || "Failed to fetch departments.");
    return [];
  }

};

// 👇 Get employees for salary form
export const getEmployees = async (id) => {
  // let employees;
  try {
    const response = await axios.get(
      `https://employee-backend-nu.vercel.app/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        timeout: 10000,
      }
    );
    if (response.data.success) {
      return response.data.employees || [];
    }
    return [];
  } catch (error) {
    alert(error.response?.data?.error || "Failed to fetch employees.");
    return [];
  }
  
};

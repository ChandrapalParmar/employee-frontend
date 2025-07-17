import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard.jsx";
import Add from "../components/employee/Add.jsx";
import List from "../components/employee/List.jsx";
import View from "../components/employee/View.jsx";
import Edit from "../components/employee/Edit.jsx";
import Setting from "../components/employeeDashboard/Setting.jsx";
import Leaves from "../components/leave/Add.jsx";
import Detail from "../components/leave/Detail.jsx"
import Salary from "../components/salary/Add.jsx";
import { useAuth } from "../context/AuthContext";

const RoleBaseRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {user && user.role === "admin" ? (
        <>
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard/employees" element={<List />} />
          <Route path="/admin-dashboard/add-employee" element={<Add />} />
          <Route path="/admin-dashboard/employee/:id" element={<View />} />
          <Route path="/admin-dashboard/edit-employee/:id" element={<Edit />} />
          <Route path="/admin-dashboard/setting" element={<Setting />} />
          <Route path="/admin-dashboard/leaves" element={<Leaves />} />
          <Route path="/admin-dashboard/leave/:id" element={<Detail />} />
          <Route path="/admin-dashboard/salary/:id" element={<Salary />} />
          <Route path="unauthorized" element={<div>Unauthorized Access</div>} /> {/* Fixed */}
          <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
        </>
      ) : user && user.role === "employee" ? (
        <>
          <Route path="/employee-dashboard" element={<Dashboard />} />
          <Route path="/employee-dashboard/setting" element={<Setting />} />
          <Route path="unauthorized" element={<div>Unauthorized Access</div>} /> {/* Fixed */}
          <Route path="*" element={<Navigate to="/employee-dashboard" replace />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default RoleBaseRoutes;
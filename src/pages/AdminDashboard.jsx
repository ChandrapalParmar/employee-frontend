
import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import AdminSummary from "../components/AdminSummary"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext"

const AdminDashboard = () => {
  const {user }=useAuth()

  return (
    <div className="flex">
      <AdminSidebar/>
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
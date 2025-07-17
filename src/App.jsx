import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<RoleBaseRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
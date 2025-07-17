// src/components/Unauthorized.jsx
const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">Unauthorized Access</h2>
        <p className="mt-2">You do not have permission to access this page.</p>
        <a href="/login" className="text-teal-600 mt-4 inline-block">
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
import { useNavigate } from 'react-router-dom'

function IndexPageAdmin() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Area</h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/auth/adminlogin')} // Redirect to Admin Login
            className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-full transition"
          >
            Admin Login
          </button>
          <button
            onClick={() => navigate('/auth/adminregister')} // Redirect to Admin Register
            className="bg-white text-blue-600 hover:text-blue-800 font-semibold px-6 py-3 rounded-full transition"
          >
            Admin Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default IndexPageAdmin

import React from "react";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";

export function ResetPassword() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [setError] = useState();

  const handleSubmit = (field: string, value: string) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleResetPassword = async () => {
    if (!user.email) return alert("Please enter your email");
    try {
      await resetPassword(user.email);
      alert("we sent you an email with a link to reset your password");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-sky-700 opacity-100 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-gray-100 flex-col justify-center bg-white py-12 px-24 border-4 border-sky-900 rounded-xl">
          <div className="block text-gray-700 text-lg font-bold my-2 pb-5 mb-5">
            <div className="w-full max-w-xs m-auto bg-gray-100 border rounded ">
              <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="text-center mb-5 block text-gray-700 text-sm font-bold my-2 text-xl"
                  >
                    Your Email
                  </label>
                  <input
                    onChange={(e) => handleSubmit("email", e.target.value)}
                    value={user.email}
                    type="email"
                    name="email"
                    placeholder="youremail@company.ltd"
                    className="text-center bg-gray-100 shadow appearance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                  />
                </div>

                <div className="text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                    onClick={() => handleResetPassword()}
                  >
                    Send Email
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm ml-2">
                    <Link to="/login">Cancel</Link>
                  </button>
                </div>
              </form>
              <p className="my-4 text-sm flex justify-between px-3 block text-gray-700 text-sm font-bold mb-5">
                Don't have an Account? <Link to="/register">Register </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

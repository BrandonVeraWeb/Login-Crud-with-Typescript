import React from "react";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Alert } from "../config/Alert";
export function Register() {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const handleSubmit = (field: string, value: string) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };
  const signInWithEmailAndPassword = async () => {
    setError("Loading, Ya puedes iniciar sesion");
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);

      navigate("/");
      await setError("Loading, Ya puedes iniciar sesion");
    } catch (error) {
      setError("Don't Work");
    }
  };
  return (
    <div className=" bg-sky-700 opacity-100 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-gray-100 flex-col justify-center bg-white py-12 px-24 border-4 border-sky-900 rounded-xl">
          <div className="block text-gray-700 text-lg font-bold my-2 pb-5 mb-5 ">
            {error && <Alert message={error} />}

            <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold my-2"
              >
                Email
              </label>

              <div className="mb-4">
                <input
                  onChange={(e) => handleSubmit("email", e.target.value)}
                  value={user.email}
                  type="email"
                  name="email"
                  placeholder="youremail@company.ltd"
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold my-2"
                >
                  Password
                </label>
                <input
                  onChange={(e) => handleSubmit("password", e.target.value)}
                  value={user.password}
                  type="password"
                  name="password"
                  placeholder="password"
                  id="password"
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tighy focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
                onClick={() => signInWithEmailAndPassword()}
              >
                {" "}
                Register{" "}
              </button>
            </form>
            <p className=" my-4 flex justify-between px-3 text-slate-600">
              Already have an Account?{" "}
              <Link to="/Login" className="text-slate-600">
                {" "}
                Log in{" "}
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

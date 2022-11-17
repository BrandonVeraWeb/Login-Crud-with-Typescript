import React from "react";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "../config/Alert";

export function Login() {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const { Login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const handleSubmit = (field: string, value: string) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };
  const loginWithEmailAndPassword = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setError("Loading");
    try {
      await Login(user.email, user.password);
      navigate("/");
      setError("Loading");
    } catch (error) {
      setError("Email or Password Invalid");
    }
  };

  const handleGoogleSignin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setError("Loading");
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError("Don't Work");
    }
  };
  const resetpss = async () => {
    navigate("/resetpassword");
  };

  return (
    <div className=" bg-sky-700 opacity-100 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-gray-100 flex-col justify-center bg-white py-12 px-24 border-4 border-sky-900 rounded-xl">
          <div className="block text-gray-700 text-lg font-bold my-2 pb-5 mb-5">
            {error && <Alert message={error} />}

            <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold my-2"
                >
                  Email
                </label>
                <input
                  value={user.email}
                  onChange={(e) => handleSubmit("email", e.target.value)}
                  type="email"
                  name="email"
                  required
                  placeholder="youremail@company.ltd"
                  className="bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
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
                  required
                  value={user.password}
                  onChange={(e) => handleSubmit("password", e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  className="bg-gray-100 shadow appearance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  id="Login"
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus"shadow-outline text-sm'
                  onClick={loginWithEmailAndPassword}
                >
                  {" "}
                  Login{" "}
                </button>

                <a
                  href=" "
                  className="inline-block align-basekube fibt-bold text-sm text-blue-500 hover:text-blue-800 font-bold"
                  onClick={resetpss}
                >
                  Forgot Password?
                </a>
              </div>
            </form>
            <p className="text-black my-4 text-sm flex justify-between px-3 block text-gray-700 text-sm font-bold mb-5">
              Don't have an Account? <Link to="/register">Register </Link>{" "}
            </p>
            <button
              className="bg-slate-300 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
              onClick={handleGoogleSignin}
              id="google"
            >
              Google Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

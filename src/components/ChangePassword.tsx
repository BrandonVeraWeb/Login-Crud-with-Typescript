import { updatePassword, getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { useAuth } from "../context/authContext";
import { Alert } from "../config/Alert";
import { useNavigate } from "react-router-dom";
function PasswordChange() {
  const navigate = useNavigate();
  const logout = () => signOut(auth);
  const { user } = useAuth();
  const [password, setPassword] = useState<{
    newPassword: string;
  }>({
    newPassword: "",
  });
  const [passwordConfirm, setpasswordConfirm] = useState<{
    passwordPlus: string;
  }>({
    passwordPlus: "",
  });
  const [error, setError] = useState<string>();
  const handleChange = (field: string, value: string) => {
    setPassword((prevPass) => ({
      ...prevPass,
      [field]: value,
    }));
  };
  const handleChangeConfirm = (field: string, value: string) => {
    setpasswordConfirm((prevConfi) => ({
      ...prevConfi,
      [field]: value,
    }));
  };
  const newPasswordCurrent = password.newPassword;
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (password.newPassword !== passwordConfirm.passwordPlus)
      return setError("PASSWORD ARE NOT THE SAME");

    await updatePassword(user, newPasswordCurrent)
      .then(() => {
        event.preventDefault();
        alert("Password Was Change");
        setError("PASSWORD WAS CHANGE");
        logout();
      })
      .catch((error) => {
        setError("Debes iniciar sesion nuevamente para cambiar tu password");
        logout();
      });
  };
  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className=" bg-sky-700 opacity-100 fixed inset-0 z-50">
        <div className="flex h-screen justify-center items-center">
          <div className="bg-gray-100 flex-col justify-center bg-white py-12 px-24 border-4 border-sky-900 rounded-xl">
            <div className="block text-gray-700 text-lg font-bold my-2 pb-5 mb-5 ">
              {error && <Alert message={error} />}
              <form className="bg-gray-100 border-2 shadow-md rounded px-8 pt-6 pb-8mb-4">
                <label className="block text-gray-700 font-bold">
                  <div className="mb-4">
                    {" "}
                    NEW PASSWORD
                    <input
                      required
                      type="password"
                      name="password"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={password.newPassword}
                      onChange={(e) =>
                        handleChange("newPassword", e.target.value)
                      }
                    ></input>
                  </div>
                </label>
                <label className="block text-gray-700 font-bold">
                  {" "}
                  NEW PASSWORD CONFIRM
                  <input
                    value={passwordConfirm.passwordPlus}
                    onChange={(e) =>
                      handleChangeConfirm("passwordPlus", e.target.value)
                    }
                    type="password"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                  ></input>
                </label>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={handleBack}
                  className="bg-red-500 hover:bg-red-700 text-white shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full mb-4 mt-1"
                >
                  Back
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordChange;

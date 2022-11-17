import React, { useState } from "react";
import { getAuth, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Alert } from "../config/Alert";
export function ChangeEmail() {
  const { user, logout } = useAuth();
  const [emailBasic, setEmailBasic] = useState<{
    newEmail: string;
  }>({
    newEmail: "",
  });
  const navigation = useNavigate();
  const auth = getAuth();
  const email: string = user.email;
  const newEmail: string = emailBasic.newEmail;

  const [error, setError] = useState<string>();
  const handleChange = (field: string, value: string) => {
    setEmailBasic((prevEmail) => ({
      ...prevEmail,
      [field]: value,
    }));
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (email === newEmail)
      return setError("TU CORREO NO PUEDE SER IGUAL QUE EL ANTERIOR ");

    await updateEmail(user, newEmail)
      .then(() => {
        setError("Cambio");
      })
      .catch((error) => {
        setError("Debes Loguearte Nuevamente");
      });
  };
  const handleCancelClick = () => {
    navigation("/");
  };
  return (
    <div className=" bg-sky-700 opacity-100 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-gray-100 flex-col justify-center bg-white py-12 px-24 border-4 border-sky-900 rounded-xl">
          <div className="block text-gray-700 text-lg font-bold my-2 pb-5 mb-5 ">
            {error && <Alert message={error} />}
            <form className=" border-2shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <label>
                YOUR NEW EMAIL
                <input
                  onChange={(e) => handleChange("newEmail", e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  required
                ></input>
              </label>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full mt-2"
                type="submit"
                onClick={handleSubmit}
              >
                GUARDAR
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
                onClick={handleCancelClick}
              >
                BACK
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChangeEmail;

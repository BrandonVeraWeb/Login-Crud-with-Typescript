import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../config/Alert";
import { useAuth } from "../context/authContext";
export default function ChangeDisplayName() {
  const [newDisplayName, setNewDisplayName] = useState<{
    displayNewName: string;
  }>({
    displayNewName: "",
  });
  const navigate = useNavigate();

  const { user } = useAuth();
  const [error, setError] = useState<string>();

  const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      setError("lOADING");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError(`WELCOME ${newDisplayName.displayNewName}`);
    try {
      await updateProfile(user.auth.currentUser, {
        displayName: newDisplayName.displayNewName,
      })
        .then(() => {
          setError(`WELCOME ${newDisplayName.displayNewName}`);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/");
    } catch (error) {
      setError("Intente nuevamente ingresar Su nombre");
      console.log(error);
    }
  };
  const handleChange = (field: string, value: string) => {
    setNewDisplayName((prevDisplay) => ({ ...prevDisplay, [field]: value }));
  };
  return (
    <div className="bg-sky-700 opacity-100 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className=" bg-gray-100 flex-col justify-center bg-white py-12 px-24 border-4 border-sky-900 rounded-xl">
          <div className="block text-gray-700 text-lg font-bold my-2 pb-5 mb-5">
            {error && <Alert message={error} />}
            <form className="bg-gray-100 shadow-md border-2 rounded px-8 pt-6 pb-8 mb-4">
              <label className=" text-center  block text-gray-700 font-bold">
                NEW NAME
                <div className="mb-4 mt-2">
                  <input
                    type="text"
                    value={newDisplayName.displayNewName}
                    name="displayName"
                    onChange={(e) =>
                      handleChange("displayNewName", e.target.value)
                    }
                    required
                    placeholder="Your New Name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></input>
                </div>
              </label>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
              >
                Continuar
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-red-500 hover:bg-red-700 text-white shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full "
              >
                Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

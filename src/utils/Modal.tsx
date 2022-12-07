import React from "react";

export const Modal = ({
  setModalOn,
  setChoice,
  eliminarTarea,
  objetoTarea,
}: {
  setModalOn: any;
  setChoice: any;
  eliminarTarea: Function;
  objetoTarea: any;
}) => {
  const handleCancelClick = () => {
    setChoice(false);
    setModalOn(false);
  };

  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex justify-center bg-white py-12  px-24 border-4 border-sky-500 rounded-xl">
          <div className="flex text-lg text-zinc-600 mb-10">
            Estas seguro que deseas eliminar la tarea?
          </div>
          <div className="flex">
            <button
              className="rounded px-4 py-2 text-white bg-green-400"
              onClick={() => eliminarTarea(objetoTarea.id)}
            >
              YES
            </button>
            <button
              className="rounded px-4 py-2 text-white ml-4 bg-blue-400"
              onClick={handleCancelClick}
            >
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

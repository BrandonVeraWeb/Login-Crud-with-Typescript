import React, { ReactElement, useRef } from "react";
import { app } from "../config/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const firestore = getFirestore(app);
type Task = { id: string };
type Tasks = {
  map: Function;
};

type Add = {
  correoUsuario: string;
  setArrayTareas: Function;
  arrayTareas: [string, string, string];
  editando: boolean;
  setEditando: Function;
  tareaEditar: string;
  setTareaEditar: string;
};

export const AgregarTarea: Function = ({
  correoUsuario,
  setArrayTareas,
  arrayTareas,
  editando,
  setEditando,
  tareaEditar,
  setTareaEditar,
}: Add): ReactElement => {
  const formRef = useRef<any>();
  const inputRef = useRef<any>();
  const inputId = useRef<any>();
  async function anadirTarea(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // crear nuevo array de tareas
    const descripcion: string = inputRef.current.value;
    const state: string = inputId.current.value;
    const nvoArrayTareas = [
      ...arrayTareas,
      {
        id: crypto.randomUUID(),
        state: state,
        descripcion: descripcion,
      },
    ];

    // actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    await updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
    //actualizar estado
    setArrayTareas(nvoArrayTareas);
    //limpiar form
    formRef.current.reset();
    console.log(typeof formRef);
  }

  async function editarTarea(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    function actualizarTarea(
      tareas: Tasks,
      idTarea: string | null,
      nuevaData: object | []
    ) {
      const nuevasTareas = tareas.map((tarea: Task) => {
        if (tarea.id !== idTarea) return tarea;
        setEditando(false);
        let formDescripcion = inputRef.current;
        formDescripcion.value = "";

        let state = inputId.current;
        state.value = "";
        return {
          ...tarea,
          ...nuevaData,
        };
      });

      return nuevasTareas;
    }

    const descripcion = (
      document.getElementById("formDescripcion") as HTMLInputElement
    ).value;
    const state = (document.getElementById("selectEstado") as HTMLInputElement)
      .value;
    const tareaId = (document.getElementById("tareaIdTag") as HTMLInputElement)
      .textContent;

    const tareas = actualizarTarea(arrayTareas, tareaId, {
      descripcion,
      state,
    });

    try {
      // actualizar datos en firebase
      const tareaRef = doc(firestore, "usuarios", correoUsuario);
      await updateDoc(tareaRef, { tareas });
      // actualizar el estado
      setArrayTareas(tareas);
      // throw new Error() // forzar un error
    } catch (error) {
      alert("Ha ocurrido un error al actualizar la tarea");
    }
  }

  const cancelarEdicion = async () => {
    setEditando(false);
    formRef.current.value = " ";
  };

  return (
    <>
      <form ref={formRef} onSubmit={editando ? editarTarea : anadirTarea}>
        <input
          className=" text-center text-2xl block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-center"
          required
          type="text"
          placeholder="Alguna Tarea Por Hacer?"
          id="formDescripcion"
          ref={inputRef}
        />
        <label className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 ">
          Elegir Estado
        </label>
        <select
          id="selectEstado"
          ref={inputId}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected value="Pendiente">
            Pendiente
          </option>
          <option value="Proceso">Proceso</option>
          <option value="Terminado">Terminado</option>
        </select>
        {editando ? (
          <>
            <button
              type="submit"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800 ml-2 mt-2"
              onClick={cancelarEdicion}
            >
              {" "}
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-2 mt-2"
              onClick={(event) => editarTarea}
            >
              {" "}
              Editar tarea{" "}
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-2 mt-2"
          >
            {" "}
            Agregar Tarea{" "}
          </button>
        )}
      </form>
      <p id="tareaIdTag" style={{ display: "none" }}></p>
    </>
  );
};

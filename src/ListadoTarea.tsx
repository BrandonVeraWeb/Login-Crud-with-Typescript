import React, { useState } from "react";
import { app } from "../firebase";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import Tarea from "./Tarea";

const firestore = getFirestore(app);

export const ListadoTareas = ({
  arrayTareas,
  setArrayTareas,
  correoUsuario,
  editando,
  setEditando,
  tareaEditar,
  setTareaEditar,
}) => {
  async function eliminarTarea(idTareaAElminar) {
    //crear nuevo array de tareas
    const nvoArrayTareas = arrayTareas.filter(
      (objetoTarea) => objetoTarea.id !== idTareaAElminar
    );
    //actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
    //actializar state
    setArrayTareas(nvoArrayTareas);
  }

  function editarTarea(objetoTarea) {
    setEditando(true);
    let formDescripcion = document.querySelector("#formDescripcion");
    formDescripcion.value = objetoTarea.descripcion;

    let tareaId = document.querySelector("#tareaIdTag");
    tareaId.innerHTML = objetoTarea.id;
  }

  return (
    <div>
      {arrayTareas.map((objetoTarea, index) => {
        return (
          <Tarea
            arrayTareas={arrayTareas}
            objetoTarea={objetoTarea}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}
            editando={editando}
          />
        );
      })}
    </div>
  );
};

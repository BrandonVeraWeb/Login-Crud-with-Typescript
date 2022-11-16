import { app } from "../config/firebase";
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
}: {
  arrayTareas: any;
  setArrayTareas: any;
  correoUsuario: any;
  editando: any;
  setEditando: any;
  tareaEditar: any;
  setTareaEditar: any;
}) => {
  async function eliminarTarea(idTareaAElminar: any) {
    //crear nuevo array de tareas
    const nvoArrayTareas = arrayTareas.filter(
      (objetoTarea: any) => objetoTarea.id !== idTareaAElminar
    );
    //actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
    //actializar state
    setArrayTareas(nvoArrayTareas);
  }

  function editarTarea(objetoTarea: any) {
    setEditando(true);
    let formDescripcion = document.querySelector(
      "#formDescripcion"
    ) as HTMLInputElement;
    formDescripcion.value = objetoTarea.descripcion;

    let tareaId = document.querySelector("#tareaIdTag") as HTMLInputElement;
    tareaId.innerHTML = objetoTarea.id;
  }

  return (
    <div>
      {arrayTareas.map((objetoTarea: any, index: any) => {
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

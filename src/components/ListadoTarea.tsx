import { app } from "../config/firebase";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import Tarea from "./Tarea";

const firestore = getFirestore(app);

type Add = {
  arrayTareas: Array<Task>;
  setArrayTareas: Function;
  correoUsuario: string;
  editando: boolean;
  setEditando: EditFunction;
  setModalOn: any;
  setChoice: any;

  tareaEditar: string;
  setTareaEditar: string;
};
type Task = {
  descripcion: string;
  id: string;
  state: string;
};
type EditFunction = (objetoTarea: boolean) => void;
export const ListadoTareas: Function = ({
  arrayTareas,
  setArrayTareas,
  correoUsuario,
  editando,
  setEditando,
  tareaEditar,
  setTareaEditar,
  setModalOn,
  setChoice,
}: Add) => {
  async function eliminarTarea(idTareaAElminar: string) {
    //crear nuevo array de tareas
    const nvoArrayTareas = arrayTareas.filter(
      (objetoTarea: Task) => objetoTarea.id !== idTareaAElminar
    );
    //actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
    console.log("quedo");
    //actializar state
    setArrayTareas(nvoArrayTareas);
    setChoice(false);
    setModalOn(false);
  }

  function editarTarea(objetoTarea: Task) {
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
      {arrayTareas.map((objetoTarea: Task, index) => {
        return (
          <Tarea
            key={index}
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

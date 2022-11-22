import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { AgregarTarea } from "../components/AgregarTarea";
import { ListadoTareas } from "../components/ListadoTarea";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../config/firebase";
import Navbar from "../components/NavBar";
export function Home() {
  const { user, loading } = useAuth();
  const [editando, setEditando] = useState<boolean>(false);
  const [tareaEditar, setTareaEditar] = useState<string>("");

  const firestore = getFirestore(app);

  const [arrayTareas, setArrayTareas] = useState<string[]>([]);
  const fakeData = [
    {
      id: 1,
      descripcion: "Crea todas tus tareas aqui",
    },
  ];

  async function buscarDocumentOrCrearDocumento(idDocumento: Number) {
    const docuRef = doc(firestore, `usuarios/${idDocumento}`);
    const consulta = await getDoc(docuRef);
    if (consulta.exists()) {
      const infoDocu = consulta.data();
      return infoDocu.tareas;
    } else {
      await setDoc(docuRef, { tareas: [...fakeData] });
      const consulta = await getDoc(docuRef);
      const infoDocu: any = consulta.data();
      return infoDocu.tareas;
    }
  }
  async function fetchTareas() {
    const tareasFetchadas = await buscarDocumentOrCrearDocumento(user.email);
    setArrayTareas(tareasFetchadas);
  }

  useEffect(() => {
    fetchTareas();
  }, []);

  if (loading) return <h1>loading</h1>;

  return (
    <div>
      <div className=" bg-sky-700 text-center opacity-100 fixed inset-0 z-50">
        <Navbar />
        <div className="flex h-screen justify-center items-center">
          <div className="bg-gray-100 flex-col justify-center bg-white py-12 px-24 border-4 border-sky-900 rounded-xl">
            <h1 className="text-xl mb-4 text-center"> Welcome </h1>

            <hr />
            <AgregarTarea
              arrayTareas={arrayTareas}
              setArrayTareas={setArrayTareas}
              correoUsuario={user.email}
              editando={editando}
              setEditando={setEditando}
              tareaEditar={tareaEditar}
              setTareaEditar={setTareaEditar}
            />
            {arrayTareas ? (
              <ListadoTareas
                arrayTareas={arrayTareas}
                setArrayTareas={setArrayTareas}
                correoUsuario={user.email}
                editando={editando}
                setEditando={setEditando}
                tareaEditar={tareaEditar}
                setTareaEditar={setTareaEditar}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

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
      <Navbar />
      <div className=" text-center min-h-screen max-xs mt-20 ml-60 mr-60 pb-20 text-black rounded">
        <div className="rounded-xl bg-slate-100 rounded shadow-md py-12 px-24 mb-4 border-4 border-zinc-500 ">
          <h1 className="text-xl mb-4 text-center"> Welcome</h1>
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
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { AgregarTarea } from "../AgregarTarea";
import { ListadoTareas } from "../ListadoTarea";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebase";
import { getAuth, updateProfile, signOut } from "firebase/auth";

export function Home() {
  const { user, logout, loading } = useAuth();
  const [editando, setEditando] = useState<boolean>(false);
  const [tareaEditar, setTareaEditar] = useState<string>("");
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [choice, setChoice] = useState<boolean>(false);
  const auth = getAuth();
  const firestore = getFirestore(app);

  const [arrayTareas, setArrayTareas] = useState([]);
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

  const handlelogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  const clicked = () => {
    setModalOn(true);
  };

  console.log(user);
  if (loading) return <h1>loading</h1>;
  // mt-0 ml-4 py-4
  return (
    <div className=" text-center min-h-screen max-xs mt-20 ml-20 mr-20 text-black">
      <div className="rounded-xl bg-slate-100 rounded shadow-md py-12 px-24 mb-4 border-4 border-zinc-500 ">
        <h1 className="text-xl mb-4 text-center"> Welcome {user.email}</h1>
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
        <button
          className="rounded bg-blue-500 mt-2 py-2 px-2 text-white hover:bg-blue-700"
          onClick={() => handlelogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;

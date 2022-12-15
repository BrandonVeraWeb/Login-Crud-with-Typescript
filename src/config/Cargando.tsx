import React from "react";

export function Cargando({ message }: { message: string }) {
  return (
    <div className="bg-blue-300 border border-blue-400 text-white-900 px-4 py-3 rounded relative mb-2 text-center font-bold">
      <span className="sm:inline block">{message}</span>
    </div>
  );
}

export default Cargando;

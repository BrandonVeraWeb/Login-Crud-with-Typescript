import React from "react";

export function Alert({ message }: { message: string }) {
  return (
    <div className="bg-red-300 border border-blue-400 text-red-700 px-4 py-3 rounded relative mb-2 text-center">
      <span className="sm:inline block">{message}</span>
    </div>
  );
}

export default Alert;

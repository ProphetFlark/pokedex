import React from "react";

const Cargando = () => {
  return (
    <div className="cargandodiv">
      <h1 className="h1cargando" data-text="Cargando…">
        Cargando…
      </h1>
      <h4>(La carga dependerá de tu conexión a internet)</h4>
      <h5>(Si la carga falla, podrá ser culpa del servidor)</h5>
    </div>
  );
};

export default Cargando;

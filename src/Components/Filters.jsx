import React from "react";
import "../styles.css";

const Filters = ({ choosenumber }) => {
  function togglebuttons() {
    let botones = document.getElementById("esconderbotones");
    botones.classList.toggle("show");
  }

  return (
    <div className="filtropadre">
      <div className="divfiltros">
        <button className="filtrar" href="" onClick={togglebuttons}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="icono"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>

          <h1 className="filtrartexto">Filtrar</h1>
        </button>
        <div className="tipos" id="esconderbotones">
          <button onClick={() => choosenumber(0)} className="all">
            Todos
          </button>
          <button onClick={() => choosenumber(1)} className="normal">
            Normal
          </button>
          <button onClick={() => choosenumber(2)} className="fighting">
            Lucha
          </button>
          <button onClick={() => choosenumber(3)} className="flying">
            Volador
          </button>
          <button onClick={() => choosenumber(4)} className="poison">
            Veneno
          </button>
          <button onClick={() => choosenumber(5)} className="ground">
            Tierra
          </button>
          <button onClick={() => choosenumber(6)} className="rock">
            Roca
          </button>
          <button onClick={() => choosenumber(7)} className="bug">
            Bicho
          </button>
          <button onClick={() => choosenumber(8)} className="ghost">
            Fantasma
          </button>
          <button onClick={() => choosenumber(9)} className="steel">
            Acero
          </button>
          <button onClick={() => choosenumber(10)} className="fire">
            Fuego
          </button>
          <button onClick={() => choosenumber(11)} className="water">
            Agua
          </button>
          <button onClick={() => choosenumber(12)} className="grass">
            Planta
          </button>
          <button onClick={() => choosenumber(13)} className="electric">
            Eléctrico
          </button>
          <button onClick={() => choosenumber(14)} className="psychic">
            Psíquico
          </button>
          <button onClick={() => choosenumber(15)} className="ice">
            Hielo
          </button>
          <button onClick={() => choosenumber(16)} className="dragon">
            Dragón
          </button>
          <button onClick={() => choosenumber(17)} className="dark">
            Siniestro
          </button>
          <button onClick={() => choosenumber(18)} className="fairy">
            Hada
          </button>
          <button onClick={() => choosenumber(19)} className="igen">
            I Gen.
          </button>
          <button onClick={() => choosenumber(20)} className="iigen">
            II Gen.
          </button>
          <button onClick={() => choosenumber(21)} className="iiigen">
            III Gen.
          </button>
          <button onClick={() => choosenumber(22)} className="ivgen">
            IV Gen.
          </button>
          <button onClick={() => choosenumber(23)} className="vgen">
            V Gen.
          </button>
          <button onClick={() => choosenumber(24)} className="vigen">
            VI Gen.
          </button>
          <button onClick={() => choosenumber(25)} className="viigen">
            VII Gen.
          </button>
          <button onClick={() => choosenumber(26)} className="viiigen">
            VIII Gen.
          </button>
          <button onClick={() => choosenumber(27)} className="ixgen">
            IX Gen.
          </button>
          <button onClick={() => choosenumber(28)} className="all">
            Especiales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;

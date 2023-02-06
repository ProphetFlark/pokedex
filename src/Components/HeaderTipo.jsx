import React from "react";
import "../styles.css";

const HeaderTipo = ({ data }) => {
  var classnametipo = "all";
  const tipo = (tipo) => {
    switch (tipo) {
      case 0:
        return "";
      case 1:
        classnametipo = "normal";
        return "Normal";
      case 2:
        classnametipo = "fighting";
        return "Lucha";
      case 3:
        classnametipo = "flying";
        return "Volador";
      case 4:
        classnametipo = "poison";
        return "Veneno";
      case 5:
        classnametipo = "ground";
        return "Tierra";
      case 6:
        classnametipo = "rock";
        return "Roca";
      case 7:
        classnametipo = "bug";
        return "Bicho";
      case 8:
        classnametipo = "ghost";
        return "Fantasma";
      case 9:
        classnametipo = "steel";
        return "Acero";
      case 10:
        classnametipo = "fire";
        return "Fuego";
      case 11:
        classnametipo = "water";
        return "Agua";
      case 12:
        classnametipo = "grass";
        return "Planta";
      case 13:
        classnametipo = "electric";
        return "Eléctrico";
      case 14:
        classnametipo = "psychic";
        return "Psíquico";
      case 15:
        classnametipo = "ice";
        return "Hielo";
      case 16:
        classnametipo = "dragon";
        return "Dragón";
      case 17:
        classnametipo = "dark";
        return "Siniestro";
      case 18:
        classnametipo = "fairy";
        return "Hada";
      case 19:
        classnametipo = "igen";
        return "Generación I";
      case 20:
        classnametipo = "iigen";
        return "Generación II";
      case 21:
        classnametipo = "iiigen";
        return "Generación III";
      case 22:
        classnametipo = "ivgen";
        return "Generación IV";
      case 23:
        classnametipo = "vgen";
        return "Generación V";
      case 24:
        classnametipo = "vigen";
        return "Generación VI";
      case 25:
        classnametipo = "viigen";
        return "Generación VII";
      case 26:
        classnametipo = "viiigen";
        return "Generación VIII";
      case 27:
        classnametipo = "ixgen";
        return "Generación IX";
      case 28:
        classnametipo = "all";
        return "Especiales";
      default:
        break;
    }
  };

  tipo(data);

  return (
    <div className="headertipo">
      <div className="cuadradotipo">
        <span className={classnametipo}>Pokémon tipo: {tipo(data)}</span>
      </div>
    </div>
  );
};

export default HeaderTipo;

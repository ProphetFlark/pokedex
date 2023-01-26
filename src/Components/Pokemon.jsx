import React from "react";
import { Link } from "react-router-dom";
import { FastAverageColor } from "fast-average-color";

const Pokemon = ({ pokemon }) => {
  const tipo = (type) => {
    switch (type) {
      case "fire":
        return "Fuego";
      case "steel":
        return "Acero";
      case "grass":
        return "Planta";
      case "water":
        return "Agua";
      case "psychic":
        return "Psíquico";
      case "ground":
        return "Tierra";
      case "ice":
        return "Hielo";
      case "flying":
        return "Volador";
      case "ghost":
        return "Fantasma";
      case "normal":
        return "Normal";
      case "poison":
        return "Veneno";
      case "rock":
        return "Roca";
      case "fighting":
        return "Lucha";
      case "dark":
        return "Siniestro";
      case "bug":
        return "Bicho";
      case "dragon":
        return "Dragón";
      case "electric":
        return "Eléctrico";
      case "fairy":
        return "Hada";
      case "shadow":
        return "Sombra";
      default:
        return type;
    }
  };

  const fac = new FastAverageColor();
  const colorin = (image) => {
    fac.getColorAsync(image).then((color) => color.hex.toString());
  };

  return (
    <Link
      to={`pokemon/${pokemon.id}`}
      className="links"
      value={pokemon.id}
    >
      <div className="pokemonindividual">
        <div className="numeroback" id="afectado">
          <p>#{pokemon.id.toString().padStart(3, 0)}</p>
        </div>
        <div className="imagenpoke">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={`Pokémon ${pokemon.name}`}
          />
          {/* <img
            className="hiddenimg"
            src={pokemon.sprites.other["official-artwork"].front_shiny}
            alt={`Pokémon ${pokemon.name}`}
          /> */}
        </div>
        <div className="datospoke">
          <h4 className="numero">#{pokemon.id.toString().padStart(3, 0)}</h4>
          <h2 className="nombre">{pokemon.name}</h2>
        </div>
        <div className="tipopoke">
          {pokemon.types.map((type) => (
            <span key={type.type.name} className={type.type.name}>
              {tipo(type.type.name)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Pokemon;

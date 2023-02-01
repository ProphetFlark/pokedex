import React, { useEffect, useState } from "react";
import "../styles.css";
import Cargando from "./Cargando";
import Filters from "./Filters";
import Pokemon from "./Pokemon";

const Pokemons = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [carga, setcarga] = useState(false);

  const [numero, setNumero] = useState(0);

  const choosenumber = (numero) => {
    setAllPokemons([]);
    setNumero(numero);
  };

  //llamar a un tipo de pokemon
  const gettypepokemon = async (type) => {
    setcarga(false);
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();
    const promises = data.pokemon.map(async (pokemon) => {
      const res = await fetch(pokemon.pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    console.log(results);
    setAllPokemons(results);
    setcarga(true);
  };

  // lLamar 12 pokemones a la API
  const getAllPokemons = async (limit = 12) => {
    setcarga(false);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);

    setAllPokemons([...allPokemons, ...results]);
    setcarga(true);
  };

  const type = () => {
    if (numero === 0) {
      getAllPokemons();
    } else {
      setAllPokemons([]);
      gettypepokemon(numero);
    }
  };

  useEffect(() => {
    // getAllPokemons();
    type();
  }, [offset, numero]);

  const onClickLoadMore = () => {
    setOffset(offset + 12);
  };

  // COLORES DE ACENTO DE LA PAG PRINCIPAL

  document.documentElement.style.setProperty(
    "--color-accent",
    "rgb(255, 255, 255)"
  );
  document.documentElement.style.setProperty("--color-accent2", "rgb(0, 0, 0)");

  console.log(numero);
  return (
    <>
      <Filters choosenumber={choosenumber} />
      {!carga && <Cargando />}
      <div className="divpokemonpadre">
        {allPokemons.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.id} />
        ))}
        <div className="boton">
          <button onClick={onClickLoadMore}>Cargar más</button>
        </div>
      </div>
    </>
  );
};

export default Pokemons;

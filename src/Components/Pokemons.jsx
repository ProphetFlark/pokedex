import React, { useEffect, useState } from "react";
import "../styles.css";
import Filters from "./Filters";
import Pokemon from "./Pokemon";
import { FastAverageColor } from "fast-average-color";

const Pokemons = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  // lLamar 12 pokemones a la API
  const getAllPokemons = async (limit = 12) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);

    setAllPokemons([...allPokemons, ...results]);
  };

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  const onClickLoadMore = () => {
    setOffset(offset + 12);
  };

  document.documentElement.style.setProperty(
    "--color-accent",
    "rgb(255, 255, 255)"
  );
  document.documentElement.style.setProperty(
    "--color-accent2",
    "rgb(255, 255, 0)"
  );
  return (
    <>
      <Filters />
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

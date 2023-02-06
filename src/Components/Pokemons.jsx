import React, { useEffect, useState } from "react";
import "../styles.css";
import Cargando from "./Cargando";
import Filters from "./Filters";
import HeaderTipo from "./HeaderTipo";
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
    setAllPokemons(results);
    setcarga(true);
  };

  //llamar a una generacion
  const getgenpokemon = async (type) => {
    setcarga(false);
    var a = 0;
    var b = 0;
    switch (type) {
      case 19:
        a = 1;
        b = 151;
        break;
      case 20:
        a = 152;
        b = 251;
        break;
      case 21:
        a = 252;
        b = 386;
        break;
      case 22:
        a = 387;
        b = 493;
        break;
      case 23:
        a = 494;
        b = 649;
        break;
      case 24:
        a = 650;
        b = 721;
        break;
      case 25:
        a = 722;
        b = 809;
        break;
      case 26:
        a = 810;
        b = 905;
        break;
      case 27:
        a = 906;
        b = 1008;
        break;
      case 28:
        a = 10001;
        b = 10271;
        break;
      default:
        break;
    }

    var final = [];
    var data = [];
    for (let i = a; i <= b; i++) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      data = await res.json();
      final = [...final, data];
    }
    setAllPokemons(final);
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
      setOffset(0);
      setAllPokemons([]);
      if (numero < 19) {
        gettypepokemon(numero);
      } else {
        getgenpokemon(numero);
      }
    }
  };

  useEffect(() => {
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

  return (
    <>
      <Filters choosenumber={choosenumber} />
      {!carga && <Cargando />}
      <div className="divpokemonpadre">
        {numero === 0 ? "" : <HeaderTipo data={numero} />}
        {allPokemons.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.id} />
        ))}
        <div className="boton">
          {numero === 0 ? (
            <button onClick={onClickLoadMore}>Cargar más</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Pokemons;

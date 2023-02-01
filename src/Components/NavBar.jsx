import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";
import logo from "../assets/logo.svg";
import Autosuggest from "react-autosuggest";
import mini from "../assets/mini.svg";

//https://www.youtube.com/watch?v=cXbDRx5kvEg

const NavBar = () => {
  const data = require("../assets/pokemonsearch.json");
  const navigate = useNavigate();
  const [Pokemons, setPokemons] = useState(data);
  const [value, setValue] = useState("");
  const [setPokemonSeleccionado] = useState({});

  const onSuggestionsFetchRequested = ({ value }) => {
    setPokemons(filtrarPokemons(value));
  };

  const filtrarPokemons = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtrado = data.filter((Pokemon) => {
      var textoCompleto =
        Pokemon.id.toString().padStart(3, 0) + " - " + Pokemon.nombre;

      if (
        textoCompleto
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputValue)
      ) {
        return Pokemon;
      }
    });

    return inputLength === 0 ? [] : filtrado;
  };

  const onSuggestionsClearRequested = () => {
    setPokemons([]);
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.id.toString() + " - " + suggestion.nombre}`;
  };

  const renderSuggestion = (suggestion) => (
    <div className="sugerencia" onClick={() => seleccionarPokemon(suggestion)}>
      <img
        className="imgpequesearch"
        src={`${suggestion.img === null ? mini : suggestion.img}`}
        alt={suggestion.nombre}
      />
      {`${suggestion.id.toString().padStart(3, 0) + " - " + suggestion.nombre}`}
    </div>
  );

  const seleccionarPokemon = (Pokemon) => {
    navigate("/pokemon/" + Pokemon.id);
    setPokemonSeleccionado(Pokemon);
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Buscar Pokémon...",
    value,
    onChange,
  };

  const eventEnter = (e) => {
    if (e.key === "Enter") {
      var split = e.target.value.split("-");
      var Pokemon = {
        id: split[0].trim(),
        nombre: split[1].trim(),
      };
      navigate("/pokemon/" + split[0].trim());
      seleccionarPokemon(Pokemon);
    }
  };

  return (
    <>
      <div className="containernav">
        <Link to="/">
          <div className="divimg">
            <img src={logo} alt="logo pokédex" />
          </div>
        </Link>
        <Autosuggest
          suggestions={Pokemons}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={eventEnter}
        />
        <Link to="/">
          <div className="inicio">
            <h1>Inicio</h1>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;

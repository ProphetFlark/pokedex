import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import mini from "../assets/mini.svg";
import big from "../assets/big.svg";
import shiny from "../assets/shiny.svg";

const PokemonPage = () => {
  const navigate = useNavigate();

  const [pokemondatos, setPokemondatos] = useState({});
  const [pokemonespecie, setPokemonespecie] = useState({});

  const id = document.URL;
  const indice = id.split("/").at(-1);

  let urlfin1 = "/pokemon/" + (parseInt(indice) - 1);
  let urlfin2 = "/pokemon/" + (parseInt(indice) + 1);

  const getPokemonespecie = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${indice}`
    );
    const data = await res.json();
    setPokemonespecie(data);
  };

  const getPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${indice}`);
    const data = await res.json();
    setPokemondatos(data);
    document.getElementById("mySound").load();
  };

  useEffect(() => {
    getPokemonespecie();
    getPokemon();
  }, [navigate]);

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

  if (!pokemondatos.id || !pokemonespecie.order) {
    return (
      <div className="loaderbody">
        <div className="preloader"></div>
      </div>
    );
  }

  //para agregarle color a cada pokemon
  const accentcolor = require("../assets/pokedata.json");
  const botonesdatos = require("../assets/pokemonsearch.json");

  document.documentElement.style.setProperty(
    "--color-accent",
    accentcolor[pokemondatos.id - 1].accent
  );
  document.documentElement.style.setProperty(
    "--color-accent2",
    accentcolor[pokemondatos.id - 1].accent2
  );

  const handleClick = () => {
    parseInt(indice) === 1 ? navigate("/") : navigate(urlfin1);
  };
  const handleClick2 = () => {
    parseInt(indice) > 1007 ? navigate("/") : navigate(urlfin2);
  };

  return (
    <div className="padrepage">
      <div className="fondo">
        <div className="texto">
          <h1>#{pokemondatos.id.toString().padStart(3, 0)}</h1>
        </div>
        <img
          src={
            pokemondatos.sprites.other.dream_world.front_default === null
              ? big
              : pokemondatos.sprites.other.dream_world.front_default
          }
          alt={pokemondatos.name}
        />
      </div>
      <div className="botones">
        <div className="izquierda">
          <button onClick={handleClick}>Anterior</button>
          <img
            src={
              pokemondatos.id === 1
                ? "https://pixsector.com/cache/1788ac30/ave36c6a1e9d5a19e29c4.png"
                : botonesdatos[pokemondatos.id - 2].img === null
                ? mini
                : botonesdatos[pokemondatos.id - 2].img
            }
            alt={pokemondatos.name}
            className="pokebutton"
          />
          <p>
            {pokemondatos.id === 1
              ? "Inicio"
              : botonesdatos[pokemondatos.id - 2].nombre}
          </p>
        </div>
        <div className="derecha">
          <p>
            {parseInt(indice) > 1007
              ? "Inicio"
              : botonesdatos[pokemondatos.id].nombre}
          </p>
          <img
            src={
              parseInt(indice) > 1007
                ? "https://pixsector.com/cache/1788ac30/ave36c6a1e9d5a19e29c4.png"
                : botonesdatos[pokemondatos.id].img === null
                ? mini
                : botonesdatos[pokemondatos.id].img
            }
            alt={pokemondatos.name}
            className="pokebutton"
          />
          <button onClick={handleClick2}>Siguiente</button>
        </div>
      </div>
      <div className="encabezado">
        <div className="infodetalle">
          <h1 className="nombre">{pokemondatos.name}</h1>
          <h3 className="especie">
            {pokemonespecie.genera.length > 4
              ? pokemonespecie.genera[5].genus
              : pokemonespecie.genera === 0
              ? "Desconocido"
              : "Pokémon desconocido"}
          </h3>
          <h4 className="numero">
            Pokédex Nacional: #{pokemondatos.id.toString().padStart(3, 0)}
          </h4>
          <div className="tipopoke" style={{ margin: "10px auto 0px" }}>
            {pokemondatos.types.map((type) => (
              <span
                key={type.type.name}
                className={type.type.name}
                style={{ margin: "0 auto" }}
              >
                {tipo(type.type.name)}
              </span>
            ))}
          </div>
        </div>
        <div className="imagencompleto">
          <div className="imagenhover">
            <img
              src={
                pokemondatos.sprites.other["official-artwork"].front_default ===
                null
                  ? big
                  : pokemondatos.sprites.other["official-artwork"].front_default
              }
              alt={pokemondatos.name}
              className="imgdetalle"
            />
            <img
              src={
                pokemondatos.sprites.other["official-artwork"].front_shiny ===
                null
                  ? shiny
                  : pokemondatos.sprites.other["official-artwork"].front_shiny
              }
              alt={pokemondatos.name}
              className="imgdetallehidden"
            />
          </div>
          <div className="textoabajoimagen">
            <p>
              *Pasa el ratón por encima o toca para cambiar a su forma Shiny
            </p>
          </div>
        </div>
      </div>
      <div className="especieyhabi">
        <div className="infobasica">
          <div className="detallesavanzados">
            <h1>Detalles avanzados</h1>
          </div>
          <div className="masdetalles">
            <div className="imagencita">
              <img
                src={
                  pokemondatos.sprites.front_default === null
                    ? mini
                    : pokemondatos.sprites.front_default
                }
                alt={pokemondatos.name}
              />
              <div className="grito">
                <audio controls autoPlay id="mySound">
                  <source
                    src={`https://play.pokemonshowdown.com/audio/cries/${accentcolor[
                      pokemondatos.id - 1
                    ].name.replace("-", "")}.mp3`}
                    type="audio/mpeg"
                  />
                </audio>
              </div>
            </div>
            <div className="detallescompletos">
              <div className="altura">
                <h4>{(pokemondatos.height / 10).toFixed(1)} Metros</h4>
                <p>Altura</p>
              </div>
              <div className="peso">
                <h4>{(pokemondatos.weight / 10).toFixed(1)} Kg.</h4>
                <p>Peso</p>
              </div>
              <div className="felicidad">
                <h4>{pokemonespecie.base_happiness}</h4>
                <p>Felicidad base</p>
              </div>
              <div className="catchrate">
                <h4>{pokemonespecie.capture_rate}</h4>
                <p>Ratio de Captura</p>
              </div>
              <div className="expbase">
                <h4>{pokemondatos.base_experience} exp.</h4>
                <p>Experiencia base</p>
              </div>
              <div className="growthrate">
                {pokemonespecie.growth_rate === null ? (
                  <h4>Desconocido</h4>
                ) : (
                  <h4>{pokemonespecie.growth_rate.name}</h4>
                )}
                <p>Curva de crecimiento</p>
              </div>
              <div className="habitat">
                {pokemonespecie.habitat === null ? (
                  <h4>Desconocido</h4>
                ) : (
                  <h4>{pokemonespecie.habitat.name}</h4>
                )}
                <p>Hábitat</p>
              </div>
              <div className="hatchcounter">
                <h4>
                  {pokemonespecie.hatch_counter} (
                  {pokemonespecie.hatch_counter * 255} pasos)
                </h4>
                <p>Ciclos del Huevo</p>
              </div>
              <div className="egggroups">
                {pokemonespecie.egg_groups?.map((egg) => (
                  <h4 key={egg.name}>{egg.name}</h4>
                ))}
                <p>Grupos huevo</p>
              </div>
              <div className="genero">
                {pokemonespecie.has_gender_differences ? (
                  <h4>Si</h4>
                ) : (
                  <h4>No</h4>
                )}
                <p>¿Se diferencia por el sexo?</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hastaabajo">
          <p>Habilidades</p>
          <div className="abilities">
            <div className="hiddenabi">
              {pokemondatos.abilities?.map((abilitiess) => (
                <h1 key={abilitiess.ability.name}>
                  {abilitiess.is_hidden && abilitiess.ability.name}
                </h1>
              ))}
            </div>
            <div className="unhiddenabi">
              {pokemondatos.abilities?.map((abilitiess) => (
                <h1 key={!abilitiess.is_hidden && abilitiess.ability.name}>
                  {!abilitiess.is_hidden && abilitiess.ability.name}
                </h1>
              ))}
            </div>
          </div>
          <div className="estadisticaspadre">
            <div className="estadisticas">
              <div className="base">
                <div className="ps">
                  <span className="nombres">PS</span>
                  <span
                    className="barra0"
                    style={{
                      width: `${75 * (pokemondatos.stats[0].base_stat / 150)}%`,
                    }}
                  >
                    {pokemondatos.stats[0].base_stat}
                  </span>
                </div>
                <div className="atq">
                  <span className="nombres">Ataque</span>
                  <span
                    className="barra1"
                    style={{
                      width: `${75 * (pokemondatos.stats[1].base_stat / 150)}%`,
                    }}
                  >
                    {pokemondatos.stats[1].base_stat}
                  </span>
                </div>
                <div className="def">
                  <span className="nombres">Defensa</span>
                  <div
                    className="barra2"
                    style={{
                      width: `${75 * (pokemondatos.stats[2].base_stat / 150)}%`,
                    }}
                  >
                    {pokemondatos.stats[2].base_stat}
                  </div>
                </div>
                <div className="atqesp">
                  <span className="nombres">Ataque especial</span>
                  <span
                    className="barra3"
                    style={{
                      width: `${75 * (pokemondatos.stats[3].base_stat / 150)}%`,
                    }}
                  >
                    {pokemondatos.stats[3].base_stat}
                  </span>
                </div>
                <div className="defesp">
                  <span className="nombres">Defensa especial</span>
                  <span
                    className="barra4"
                    style={{
                      width: `${75 * (pokemondatos.stats[4].base_stat / 150)}%`,
                    }}
                  >
                    {pokemondatos.stats[4].base_stat}
                  </span>
                </div>
                <div className="velocidad">
                  <span className="nombres">Velocidad</span>
                  <span
                    className="barra5"
                    style={{
                      width: `${75 * (pokemondatos.stats[5].base_stat / 150)}%`,
                    }}
                  >
                    {pokemondatos.stats[5].base_stat}
                  </span>
                </div>
              </div>
              <div className="total">
                <h2 className="totalh2">
                  Total:{" "}
                  {pokemondatos.stats[0].base_stat +
                    pokemondatos.stats[1].base_stat +
                    pokemondatos.stats[2].base_stat +
                    pokemondatos.stats[3].base_stat +
                    pokemondatos.stats[4].base_stat +
                    pokemondatos.stats[5].base_stat}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;

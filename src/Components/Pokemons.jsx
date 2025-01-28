import React, { useEffect, useState, useCallback } from "react";
import "../styles.css";
import Cargando from "./Cargando";
import Filters from "./Filters";
import HeaderTipo from "./HeaderTipo";
import Pokemon from "./Pokemon";

const cache = {
  pokemon: new Map(),
  types: new Map(),
  generations: new Map()
};

const BATCH_SIZE = 5; // Número de solicitudes paralelas
const PAGE_SIZE = 12; // Pokémon por página

const Pokemons = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [carga, setCarga] = useState(false);
  const [numero, setNumero] = useState(0);
  const [totalPokemon, setTotalPokemon] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchWithCache = async (url, cacheMap) => {
    if (cacheMap.has(url)) {
      return cacheMap.get(url);
    }
    const response = await fetch(url);
    const data = await response.json();
    cacheMap.set(url, data);
    return data;
  };

  const processBatch = async (urls) => {
    const results = [];
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batch = urls.slice(i, i + BATCH_SIZE);
      const batchPromises = batch.map(url => 
        fetchWithCache(url, cache.pokemon)
      );
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }
    return results;
  };

  const choosenumber = useCallback((num) => {
    setAllPokemons([]);
    setOffset(0);
    setNumero(num);
    setTotalPokemon([]);
    setHasMore(true);
  }, []);

  const gettypepokemon = useCallback(async (type) => {
    setCarga(false);
    try {
      // Si no tenemos los datos totales del tipo, los obtenemos
      if (totalPokemon.length === 0) {
        const typeData = await fetchWithCache(
          `https://pokeapi.co/api/v2/type/${type}`,
          cache.types
        );
        const pokemonUrls = typeData.pokemon.map(p => p.pokemon.url);
        setTotalPokemon(pokemonUrls);
        
        // Procesar solo los primeros PAGE_SIZE Pokémon
        const initialUrls = pokemonUrls.slice(0, PAGE_SIZE);
        const results = await processBatch(initialUrls);
        setAllPokemons(results);
      } else {
        // Cargar la siguiente página
        const nextUrls = totalPokemon.slice(offset, offset + PAGE_SIZE);
        const results = await processBatch(nextUrls);
        setAllPokemons(prev => [...prev, ...results]);
      }
      
      // Verificar si hay más Pokémon para cargar
      setHasMore(offset + PAGE_SIZE < totalPokemon.length);
    } catch (error) {
      console.error("Error fetching type pokemon:", error);
    } finally {
      setCarga(true);
    }
  }, [offset, totalPokemon]);

  const getgenpokemon = useCallback(async (gen) => {
    setCarga(false);
    const ranges = {
      19: [1, 151],
      20: [152, 251],
      21: [252, 386],
      22: [387, 493],
      23: [494, 649],
      24: [650, 721],
      25: [722, 809],
      26: [810, 905],
      27: [906, 1008],
      28: [10001, 10271]
    };

    try {
      const [start, end] = ranges[gen] || [0, 0];
      if (start === 0) return;

      // Si no tenemos los datos totales de la generación, los preparamos
      if (totalPokemon.length === 0) {
        const urls = [];
        for (let i = start; i <= end; i++) {
          urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
        }
        setTotalPokemon(urls);
        
        // Procesar solo los primeros PAGE_SIZE Pokémon
        const initialUrls = urls.slice(0, PAGE_SIZE);
        const results = await processBatch(initialUrls);
        setAllPokemons(results);
      } else {
        // Cargar la siguiente página
        const nextUrls = totalPokemon.slice(offset, offset + PAGE_SIZE);
        const results = await processBatch(nextUrls);
        setAllPokemons(prev => [...prev, ...results]);
      }
      
      // Verificar si hay más Pokémon para cargar
      setHasMore(offset + PAGE_SIZE < totalPokemon.length);
    } catch (error) {
      console.error("Error fetching generation pokemon:", error);
    } finally {
      setCarga(true);
    }
  }, [offset, totalPokemon]);

  const getAllPokemons = useCallback(async (limit = PAGE_SIZE) => {
    setCarga(false);
    try {
      const listData = await fetchWithCache(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        cache.pokemon
      );
      
      const urls = listData.results.map(pokemon => pokemon.url);
      const results = await processBatch(urls);
      
      setAllPokemons(prev => [...prev, ...results]);
      setHasMore(listData.next !== null);
    } catch (error) {
      console.error("Error fetching all pokemon:", error);
    } finally {
      setCarga(true);
    }
  }, [offset]);

  useEffect(() => {
    const loadData = async () => {
      if (numero === 0) {
        await getAllPokemons();
      } else if (numero < 19) {
        await gettypepokemon(numero);
      } else {
        await getgenpokemon(numero);
      }
    };
    
    loadData();
  }, [offset, numero, getAllPokemons, gettypepokemon, getgenpokemon]);

  const onClickLoadMore = () => {
    setOffset(offset + PAGE_SIZE);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", "rgb(255, 255, 255)");
    document.documentElement.style.setProperty("--color-accent2", "rgb(0, 0, 0)");
  }, []);

  return (
    <>
      <Filters choosenumber={choosenumber} />
      {!carga && <Cargando />}
      <div className="divpokemonpadre">
        {numero !== 0 && <HeaderTipo data={numero} />}
        {allPokemons.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.id} />
        ))}
        <div className="boton">
          {hasMore && (
            <button onClick={onClickLoadMore}>Cargar más</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Pokemons;

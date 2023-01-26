import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./Components/NavBar";
import PokemonPage from "./Components/PokemonPage";
import Pokemons from "./Components/Pokemons";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // React.StrictMode
  <>
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Pokemons />} />
        <Route path="pokemon/:id" element={<PokemonPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </>
);

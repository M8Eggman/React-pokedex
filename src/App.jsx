import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [pokemons, setPokemons] = useState(null);
  useEffect(() => {
    axios
      .get("https://pokebuildapi.fr/api/v1/pokemon")
      .then((response) => setPokemons(response.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home pokemons={pokemons} />} />
        <Route path="/:id" element={<Details pokemons={pokemons} />} />
      </Routes>
    </>
  );
}

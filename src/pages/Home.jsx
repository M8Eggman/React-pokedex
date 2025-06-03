import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home({ pokemons }) {
  const navigate = useNavigate();

  const [loadedPokemon, setLoadedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  // liste de tout les type de pokemon
  const allTypes = [
    "Normal",
    "Feu",
    "Eau",
    "Plante",
    "Électrik",
    "Glace",
    "Combat",
    "Poison",
    "Sol",
    "Vol",
    "Psy",
    "Insecte",
    "Roche",
    "Spectre",
    "Dragon",
    "Ténèbres",
    "Acier",
    "Fée",
  ];

  // au chargement de pokemon set loaded pokemon aux 16 premier
  useEffect(() => {
    setLoadedPokemon(pokemons?.slice(0, 16));
  }, [pokemons]);
  // use effect pour la recherche
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    let filtered = pokemons;
    // si term vide et type vide reset la recherche
    if (term === "" && selectedType === "") {
      setSearchResults(null);
      return;
    }
    if (term !== "") {
      filtered = filtered.filter((pokemon) => pokemon.name.toLowerCase().includes(term) || pokemon.id === parseInt(term));
    }
    if (selectedType !== "") {
      filtered = filtered.filter((pokemon) => pokemon.apiTypes.filter((type) => type.name === selectedType).length === 1);
    }
    setSearchResults(filtered);
  }, [searchTerm, selectedType, pokemons]);

  // charge 16 pokemon de plus
  function handleLoadMore() {
    setTimeout(() => {
      setLoadedPokemon(pokemons.slice(0, loadedPokemon.length + 16));
    }, 200);
  }
  // reset la recherche
  function resetFilters() {
    setSearchTerm("");
    setSelectedType("");
    setSearchResults(null);
  }

  const displayed = searchResults || loadedPokemon;

  return (
    <section className="pokedex">
      <div className="search">
        <input type="text" placeholder="Nom ou ID du Pokémon" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Tous les types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button className="resetBtn" onClick={resetFilters}>
          Réinitialiser
        </button>
      </div>
      <div className="pokemons">
        {pokemons ? (
          displayed && displayed.length > 0 ? (
            displayed.map((pokemon) => (
              <div className="card" key={pokemon.id} onClick={() => navigate(`${pokemon.id}`)}>
                <img src={pokemon.image} alt="" className="pokemon-img" />
                <div className="number">
                  <p>N° {pokemon.id.toString().padStart(4, "0")}</p>
                </div>
                <h2>{pokemon.name}</h2>
                <div className="types">
                  {pokemon.apiTypes.map((type) => (
                    <div key={type.name} className={`type ${type.name.toLowerCase()}`}>
                      <p>{type.name}</p>
                      <img src={type.image} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="chargementHome">
              <p>Aucun résultat trouvé</p>
            </div>
          )
        ) : (
          <div className="chargementHome">
            <p>Chargement...</p>
          </div>
        )}
      </div>
      {!searchResults && (
        <button onClick={handleLoadMore} className="loadMore">
          Charger plus de pokemon
        </button>
      )}
    </section>
  );
}

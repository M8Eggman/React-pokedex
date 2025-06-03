import { useParams, useNavigate } from "react-router-dom";
import "./Details.css";
import { useEffect, useState } from "react";

export default function Details({ pokemons }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState();
  const [prevPok, setPrevPok] = useState();
  const [nextPok, setNextPok] = useState();

  useEffect(() => {
    if (!pokemons) return;
    const currentIndex = pokemons.findIndex((p) => p.id === parseInt(id));
    setPokemon(pokemons[currentIndex]);
    setPrevPok(pokemons[(currentIndex - 1 + pokemons.length) % pokemons.length]);
    setNextPok(pokemons[(currentIndex + 1) % pokemons.length]);
  }, [pokemons, id]);

  return !pokemons ? (
    <div className="chargementDetails"><p>Chargement...</p></div>
  ) : !pokemon ? (
    <div className="chargementDetails"><p>Pokémon introuvable</p></div>
  ) : (
    <div className="details">
      <div className="detailsHeader">
        <button className="detailsBtn" onClick={() => navigate(`/${prevPok.id}`)}>
          N° ${prevPok.id.toString().padStart(4, "0")} {prevPok.name}
        </button>
        <div className="detailsTitle">
          <h1>
            {pokemon.name} <span>N° {pokemon.id.toString().padStart(4, "0")}</span>
          </h1>
        </div>
        <button className="detailsBtn" onClick={() => navigate(`/${nextPok.id}`)}>
          N° ${nextPok.id.toString().padStart(4, "0")} {nextPok.name}
        </button>
      </div>
      <div className="detailsMain">
        <div className="detailsImg">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <div className="detailsInfo">
          <div className="detailsInfoTypes">
            <span>Type</span>
            {pokemon.apiTypes.map((type) => (
              <span key={type.name} className={`type typeDetails ${type.name.toLowerCase()}`}>
                {type.name}
              </span>
            ))}
          </div>
          <div className="detailsInfoTypes">
            <span>Faiblesse(s)</span>
            {pokemon.apiResistances
              ?.filter((r) => r.damage_relation.includes("vulnerable"))
              .map((r) => (
                <span key={r.name} className={`type typeDetails ${r.name.toLowerCase()}`}>
                  {r.name}
                </span>
              ))}
          </div>
          <div className="detailsInfoTypes">
            <span>Résistance</span>
            {pokemon.apiResistances
              ?.filter((r) => r.damage_relation.includes("resistant"))
              .map((r) => (
                <span key={r.name} className={`type typeDetails ${r.name.toLowerCase()}`}>
                  {r.name}
                </span>
              ))}
          </div>
          <div className="detailsInfoTypes">
            <span>Immunité</span>
            {pokemon.apiResistances
              ?.filter((r) => r.damage_relation.includes("immune"))
              .map((r) => (
                <span key={r.name} className={`type typeDetails ${r.name.toLowerCase()}`}>
                  {r.name}
                </span>
              ))}
          </div>
          <div className="detailsStats">
            <h3>Stats de base</h3>
            <div className="statBars">
              {[
                ["HP", "HP"],
                ["Attack", "attack"],
                ["Defense", "defense"],
                ["Special Attack", "special_attack"],
                ["Special Defense", "special_defense"],
                ["Speed", "speed"],
              ].map((stat) => (
                <div key={stat[1]} className="statBar">
                  <p>{stat[0]}</p>
                  <div className="barBg">
                    <div
                      className="barFill"
                      style={{
                        width: `${pokemon.stats[stat[1]]}px`,
                      }}></div>
                  </div>
                  <p>{pokemon.stats[stat[1]]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button className="moreBtn" onClick={() => navigate("/")}>
        Plus de Pokémon
      </button>
    </div>
  );
}

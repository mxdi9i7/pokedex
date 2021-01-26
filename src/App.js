import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingGIf from './loading.gif';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [pokemonDetail, setPokemonDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=1000'
        );
        setPokemons(response.data.results);
      } catch (error) {
        alert('We have an error');
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handlePokemonClick = (name) => {
    setCurrentPokemon(name);
    setShowPopup(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${currentPokemon}`
        );
        setPokemonDetail(response.data.sprites);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPokemon]);

  return (
    <div className='App'>
      <h1>HTTPS requests</h1>
      <h2>Async await</h2>
      <h2>Promises</h2>
      <h1>Pokemon's index</h1>
      <div className='pokemons-index'>
        {pokemons.length &&
          pokemons.map((v) => {
            return (
              <div
                onClick={() => handlePokemonClick(v.name)}
                className='pokemon'
                key={v.name}
              >
                <p>{v.name}</p>
              </div>
            );
          })}
      </div>
      <div className={`popup ${showPopup && 'show'}`}>
        <button onClick={() => setShowPopup(false)}>Close</button>
        <h1>{currentPokemon}</h1>
        {loading ? (
          <img src={LoadingGIf} alt='loading' />
        ) : (
          <>
            <img src={pokemonDetail.front_default} alt='Front default' />
            <img src={pokemonDetail.back_default} alt='Back default' />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

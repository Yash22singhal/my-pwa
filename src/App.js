import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemonList } from './api/pokemon';

function App() {
  const [pokemonData, setPokemonData] = useState([])


  useEffect(() => {
    async function fetchData(){
      const data = await getAllPokemonList();
      setPokemonData(data?.results)
    }
    fetchData();
  })
  return (
    <div className="App">
      <div style={{
        marginTop:'4opx', justifyContent:'space-around', display:'flex', flexWrap:'wrap', width:'90%', margin:'auto'
      }}>
        {
          pokemonData?.map((poke, i) => {
            return (
              <div key={i} style={{width:'400px', height:'330px', border:'2px solid black', margin:'30px 10px'}}>
                <img style={{height:'300px', width:'300px'}}
                alt = 'pokemon'
                src={`https://img.pokemondb.net/artwork/large/${poke.name}.jpg`} />
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;

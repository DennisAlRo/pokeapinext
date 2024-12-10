'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '../../layout';

const GENERATION_RANGES = {
  1: { start: 1, end: 151, background: '#FFEBEE' },
  2: { start: 152, end: 251, background: '#E8F5E9' },
  3: { start: 252, end: 386, background: '#E3F2FD' },
  4: { start: 387, end: 493, background: '#E3F2FD' },
};

export default function GeneracionPage() {
  const params = useParams();
  const id = params.id;
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focusedPokemon, setFocusedPokemon] = useState(null);
  const generationRange = GENERATION_RANGES[id];
  const { dictionary } = useLanguage();

  useEffect(() => {
    if (generationRange && id !== '3') { 
      fetchPokemons();
    }
  }, [id]);

  const fetchPokemons = async () => {
    setLoading(true);
    const pokemonIds = generateRandomIds(generationRange.start, generationRange.end, 10);
    const promises = pokemonIds.map(async (pokemonId) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      return res.json();
    });

    const results = await Promise.all(promises);
    setPokemons(results);
    setLoading(false);
  };

  const generateRandomIds = (start, end, count) => {
    const ids = new Set();
    while (ids.size < count) {
      ids.add(Math.floor(Math.random() * (end - start + 1)) + start);
    }
    return [...ids];
  };

  if (id === '3') {
    return (
      <div >
        <img src="https://www.raquelbegue.com/blog/wp-content/uploads/2014/01/404-charizard.jpg"></img>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: generationRange?.background, minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        {dictionary.generationTitle} {id}
      </h1>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ fontSize: '1.5rem', color: '#555' }}>{dictionary.loading} Cargando</p>
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '5px solid #ccc',
              borderTop: '5px solid #007BFF',
              borderRadius: '50%',
              margin: '0 auto',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1rem',
            justifyItems: 'center',
          }}
        >
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              style={{
                border: '1px solid #ccc',
                padding: '0.5rem',
                width: '100%',
                maxWidth: '200px',
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '100%' }} />
              <h3
                style={{
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                  color: '#000',
                  margin: '0.5rem 0',
                }}
              >
                {pokemon.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#000', margin: '0.25rem 0' }}>
                <strong>ID:</strong> {pokemon.id}
              </p>
              <button
                onClick={() => setFocusedPokemon(pokemon)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {dictionary.buttonMoreInfo}
              </button>
            </div>
          ))}
        </div>
      )}

      {focusedPokemon && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              color: '#000',
              padding: '2rem',
              borderRadius: '12px',
              width: '400px',
              textAlign: 'center',
            }}
          >
            <img src={focusedPokemon.sprites.front_default} alt={focusedPokemon.name} style={{ width: '100%' }} />
            <h2 style={{ textTransform: 'capitalize' }}>{focusedPokemon.name}</h2>
            <p>
              <strong>ID:</strong> {focusedPokemon.id}
            </p>
            <p>
              <strong>{dictionary.pokemonHeight}:</strong> {focusedPokemon.height / 10} m
            </p>
            <p>
              <strong>{dictionary.pokemonWeight}:</strong> {focusedPokemon.weight / 10} kg
            </p>
            <p>
              <strong>{dictionary.pokemonTypes}:</strong> {focusedPokemon.types.map((type) => type.type.name).join(', ')}
            </p>
            <p>
              <strong>{dictionary.pokemonAbilities}:</strong>{' '}
              {focusedPokemon.abilities.map((ability) => ability.ability.name).join(', ')}
            </p>
            <div>
              <strong>{dictionary.baseStats}:</strong>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {focusedPokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name.toUpperCase()}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setFocusedPokemon(null)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#DC3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem',
              }}
            >
              {dictionary.buttonCloseModal}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

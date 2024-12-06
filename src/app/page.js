'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from './layout';

export default function HomePage() {
  const [pokemon, setPokemon] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const { dictionary } = useLanguage();

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await res.json();
    setPokemon(data);
    setIsFocused(false);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#F3E5F5', minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={{ color: '#333' }}>{dictionary.title}</h1>

      {pokemon && (
        <div
          style={{
            margin: '1rem auto',
            border: '1px solid #ccc',
            padding: '1rem',
            width: isFocused ? '400px' : '250px',
            borderRadius: '12px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ width: isFocused ? '100%' : '80%', marginBottom: '0.5rem' }}
          />
          <h3 style={{ textTransform: 'capitalize', fontSize: '1.2rem', color: '#000', margin: '0.5rem 0' }}>
            {pokemon.name}
          </h3>
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={fetchRandomPokemon}
          style={{
            padding: '0.7rem 1.2rem',
            fontSize: '1rem',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '1rem',
            transition: 'background 0.3s ease',
          }}
        >
          {dictionary.buttonChange}
        </button>

        <button
          onClick={() => setIsFocused(!isFocused)}
          style={{
            padding: '0.7rem 1.2rem',
            fontSize: '1rem',
            backgroundColor: isFocused ? '#DC3545' : '#28A745',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
        >
          {isFocused ? dictionary.buttonClose : dictionary.buttonDetails}
        </button>
      </div>
    </div>
  );
}

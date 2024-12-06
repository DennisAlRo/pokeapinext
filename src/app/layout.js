'use client';

import { useState, createContext, useContext } from 'react';
import Navbar from '@/componentes/Nav'; // Manteniendo tu Navbar
import { getDictionary } from '@/componentes/diccionario';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './globals.css';

// Crear contexto de idioma
const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function RootLayout({ children }) {
  const [language, setLanguage] = useState('en');
  const dictionary = getDictionary(language);

  return (
    <html lang={language}>
      <body>
        <LanguageContext.Provider value={{ language, dictionary, setLanguage }}>
          <Navbar />
          <header style={{ textAlign: 'center', margin: '1rem' }}>
            <button
              onClick={() => setLanguage('en')}
              style={{ margin: '0 0.5rem', padding: '0.5rem' }}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('es')}
              style={{ margin: '0 0.5rem', padding: '0.5rem' }}
            >
              Español
            </button>
            <button
              onClick={() => setLanguage('de')}
              style={{ margin: '0 0.5rem', padding: '0.5rem' }}
            >
              Deutsch
            </button>
          </header>
          <main>{children}</main>
        </LanguageContext.Provider>
      </body>
    </html>
  );
}

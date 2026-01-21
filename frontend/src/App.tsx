// import Header from './layouts/Header.tsx'
// import Footer from './layouts/Footer.tsx'
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage.tsx';
import Layout from './layouts/Layout.tsx';
import CharacterDetailPage from './pages/CharacterDetailPage.tsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/characters/:id/:name?" element={<CharacterDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App

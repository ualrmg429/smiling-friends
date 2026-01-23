import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage.tsx';
import Layout from './layouts/Layout.tsx';
import CharacterDetailPage from './pages/CharacterDetailPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import VerifyEmailPage from './pages/VerifyEmailPage';
import NoLayout from './layouts/NoLayout.tsx';


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id/:name?" element={<CharacterDetailPage />} />
      </Route>
      <Route element={<NoLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>
    </Routes>
  );
}

export default App

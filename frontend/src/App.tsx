import Header from './layouts/Header.tsx'
import Footer from './layouts/Footer.tsx'
import HomePage from './pages/HomePage.tsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HomePage />
      <Footer />
    </div>
  )
}

export default App

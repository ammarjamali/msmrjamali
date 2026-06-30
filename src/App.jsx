import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Quote from './pages/Quote'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/catalogue/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/quote" element={<Quote />} />
      </Route>
    </Routes>
  )
}

export default App
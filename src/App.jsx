import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Product from './pages/Product';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={[<Home />, <ContactUs />]} />
          <Route path='/about' element={[<About />, <ContactUs />]} />
          <Route path='/contact' element={[<Contact />]} />
          <Route path='/products' element={[<Products />, <ContactUs />]} />
          <Route path='/product/:id' element={[<Product />, <ContactUs />]} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

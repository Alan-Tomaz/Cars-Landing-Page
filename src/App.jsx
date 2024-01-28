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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from './components/axios';

function App() {

  const notify = (type, text) => {
    if (type == 'success') {
      toast.success(text, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
    else if (type == 'error') {
      toast.error(text, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }

  }



  instance.get(`&model=m4`)
    .then(response => console.log(response.data))


  return (

    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route path='/' element={[<Home />, <ContactUs notify={notify} />]} />
          <Route path='/about' element={[<About />, <ContactUs notify={notify} />]} />
          <Route path='/contact' element={[<Contact notify={notify} />]} />
          <Route path='/products' element={[<Products />, <ContactUs notify={notify} />]} />
          <Route path='/product/:id' element={[<Product />, <ContactUs notify={notify} />]} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

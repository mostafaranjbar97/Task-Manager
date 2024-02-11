import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Providers from './redux/Provider'
import 'react-toastify/dist/ReactToastify.css';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import Header from './components/Header';
function App() {
  

  return (
    <>
      <Providers>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Signin/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </Providers>
    </>
  )
}

export default App

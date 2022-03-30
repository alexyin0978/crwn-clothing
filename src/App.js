import Homepage from "./routes/homepage/Homepage";
import AuthenticationPage from "./routes/authenticationPage/AuthenticationPage";
import Navigation from "./components/navigation/Navigation";
import {Routes, Route} from 'react-router-dom';

const Shop = () => {
  return(
    <div>
      this is shop page
    </div>
  )
}

const App = () => {

  return(
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Homepage />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<AuthenticationPage />} />
      </Route>
    </Routes>
  )
}

export default App;

import Homepage from "./routes/homepage/Homepage";
import AuthenticationPage from "./routes/authenticationPage/AuthenticationPage";
import Navigation from "./components/navigation/Navigation";
import ShopPage from "./routes/shopPage/ShopPage";

import {Routes, Route} from 'react-router-dom';


const App = () => {

  return(
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Homepage />} />
        <Route path='shop' element={<ShopPage />} />
        <Route path='auth' element={<AuthenticationPage />} />
      </Route>
    </Routes>
  )
}

export default App;

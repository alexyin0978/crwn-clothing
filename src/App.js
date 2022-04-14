import Homepage from "./routes/homepage/Homepage";
import AuthenticationPage from "./routes/authenticationPage/AuthenticationPage";
import Navigation from "./components/navigation/Navigation";
import ShopPage from "./routes/shopPage/ShopPage";
import CheckoutPage from "./routes/checkoutPage/CheckoutPage";

import {Routes, Route} from 'react-router-dom';


const App = () => {

  return(
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Homepage />} />
        {/* route/*代表任何/後面的東西都會導向ShopPage.jsx */}
        <Route path='shop/*' element={<ShopPage />} />
        <Route path='auth' element={<AuthenticationPage />} />
        <Route path='checkout' element={<CheckoutPage />} />
      </Route>
    </Routes>
  )
}

export default App;

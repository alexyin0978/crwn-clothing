import Homepage from "./routes/homepage/Homepage";
import SignInPage from "./routes/signInPage/SignInPage";
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
        <Route path='signIn' element={<SignInPage />} />
      </Route>
    </Routes>
  )
}

export default App;

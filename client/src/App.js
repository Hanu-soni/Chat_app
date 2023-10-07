import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {Toaster }from 'react-hot-toast';
import ProtectedRoute from "./components/protectedRoute";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";

function App() {

  const {loader} = useSelector(state => state.loaderReducer)
  console.log(loader);
  return (
   <div>
    
     <Toaster position="top-center" reverseOrder={false} />
     {loader && <Loader />}
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
   </div>
    


  );
}

export default App;

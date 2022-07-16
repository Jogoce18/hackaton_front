import { BrowserRouter,Routes, Route} from "react-router-dom";
import UserContext from "../contexts/UserContext.js";
import { useState } from 'react'

import "./../css/reset.css";
import "./../css/style.css"
import Login from "./Login";
import Register from "./SignUp";
import MainMenu from "./MainMenu";
import NewNote from "./NewNote";
import Example from "./Example";

export default function App() {

  const [user, setUser] = useState('');
  const [token,setToken] = useState('');

  const userContext = {
    user,
    setUser,
    token,
    setToken
  }

  return (
    
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
          <Routes>
            <Route path ='/login' element ={<Login />}/>
            <Route path='/sign-up' element={<Register />} />
            <Route path='/' element={ <MainMenu />} />
            <Route path='/newnote' element={ < NewNote/>} />            
            <Route path='/exampĺe' element={ < Example/>} />    
          </Routes>
      </UserContext.Provider>
    </BrowserRouter> 

         
        
  );

}
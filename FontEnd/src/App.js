import React  from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Login from "./components/login/Login";
import Home from "./components/ADMIN/Home";
import DirectorHome from "./components/DIRECTEUR/Home";
import MedecinHome from "./components/MEDECIN/Home";
import ReceptionistHome from "./components/RECEPTIONIST/Home";
import PharmacienHome from "./components/PHARMACIEN/Home";
import RH_Home from './components/RH/Home';


function App() {
 
  return (
    <BrowserRouter>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route  exact path="/home" component={Home}/>
            <Route  exact path="/espaceDirecteur" component={DirectorHome}/>
            <Route  exact path="/espaceMedecin" component={MedecinHome}/>
            <Route exact path="/espaceReceptionist" component={ReceptionistHome}/>
            <Route exact path="/espacePharmacien" component={PharmacienHome}/>
            <Route exact path="/espaceRH" component={RH_Home}/>

          </Switch>
        </div>
      </div>
    </div>
    </BrowserRouter>
    );
}

export default App;

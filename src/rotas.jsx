import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Cadastro from './pages/Cadastro';

function Rotas() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Cadastro} />
      </Switch>
    </Router>
  );
}

export default Rotas;

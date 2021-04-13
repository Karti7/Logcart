import React from 'react';
import './default.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Registration from './pages/Registration';

import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './pages/Login';



function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login}/>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;

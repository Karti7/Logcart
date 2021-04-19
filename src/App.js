import React, { Component } from 'react';
import './default.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Registration from './pages/Registration';

import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './pages/Login';

import { auth, handleUserProfile } from './firebase/utlis';
import Recovery from './pages/Recovery';


import { setCurrentUser } from './redux/User/user.actions';

import { connect } from 'react-redux';



class App extends Component {

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.props.setCurrentUser({
              id: snapshot.id, 
              ...snapshot.data()
            })
          })
        }
        this.props.setCurrentUser(userAuth);  
    })
  }

  componentWillUnmount() {
    this.authListner();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="App">
        <Header  />
        <div className="main">

          <Switch>

            <Route exact path="/" component={HomePage} />

            {currentUser && (
              <Redirect to="/" />
            )}
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/recovery" component={Recovery} />

          </Switch>
        </div>
        <Footer />
      </div>
    );
  }


}

const mapStateToProps = ({user})=>({
  currentUser:user.currentUser
}); 


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps) (App);

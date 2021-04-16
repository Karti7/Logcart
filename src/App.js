import React, { Component } from 'react';
import './default.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Registration from './pages/Registration';

import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './pages/Login';

import { auth, handleUserProfile } from './firebase/utlis';

const initialState = {
  currentUser: null
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListner = null;

  componentDidMount() {
    this.authListner = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);

        userRef.onSnapshot(Snapshot => {
          this.setState({
            currentUser: {
              id: Snapshot.id, ...Snapshot.data()
            }
          })
        })
      }

      this.setState({ ...initialState })
    })
  }

  componentWillUnmount() {
    this.authListner();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Header currentUser={currentUser} />
        <div className="main">

          <Switch>

            <Route exact path="/" component={HomePage} />

            {currentUser && (
              <Redirect to="/" />
            )}
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />

          </Switch>
        </div>
        <Footer />
      </div>
    );
  }


}

export default App;

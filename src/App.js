import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/home/homepage.component';
import ShopPage  from './pages/shop/shoppage.component';
import  Header  from './components/header/header.component.jsx'
import { SignInAndSignUpPage } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.util'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'

class App extends React.Component {
 

  unsubscribeFromAuth = null

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }


  render(){
    return (
      <div>
        <Header />
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route path='/signin' component={SignInAndSignUpPage}/>
          </Switch>
       
      </div>
    );
  }
}

// Dispacthes the action
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null,mapDispatchToProps)(App);

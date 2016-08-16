import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/home/homepage.component';
import ShopPage  from './pages/shop/shoppage.component';
import { Header } from './components/header/header.component.jsx'
import { SignInAndSignUpPage } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.util'
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot =>{
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          }, () =>  console.log(this.state)
          )
         
        })
        // console.log(this.state)
      }
      this.setState({currentUser:userAuth})
                                                    // createUserProfileDocument(userAuth)
                                                    // this.setState({currentUser:userAuth})
                                                    //  console.log(user)
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }


  render(){
    return (
      <>
      <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/sign-in' component={SignInAndSignUpPage}/>
        </Switch>
      </>
    );
  }
}

export default App;

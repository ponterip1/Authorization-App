import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Button, Header, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

//life cylce method, automatically invoked
  componentWillMount() {
    firebase.initializeApp({ //initializes firebase
      apiKey: 'AIzaSyDzJ2H9PANlK2hvicuqagI21oexTxLDRqc',
      authDomain: 'auth-f30d1.firebaseapp.com',
      databaseURL: 'https://auth-f30d1.firebaseio.com',
      projectId: 'auth-f30d1',
      storageBucket: 'auth-f30d1.appspot.com',
      messagingSenderId: '773063454625'
    });

    //handles when user signs in or signs out
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

 //sign out mechanics
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }


  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;

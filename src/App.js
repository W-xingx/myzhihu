import React from 'react';
import './App.css';


import Router from './router/first'

//使用rem

class App extends React.Component{
  render(){
      return (
          <div className="App">
              <Router></Router>
          </div>
      );
  }
}

export default App;

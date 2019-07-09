import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const name = 'Eugene';

    return (
      <div className='App'>
        <h1>Hello {name}</h1>
        <h2>Goodbye</h2>
      </div>
    );
  }
}

export default App;

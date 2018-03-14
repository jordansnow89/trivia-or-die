import React, { Component } from 'react';
import './App.css';
import ApiCaller from './components/apicaller/apicaller'
import HighScore from './components/highscore/highscore'
import Navbar from './components/navbar/navbar'
import Add from './components/add/add'
import axios from "axios"

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      highscore: 0,
      favorites: []
    }
      favorites: []

    this.updateScore= this.updateScore.bind(this)
    this.addFavorite= this.addFavorite.bind(this)
    this.deleteFavorite= this.deleteFavorite.bind(this)
  }

  updateScore(answer){
    if( answer === "correct"){this.setState({ highscore: this.state.highscore + 1})
    }else if (answer === "wrong"){this.setState({ highscore: 0})
    }
  }

  addFavorite ( question) {
    axios.post("./api/addFavorite", question) 
    .then( res => this.setState({ favorites: res.data}))
}
 
 deleteFavorite(i){
   axios.delete("./api/deleteFavorite", {id: i})
   .then( res => this.setState({ favorites: res.data}))
 }

  render() {
    return (
      <div className="body">
        <div className="head">
          <div className="logobox">
            <img src={ require('./images/tod-logo.jpg') }/> 
          </div>
        </div>
        <ApiCaller addFavorite = {this.addFavorite} updateScore={this.updateScore}/>
        <HighScore className="highscore" highscore={this.state.highscore}/>

        {/* <Navbar className="navbar"/>  */}
        
        <Add favorites = {this.state.favorites} deleteFavorite = {this.deleteFavorite} />  
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import './styles.css'
import axios from 'axios'
import he from 'he'

export default class Add extends Component{
    constructor(props){
        super(props)

        this.state = {         
        };
    }
    render(){
        return(
            <div className="addcontainer"> {this.props.favorites.map((question, index) => <div> <p> {he.decode(question.question)} --- {question.correct_answer}</p> <button onClick={(e) => this.props.deleteFavorite(index)}> Delete Me</button></div>)} </div>
        )
    }

}
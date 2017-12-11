import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

export default class HighScore extends Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }

render() {
    return(
        <div className="scorebox">
        Highscore: {this.props.highscore}
        </div>

    )
}







}
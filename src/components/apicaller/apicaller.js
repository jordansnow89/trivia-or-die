import React, { Component } from "react";
import axios from "axios";
import he from 'he';
import "./styles.css";

export default class ApiCaller extends Component {
    constructor(props) {
        super(props)

        this.state = {
            question: "",
            correct_answer: "",
            incorrect_answers:"",
            wasWrong: false,
            wasRight: false,
            nextCheck: false,
            giphyUrl: ""

        };
    }
    
    componentDidMount() {
        axios.get("/api/getApiData").then(response => {
            this.setState({
                question: he.decode(response.data.results[0].question), 
                questionObject: response.data.results[0],
                correct_answer: response.data.results[0].correct_answer,
                incorrect_answers: response.data.results[0].incorrect_answers[0]
              })
        }); 
        axios.get("/api/getGiphy").then(res => { 
            this.setState({ giphyUrl: res.data.data.image_url})})
            .catch(err => console.log(err))
        
    }

    userCorrect() {
        this.props.updateScore("correct")
        console.log("CORRECT")
        this.setState({
             wasRight: true,
             wasWrong: false,

            })
        }

    
        
    userWrong () {
        this.props.updateScore("wrong")
        console.log("WRONG")  
        this.setState({ 
            wasWrong: true,
            wasRight: false
        })
    }

    nextQuestion() {
        axios.get("/api/getApiData").then(response => {
            this.setState ({
                questionObject: response.data.results[0],
                question: he.decode(response.data.results[0].question), 
                wasRight: false,
                wasWrong: false})
            })
        axios.get("/api/getGiphy").then(res => { 
                this.setState({ giphyUrl: res.data.data.image_url})})
                .catch(err => console.log(err))
        } 
        

    checkTrue() {
        if ( this.state.correct_answer === "True"){
         this.userCorrect()
         } else if (this.state.correct_answer === "False"){
             this.userWrong()
        }
    }

    checkFalse() {
        if ( this.state.correct_answer === "False") { 
            this.userCorrect()
        } else if (this.state.correct_answer === "True"){
            this.userWrong()
        }
    }


    render() {
        console.log(this.state.giphyUrl)
        return(
                 <div className="container">
                   <div className="questionbox">
                       <div className="question"> {this.state.question}</div>
                    <div className="buttonbox">
                        <button  className="torfbutton1" onClick={ (e) => this.checkTrue() }> True </button>
                        <button  className="torfbutton2" onClick={ (e) => this.checkFalse() } > False </button>
                    </div>
                    <div className="responsebox">
                        {this.state.wasWrong &&  <div> <p className="responsetext">WRONG! </p><img className="wrongpic" src={ require('../../images/wrong.png') }/></div>} 
                        {this.state.wasRight &&  <div><p className="responsetext">Correct! </p> <img alt="AHHHHHHH" src={this.state.giphyUrl}/> <button  className="nextbutton" onClick={ (e) => this.nextQuestion()}>Next</button></div>}
                    </div>
                    <button className="favoritebutton" onClick={ (e) => this.props.addFavorite( this.state.questionObject )}> Add Favorite </button>
                    </div>
                 </div>
        )
    }
}
const axios = require("axios");

let favorites = []


let getApiData = (req, res) => {
        axios
        .get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=boolean")
        .then(result =>{
        res.json(result.data)});
};

let getGiphy = (req,res) => {
    axios
    .get("http://api.giphy.com/v1/gifs/random?api_key=75LaOUI3cOCnBRD480F0rKqo28Vd38GT&tag=yay")
    .then(result =>{     
        console.log(result.data)
        res.json(result.data)})
    .catch(err => console.log(err))
}

let  addQuestion = (req,res) => {
    favorites.push(req.body)
    res.status(200).json(favorites)


}

 let deleteQuestion = (req,res) => {
     favorites.splice(req.body.id,1)
     res.status(200).json(favorites)
 }

module.exports = {
    getApiData,
    getGiphy,
    addQuestion,
    deleteQuestion
};


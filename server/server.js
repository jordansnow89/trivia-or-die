const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");

const app = express();

app.use(cors());
app.use(json());

const port = 3001;

const controller = require("./controllers/control.js");

app.get("/api/getApiData", controller.getApiData);
app.get("/api/getGiphy", controller.getGiphy )
app.post("/api/addFavorite", controller.addQuestion)
app.delete("/api/deleteFavorite", controller.deleteQuestion)

app.listen(port, () => {
    console.log(  `Listening on port ${port}  `);
});
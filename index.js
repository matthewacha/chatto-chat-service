require('dotenv').config();
const express = require('express'),
bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Welcome to Chatto!");
  });


// throw errors from the application
app.use((error, req, res) => {
    console.log(error)
})

// run application to listen from a port

const port = process.env.PORT || 7070;
app.listen(port, () => {
    console.log(`The application is running on port ${port}`)
})
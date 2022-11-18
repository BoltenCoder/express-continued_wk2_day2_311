const express = require("express");
const bodyParser = require("body-parser");
const {uuid} = require('uuid')
const app = express(); //Enables the Express framework to help create a serve on our computer and allows for the code used in this file.
const port = process.env.PORT || 4001; //Tells what port the serve will run on.

const {comments} = require('./data/comments') //Redefines "comments" as a new array pulled from the 'comments' file under the 'data' foder.
const {contacts} = require('./data/contacts')
const {products} = require('./data/products')
const {vehicles} = require('./data/vehicles')

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/comments', (req, res) => { //Grabs all comments and returns them to the user through the server. Communicating when and from what to grab data. (The comments folder in this repo in this case)
    res.json(comments) //Declares the informasion the server responds with as a .json.
    res.send(comments) //Sends back the data the server responds with to the user.
})

app.get('/comments/:_id', (req, res)=> { //Grabs a specific comment by its id.
    const found = comments.some(comments=> comments._id === parseInt(req.params._id));
    if(found) {
      res.json(comments.filter(comments => comments._id === parseInt(req.params._id)));
    }
    else{
      res.status(400).json({ msg: `No member with the id of ${req.params._id} found`})
    }
})

app.post('/comments', (req, res)=> {
    const newComment ={
        _id: uuid.v4(),
        body: req.body.body,
        postId: req.body.postId
    }
    if(!newComment.body || !newComment.postId) {
        res.status(400).json({msg: 'Please include a body and postId'});
      }
    comments.push(newComment);
    res.json(comments);
})

app.get('/contracts', (req, res) => {
    res.json(contacts)
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/vehicles', (req, res) => {
    res.json(vehicles)
})

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});

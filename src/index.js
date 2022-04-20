const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://lddu818:27o3D6VwW2z1zHMj@cluster0.6gomf.mongodb.net/pk-middlwaredb?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// app.use(function(req, res, next) {
//     console.log('This is a global middleware')
//     //Adding a property in request object
//     req['current-day'] = 'Wednesday'
//     next()
// })

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

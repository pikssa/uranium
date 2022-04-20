const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://lddu818:27o3D6VwW2z1zHMj@cluster0.6gomf.mongodb.net/kpp?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// app.use (
//     function (req, res, next) {
// //         console.log ("inside GLOBAL MW");
// //         next();
// //   }
// //   );
  app.use(
    function(req,res,next){
        let ar1=new Date().toLocaleString();
        let ar2=req.ip
        console.log(ar1,ar2,"/create")
        next()
    }
)


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

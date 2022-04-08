const express = require('express');
const logger = require('./logger')

const router = express.Router();
//1
router.get('/movies', function(req, res) {
   let array = ["Matrix", "the shining", "lord of the rings", "bartman begins"]
    res.send(array)
     

})
//2 or 3

router.get('/movies/:IndexNumber', function(req, res) {
    
    req.params.IndexNumber
       let array = ["Matrix", "the shining", "lord of the rings", "bartman begins"]
       //  console.log(array[IndexNumber])
       if(req.params.IndexNumber<array.length){
           for(var i=0; i<req.params.IndexNumber;i++){
            }res.send(array[i]);
            console.log(array[i])
       }
        else{
            res.send("not valid")
        }
       
      
   })
   

// router.get('/movies/:indexNumber', function (req, res)
//  {
//     let array = ["Matrix", "the shining", "lord of the rings", "bartman begins"] 
//     if(req.params.indexNumber > 10)
//     {
//       for(var i=0;i<req.params.indexNumber;i++){
          
//        } res.send(array[i])
//     console.log(array[i])
//     }
//     else
//     {
//         res.send("no valid")
//      }
// });
// router.get('/movies/:indexNumber', function(req, res) {
//     let array = ["Matrix", "the shining", "lord of the rings", "bartman begins"]
//    let a = req.params.indexNumber
//    let i
//   res.send((a <= array.length && a > 0)?array[i-1]:
//   `${`Invalid request: Enter a number between 1 to` + array.length}`)

// })

//4

router.get('/films',function(req,res) {
    const a = [ {
        'id': 1,
        'name': 'The Shining'
       }, {
        'id': 2,
        'name': 'Incendies'
       }, {
        'id': 3,
        'name': 'Rang de Basanti'
       }, {
        'id': 4,
        'name': 'Finding Nemo'
       }]

       res.send(a)
     })







//5

router.get('/films/:filmId', function(req, res) {
    
    req.params.IndexNumber
    //    let array = ["Matrix", "the shining", "lord of the rings", "bartman begins"]
       //  console.log(array[IndexNumber])
       const array = [ {
                'id': 1,
                'name': 'The Shining'
               }, {
                'id': 2,
                'name': 'Incendies'
               }, {
                'id': 3,
                'name': 'Rang de Basanti'
               }, {
                'id': 4,
                'name': 'Finding Nemo'
               }]
       if(req.params.filmId<array.length){
           for(var i=0; i<req.params.filmId;i++){
            }res.send(array[i]);
            console.log(array[i])
       }
        else{
            res.send("not valid")
        }
       
      
   })




module.exports = router;
// adding this comment for no reason
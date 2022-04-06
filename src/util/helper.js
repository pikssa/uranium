// let log = function(){
//     console.log('Welcome to my application. I am puru and a part of FunctionUp uranium cohort.')
// }
// module.exports.logging = log
const printDate = () => {
    const date = new Date();
    console.log(date.toDateString())
}

const printMonth = () => {
    const date = new Date();
    console.log(`Current Month ${date.getMonth() +1}  `)
}
const a = function getBatchinfo(){
    console.log("Uranium, W2D3, the topic for today is nodejs module system")
}

module.exports ={printDate,printMonth,a}
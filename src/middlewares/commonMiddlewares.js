
const mid1 = function (req, res, next) {
   

    let value = req.headers.isfreeappuser
    if (value !== undefined) {
        next()
    }
    else { res.send("header is not persent") }
}


module.exports.mid1 = mid1

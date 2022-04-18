const batchModel = require("../models/batchmodel")
const developerModel = require("../models/developermodel")

const createDeveloper = async function (req, res) {
    let techi = req.body
    let devloperCreated = await developerModel.create(techi)
    res.send({ data: devloperCreated })
}
//3..............................
const getDeveloperData = async function (req, res) {
    let developers = await developerModel.find({ gender: "female", percentage: { $gte: 70 } })
    res.send({ data: developers })
}
//4................
const getDeveloperWithBatchDetails = async function (req, res) {
    let batch = req.query.program

    let batchCreated = await batchModel.findOne({ name: batch }).select({ _id: 1 })

    let devlop = req.query.percentage

    let developersData = await developerModel.find({ batch_id: batchCreated, percentage: { $gte: devlop } })
    res.send({ data: developersData })
}




module.exports.createDeveloper = createDeveloper
module.exports.getDeveloperData = getDeveloperData
module.exports.getDeveloperWithBatchDetails = getDeveloperWithBatchDetails

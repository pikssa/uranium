const req = require("express/lib/request")
const productModel = require("../models/productModel")

const productData = async function (req, res) {
    let data = req.body
    let productDetail = await productModel.create(data)
    res.send({ Data: productDetail })
}

module.exports.productData = productData


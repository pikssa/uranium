const req = require("express/lib/request")
const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')
const productModel = require('../models/productModel')


const OrderDetail = async function (req, res) {
    let data = req.body
    let isFreeAppUser = req.headers.isfreeappuser
    console.log(isFreeAppUser)
    let check = await productModel.findOne({ _id: data.productId }).select({ _id: 1 })
    console.log(check)
    let check1 = await userModel.findOne({ _id: data.userId }).select({ _id: 1 })
    let check2 = await productModel.findOne({ _id: data.productId }).select({ price: 1, _id: 0 })
    let check3 = await userModel.findOne({ _id: data.userId }).select({ balance: 1, _id: 0 })
    console.log(check2, check3)
    let deductedBalance = check3.balance - check2.price
    console.log(deductedBalance)

    if (data.userId && data.productId) {
        let orderr = await orderModel.create(data)
        console.log(orderr)
        if (check === null && check1 === null) {
            res.send("data invalid")
        }
       else if (req.headers.isfreeappuser == false) {
            if (check3 > check2) {
                let updatebalance = await productModel.findOneAndUpdate({ _id: data.productId, balance: { $set: deductedBalance } })
                let updated = await orderModel.findOneAndUpdate({ check: productId, $set: { amount: check2, isFreeAppUser: false } })
                res.send({ order: updated })}
            else {

                res.send("insufficient balance")
            }}
        else {
            let orderr = await orderModel.create(data)
         let updateOrder = await orderModel.updateMany({productId: check},{$set: { amount: 0, isFreeAppUser: true } })
            res.send({ order: updateOrder })
        }



    }
    else { res.send("invalid detail") }
    // res.send({msg:check})
}



module.exports.OrderDetail = OrderDetail






















// const createOrder = async function (req, res) {
    //     let data = req.body
    //     let userId = req.body.userId
    //     let productId = req.body.productId
    //     let header = req.headers["isfreeappuser"]
    //     let price = await productModel.find({ productId })
    //     let userValidation = await userModel.exists({ userId })
    //     let productValidation = await productModel.exists({ productId })
    //     if (userValidation) {
    //         if (productValidation) {
    //             let purchase = await orderModel.create(data)
    //             if (header == true) {
    //                 await userModel.find({ _id: userId }).update({ balance: `${balance}-${price}` }, { new: true })
    //             }
    //             res.send({ success: purchase })
    //         } else {
    //             res.send({ err: "the product is not present" })
    //         }
    //     } else {
    //         res.send({ alert: "you are not a registered user, please register" })
    //     }
    // }
    
    // module.exports.createOrder = createOrder
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const orderSchema = new mongoose.Schema({
    // Write the schema content
    userId:ObjectId,
	productId: ObjectId,
	amount:Number,
	isFreeAppUser:Boolean, 
	
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema) //users
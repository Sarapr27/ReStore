const {Schema, model} = require("mongoose")

const paymentSchema = new Schema({
	paymentId: String,
	externalReference: String,
	status: String,
	dateCreated: Date,
	dateApproved: Date,
	dateLastUpdated: Date,
	transactionAmount: Number,
});

module.exports = model("Payment", paymentSchema);
require("dotenv").config();
const mercadopago = require("mercadopago");
const Payment = require("../Database/Models/payment");
const { ACCESS_TOKEN } = process.env;


const createPayment = async (req, res) => {
	mercadopago.configure({
		access_token: ACCESS_TOKEN
	});

	const { products, precio } = req.body;
	const items = products.map((product) => ({
		title: product.name,
		currency_id: product.currency_id,
		unit_price: precio,
		quantity: product.quantity,
	}));

	const result = await mercadopago.preferences.create({
		items: items,
		back_urls: {
			success: "http://localhost:7000/home",
			failure: "http://localhost:7000/cart",
			pending: "http://localhost:3001/pending",
		},
		notification_url: "https://b65c-181-66-151-4.sa.ngrok.io/webhook",
	});
	console.log(result);
	const payment = new Payment({
		paymentId: result.body.id,
		// externalReference: result.body.external_reference,
		status: "pending",
		dateCreated: result.body.date_created,
		dateApproved: result.body.date_approved,
		// dateLastUpdated: result.body.last_updated,
		transactionAmount: result.body.transaction_amount,
	});
	const newData = await payment.save();
	res.status(200).json(newData);
};

//  recive el evento de pago
const reciveWebhook = async (req, res) => {
	try {
		const { action, data } = req.body;

		if (action === "payment.created") {
			const paymentId = data.id;

			// Consultar el estado del pago en Mercado Pago
			const payment = await mercadopago.payment.findById(paymentId);
			console.log(payment, "payment.... ");
			// Actualizar el estado del pago en la base de datos según corresponda
			await Payment.findOneAndUpdate(
				{ paymentId: paymentId },
				{ status: payment.status },
				{ new: true }
			);

			// console.log("Pago actualizado:", paymentId, payment.status);
		}
		// Enviar una respuesta exitosa al webhook de Mercado Pago
		res.sendStatus(200);
	} catch (error) {
		console.error("Error en el controlador reciveWebhook:", error);
		res.sendStatus(500);
	}
};
module.exports = {
	createPayment,
	reciveWebhook,
};

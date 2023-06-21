const mercadopago = require("mercadopago");
const Payment = require("../Database/Models/payment");
const createPayment = async (req, res) => {
	// seria un usuario de prueba
	mercadopago.configure({
		access_token:
			"TEST-720103210760998-062018-26bb891f51d99b0b8cd420627bbe27f2-1404207396",
	});

	//    const dato = await mercadopago.preferences.findById(req.body.id)
	//
	const { products, currency_id } = req.body;

	// console.log(products);

	const items = products.map((product) => ({
		title: product.name,
		unit_price: product.precio,
		currency_id: currency_id,
		quantity: product.quantity,
	}));

	const result = await mercadopago.preferences.create({
		items: items,
		back_urls: {
			success: "http://localhost:7000/home",
			failure: "http://localhost:7000/home",
			pending: "http://localhost:3001/pending",
		},
		// terminate pago
		notification_url: "https://deb2-181-66-150-3.sa.ngrok.io/webhook",
	});
// console.log(result);
// 	// Guardar informacion del pago en la base de datos
// 	const payment = new Payment({
// 		paymentId: result.body.id,
// 		externalReference: result.body.external_reference,
// 		status: result.body.status,
// 		dateCreated: result.body.date_created,
// 		dateApproved: result.body.date_approved,
// 		dateLastUpdated: result.body.last_updated,
// 		transactionAmount: result.body.transaction_amount,
// 	});

// 	const newData = await payment.save();

	// console.log(result);

	res.status(200).json(result);
};

//  recive el evento de pago
const reciveWebhook = async (req, res) => {
	const payment = req.query;

	try {
		if (payment.type === "payment") {
			const data = await mercadopago.payment.findById(payment["data.id"]);
			console.log(data, "pagadoooooooooooooooooo");

			// Guardar información del pago en la base de datos
			// const payment = new Payment({
			// 	paymentId: data.body.id,
			// 	externalReference: data.body.external_reference,
			// 	status: data.body.status,
			// 	dateCreated: data.body.date_created,
			// 	dateApproved: data.body.date_approved,
			// 	dateLastUpdated: data.body.last_updated,
			// 	transactionAmount: data.body.transaction_amount,
			// });
			// await payment.save();
		}

		return res.status(200).json({ message: "ok" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
module.exports = {
	createPayment,
	reciveWebhook,
};

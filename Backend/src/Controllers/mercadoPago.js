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
	const payment = new Payment({
		paymentId: result.body.id,
		externalReference: result.body.external_reference,
		status: result.body.status,
		dateCreated: result.body.date_created,
		dateApproved: result.body.date_approved,
		dateLastUpdated: result.body.last_updated,
		transactionAmount: result.body.transaction_amount,
		// transactionAmount: calculateTotalAmount(products),
	});

	const newData = await payment.save();

	// console.log(result);

	res.status(200).json(newData);
};

// const calculateTotalAmount = (products) => {
// 	let total = 0;
// 	for (const product of products) {
// 		total += product.price * product.quantity;
// 	}
// 	return total;
// };

//  recive el evento de pago
const reciveWebhook = async (req, res) => {
	try {
		const paymentId = req.body.data.id;
		const paymentStatus = req.body.type;

		// Actualizar el estado del pago en la base de datos según el webhook recibido
		const payment = await Payment.findOneAndUpdate(
			{ paymentId: paymentId },
			{ status: paymentStatus },
			{ new: true }
		);

		if (!payment) {
			return res.status(404).json({ error: "Payment not found" });
		}

		return res.status(200).send();
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
module.exports = {
	createPayment,
	reciveWebhook,
};

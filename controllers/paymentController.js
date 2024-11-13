// const axios = require('axios');
// const { Cart } = require('../models');

// // Process payment with Khalti
// exports.processPayment = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     // Calculate total from cart items
//     const cartItems = await Cart.findAll({ where: { user_id: userId, status: 'Pending' } });
//     const totalAmount = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0) * 100; // In paisa for Khalti

//     // Initiate payment with Khalti
//     const { token } = req.body;
//     const config = {
//       headers: {
//         'Authorization': Key ${process.env.KHALTI_SECRET_KEY},
//       },
//     };

//     const response = await axios.post('https://khalti.com/api/v2/payment/verify/', { token, amount: totalAmount }, config);

//     if (response.data.state.name === 'Completed') {
//       // Mark cart items as paid
//       await Cart.update({ status: 'Paid' }, { where: { user_id: userId, status: 'Pending' } });
//       res.status(200).json({ message: 'Payment successful' });
//     } else {
//       res.status(400).json({ message: 'Payment not completed' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Payment verification failed', error: error.message });
//   }
// };
// controllers/paymentController.js
const Payment = require('../models/payment');

exports.completePayment = async (req, res) => {
  try {
    const paymentId = req.params.payment_id;
    
    // Find the payment and update its status to "Complete"
    const payment = await Payment.findById(paymentId);
    if (!payment || payment.status !== 'Pending') {
      return res.status(400).json({ error: 'Invalid or already completed payment' });
    }

    payment.status = 'Complete';
    payment.updated_at = Date.now();
    await payment.save();

    res.status(200).json({ message: 'Payment completed successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
//
// const { Cart, Cycle } = require('../models');

// // Add cycle to cart
// exports.addToCart = async (req, res) => {
//   const { cycleId, rentalDuration } = req.body;
//   const userId = req.user.id;

//   try {
//     // Find the cycle and calculate the price based on duration
//     const cycle = await Cycle.findByPk(cycleId);
//     if (!cycle || cycle.status !== 'Available') {
//       return res.status(404).json({ message: 'Cycle not available' });
//     }

//     const price = cycle.price_per_hour * rentalDuration;

//     // Add to cart
//     const cartItem = await Cart.create({ user_id: userId, cycle_id: cycleId, rental_duration: rentalDuration, price });
//     res.status(201).json(cartItem);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // View items in cart
// exports.viewCart = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     // Get cart items and calculate the total
//     const cartItems = await Cart.findAll({ where: { user_id: userId, status: 'Pending' }, include: Cycle });
//     const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

//     res.json({ cartItems, total });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Remove item from cart
// exports.removeFromCart = async (req, res) => {
//   const { cartId } = req.params;

//   try {
//     const cartItem = await Cart.findByPk(cartId);
//     if (!cartItem) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     await cartItem.destroy();
//     res.json({ message: 'Item removed from cart' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// controllers/cartController.js
// controllers/cartController.js
const Cart = require('../models/Cart');
const Cycle = require('../models/Cycle');

// Add a cycle to the cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the token
    const { cycleId, quantity } = req.body;

    // Check if the cycle exists
    const cycle = await Cycle.findById(cycleId);
    if (!cycle) {
      return res.status(404).json({ error: 'Cycle not found' });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if the cycle is already in the cart
      const existingItem = cart.items.find(item => item.cycleId.equals(cycleId));
      if (existingItem) {
        // If it exists, update the quantity
        existingItem.quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({ cycleId, quantity });
      }
    } else {
      // If no cart exists, create a new one
      cart = new Cart({
        userId,
        items: [{ cycleId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// View cart items
exports.viewCart = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the token
    const cart = await Cart.findOne({ userId }).populate('items.cycleId');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the token
    const { cycleId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => !item.cycleId.equals(cycleId));
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

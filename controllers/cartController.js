const { Cart, Cycle } = require('../models');

// Add cycle to cart
exports.addToCart = async (req, res) => {
  const { cycleId, rentalDuration } = req.body;
  const userId = req.user.id;

  try {
    // Find the cycle and calculate the price based on duration
    const cycle = await Cycle.findByPk(cycleId);
    if (!cycle || cycle.status !== 'Available') {
      return res.status(404).json({ message: 'Cycle not available' });
    }

    const price = cycle.price_per_hour * rentalDuration;

    // Add to cart
    const cartItem = await Cart.create({ user_id: userId, cycle_id: cycleId, rental_duration: rentalDuration, price });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View items in cart
exports.viewCart = async (req, res) => {
  const userId = req.user.id;

  try {
    // Get cart items and calculate the total
    const cartItems = await Cart.findAll({ where: { user_id: userId, status: 'Pending' }, include: Cycle });
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

    res.json({ cartItems, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    const cartItem = await Cart.findByPk(cartId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

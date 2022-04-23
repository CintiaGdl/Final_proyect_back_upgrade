const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        products: { type: Array, required: true, trim: true },
        state: { type: String, required: true, trim: true, default: 'Pending'},
        user: [{ type: mongoose.Schema.Types.ObjectId, ref:'users', required: true }],
        date: { type: Date, required: true, trim: true }
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
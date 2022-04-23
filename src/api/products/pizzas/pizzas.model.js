const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true},
        varients: { type: Array, required: true, trim: true},
        price: { type: Object, required: true, trim: true},
        img: { type: String, required: true, trim: true},
        description: { type: String, required: false, trim: true},
        ingredients: { type: Array, required: true, trim: true},
        category: { type: String, required: true, trim: true},
    },
    {
        timestamps: true,
    }
)

const Pizza = mongoose.model('pizza', pizzaSchema);

module.exports = Pizza;
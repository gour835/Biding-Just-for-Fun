import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {timestamps: true});

const ProductsModel = mongoose.model.products || mongoose.model('products', ProductsSchema);

export default ProductsModel;
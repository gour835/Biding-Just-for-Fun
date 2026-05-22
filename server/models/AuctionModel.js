import mongoose from "mongoose";

const AuctionSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    startingAt: {
        type: Date,
        default: Date.now,
    },
    endingAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

AuctionSchema.index({productId: 1});
const AuctionModel = mongoose.models.auctions || mongoose.model('auctions', AuctionSchema);

export default AuctionModel;
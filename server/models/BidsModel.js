import mongoose from "mongoose";

const bidsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    auctionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auctions',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const BidsModel = mongoose.model.bids || mongoose.model('bids', bidsSchema);

export default BidsModel;
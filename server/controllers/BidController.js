import AuctionModel from "../models/AuctionModel.js";
import BidsModel from "../models/BidsModel.js";
import ProductsModel from "../models/ProductsModel.js";
import UserModel from "../models/UserModel.js";


export async function Auctions(req, res) {
  try {
    const auctions = await AuctionModel.find({}).populate('productId', 'title');
    return res.status(200).json({auctions});
  } catch (error) {
    return res.status(500).json({message: "Server Error", error: error.message});
  }
}
export async function AddAuction(req, res) {
  try {
    const { productId, amount, startingAt, endingAt } = req.body;
  
    const userId = req.user.id;
  
    const product = ProductsModel.find({ productId });
    if (!product) {
      return res
        .status(401)
        .json({ success: false, message: "Product Not Found!" });
    }
    const bid = new AuctionModel({
      userId,
      productId,
      amount,
      startingAt,
      endingAt,
    });
    await bid.save();
  
    return res.status(200).json({ success: true, message: "Auctions Created" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function AddBid(req, res) {
  try {
    const { amount, auctionId } = req.body;
    if (!amount || !auctionId) {
      return res
        .status(400)
        .json({ success: false, message: "Amount and Auction is required" });
    }
    const userId = req.user.id;
  
    //checking if Amount is greater then the basePrice
    const auction = await AuctionModel.findById( auctionId );
    if (!auction) {
      return res
        .status(404)
        .json({ success: false, message: "Auction Record Not Found!" });
    } else if (auction.amount > amount) {
      return res.status(402).json({
        success: false,
        message: "Auction Ammount is Greater then Your Requested Ammount!",
      });
    } else if (Date.now() > auction.endingAt) {
      return res
        .status(400)
        .json({ success: false, message: "Auction is already completed!" });
    } else if (Date.now() < auction.startingAt) {
      return res
        .status(400)
        .json({ success: false, message: "Auction has not started yet!" });
    }
  
    const bid = new BidsModel({
      userId,
      auctionId,
      amount
    });
  
    bid.save();
    return res.status(200).json({success: true, message: "Bid Saved Successfully"})
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

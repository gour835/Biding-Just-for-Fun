import AuctionModel from "../models/AuctionModel.js";
import ProductsModel from "../models/ProductsModel.js";
import UserModel from "../models/UserModel.js";

export async function Products(req, res) {
  try {
    const products = await ProductsModel.find({}).populate("userId", "name");
    const Auctions = await AuctionModel.find({}, "productId _id").lean();

    const ProductAuctionMap = new Map();

    Auctions.forEach((Auction) => {
      if (Auction.productId) {
        ProductAuctionMap.set(
          Auction.productId.toString(),
          Auction._id.toString(),
        );
      }
    });


    const ProductsWithAuction = products.map((product) => {
      const ProductObj = product.toObject();
      const ProductId = ProductObj._id.toString();
      const hasAuction = ProductAuctionMap.has(ProductId);
      ProductObj.hasAuction = hasAuction;
      ProductObj.auctionId = !hasAuction
        ? null
        : ProductAuctionMap.get(ProductId);
      
      return ProductObj;
    });

    return res.status(200).json({ products: ProductsWithAuction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
export async function AddProducts(req, res) {
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = UserModel.find({ userId });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User Not Found !" });
    }
    const { title, description, basePrice } = req.body;
    const product = new ProductsModel({
      userId,
      title,
      description,
      basePrice,
    });
    await product.save();

    return res
      .status(200)
      .json({ success: true, message: "Product added Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

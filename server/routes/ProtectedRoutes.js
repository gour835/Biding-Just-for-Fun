import express from "express";
import { authenticateToken, FindUser } from "../middlewares/ProtectedMiddleware.js";
import UserModel from "../models/UserModel.js";
import ProductsModel from "../models/ProductsModel.js";
import { AddProducts, Products } from "../controllers/ProductsController.js";
import { AddBid, AddAuction, Auctions } from "../controllers/BidController.js";

const ProtectedRouter = express.Router();

ProtectedRouter.get("/check", authenticateToken, function (req, res, next) {
  return res.send("token exists route");
});

ProtectedRouter.get("/products", authenticateToken, FindUser, Products);
ProtectedRouter.post("/add-product", authenticateToken, FindUser, AddProducts);

ProtectedRouter.get('/auctions', authenticateToken, FindUser, Auctions);
ProtectedRouter.post("/add-auction", authenticateToken, FindUser, AddAuction);
ProtectedRouter.post("/add-bid", authenticateToken, FindUser, AddBid);

export default ProtectedRouter;

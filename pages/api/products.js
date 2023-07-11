import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";

export default async function handle(req, res) {
//   console.log(req)
//   res.json(req.url);
    const { method } = req;
    await mongooseConnect();
    if (method === "GET") {
        if (req.query?.productId) {
            res.json(await Product.findOne({_id:req.query.productId}));
        }
        else {
            res.json(await Product.find());
        }
        
    }
    if (method === "POST") {
        const {title, stock, price} = req.body;
        const productDoc = await Product.create({
            title, stock, price,
        })
        res.json(productDoc);
    }
    if (method === "PUT") {
        const {title, stock, price, _id} = req.body;
        const productDoc = await Product.updateOne(
            {_id:_id}, {title:title, stock:stock, price:price}
        );
        res.json(productDoc);
    }
    if (method === "DELETE") {
        if (req.query?.productId) {
            await Product.deleteOne({_id:req.query.productId});
            res.json(true);
        }
    }
}
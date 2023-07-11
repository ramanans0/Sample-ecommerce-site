import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";

export default async function handler(req, res) {
//   console.log(req)
//   res.json(req.url);
    const { method } = req;
    await mongooseConnect();

    if (method === "PUT") {
        const {
            company,
            tracking,
            selectedStatus, _id} = req.body;
        const productDoc = await Product.updateOne(
            {_id:_id}, {company, tracking, status:selectedStatus}
        );
        res.json(productDoc);
    }
}
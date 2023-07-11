import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm ({_id, title:hasTitle, stock:hasStock, price:hasPrice}) {
    const titleVal = hasTitle || '';
    const [title, setTitle] = useState(titleVal);
    const stockVal = hasStock || '';
    const [stock, setStock] = useState(stockVal);
    const priceVal = hasPrice || '';
    const [price, setPrice] = useState(priceVal);
    const [productReturn, setProductReturn] = useState(false);
    const router = useRouter();

    async function createProduct(eventHandle) {
        eventHandle.preventDefault();
        const dataPackage = {title, stock, price};
        if (_id) {
            // update id
            await axios.put('/api/products', {...dataPackage, _id});
        }
        else {
            // create new product item
            await axios.post('/api/products', dataPackage);
        }
        setProductReturn(true);
    
    }
    if (productReturn) {
        returnToProduct();
    }

    function returnToProduct() {
        router.push('/products');
    }

    return (
        <form onSubmit={createProduct}>
            <label>Product name</label>
            <input type="text" 
                placeholder="Ex. IPhone, TV, etc."
                value={title} 
                onChange={nVal => setTitle(nVal.target.value)}
            />
            <label>Stock</label>
            <input type="number" 
                placeholder="Number of items..." 
                value={stock} 
                onChange={sVal => setStock(sVal.target.value)}
            />
            <label>Price (USD)</label>
            <input type="number" 
                placeholder="$"
                value={price}
                onChange={pVal => setPrice(pVal.target.value)} 
            />
            <div className="flex gap-2">
                <button type="submit" className="btn-save">Save</button>
            </div>
        </form>
    );
}
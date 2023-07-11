import { useRouter } from "next/router";
import PageLayout from "../../../components/PageLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../../components/ProductForm";

export default function EditProductPage() {
    const router = useRouter();
    
    const [productInfo, setProductInfo] = useState(null);
    const {productId} = router.query;
    
    function returnToProducts() {
        router.push('/products');
    }

    useEffect(() => {
        if (!productId) {
            return;
        }
        axios.get('/api/products?productId='+productId).then(response => {
            setProductInfo(response.data);
        });
    }, [productId]);

    return (
        <PageLayout>
            <h1>Edit product details</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
            <button className="btn-action" onClick={returnToProducts}>Cancel</button>
        </PageLayout>
    )
}
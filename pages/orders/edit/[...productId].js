import { useRouter } from "next/router";
import PageLayout from "../../../components/PageLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderForm from "../../../components/OrderForm";

export default function EditOrderPage() {
    const router = useRouter();
    
    const [productInfo, setProductInfo] = useState(null);
    const {productId} = router.query;

    function returnToOrders() {
        router.push('/orders');
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
            <h1>For order number #{productId}</h1>
            {productInfo && (
                <OrderForm {...productInfo} />
            )}
            <button className="btn-action" onClick={returnToOrders}>Cancel</button>
        </PageLayout>
    )
}
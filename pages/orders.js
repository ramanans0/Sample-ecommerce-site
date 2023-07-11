import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import Link from "next/link";
import axios from "axios";

export default function Orders() {
    const [orderList, setOrderList] = useState([]);
    
    useEffect(() => {
        axios.get('/api/products').then(response => {
            setOrderList(response.data);
        });
    }, []);

    return (
        <PageLayout>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td className="bg-blue-300">Product Name</td>
                        <td className="bg-blue-300">Current Status</td>
                        <td className="bg-blue-300">Order Number</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map(order =>
                            <tr key={order._id}>
                                <td>{order.title}</td>
                                <td>{order.status || "Ordered"}</td>
                                <td>{order.tracking || "-"}</td>
                                <td>
                                    <Link href={'/orders/edit/'+order._id} className="bg-blue-800">
                                        Update Status and Tracking Information
                                    </Link>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </PageLayout>
    );
}
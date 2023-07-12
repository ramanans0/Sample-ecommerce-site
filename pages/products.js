import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import Link from "next/link";
import axios from "axios";


import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useRouter } from "next/router";

export default function Products() {
    const [productCatalog, setProductCatalog] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProductCatalog(response.data);
        });
    }, []);

    async function deleteProduct(productId) {
        await axios.delete('/api/products?productId='+productId)
        location.reload()
    }

    // ENDS HERE
    return (
        <PageLayout>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td className="bg-blue-300">Product Name</td>
                        <td className="bg-blue-300">Stock of Product</td>
                        <td className="bg-blue-300">Price per Unit</td>
                        <td><Link className="bg-gray-900 rounded-md text-white py-1 px-2" href={'/products/new'}>Add new product</Link></td>
                    </tr>
                </thead>
                <tbody>
                    {productCatalog.map(product =>
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>{product.stock || "-"}</td>
                                <td>{product.price || "-"}</td>
                                <td>
                                    <Link href={'/products/edit/'+product._id} className="bg-blue-800">
                                        Edit
                                    </Link>
                                    
                                    <Popup trigger=
                                        {<button className="btn-action"> Delete </button>}
                                        modal nested>
                                        {
                                            close => (
                                                <div className='modal'>
                                                    <div className='content'>
                                                        Do you want to delete product {product.title}?
                                                    </div>
                                                    <div>
                                                    <button className="btn-action" onClick={() => {deleteProduct(product._id);close()}}>DELETE</button>
                                                    <button className="btn-null" onClick={() => close()}>NO</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Popup>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </PageLayout>
    );
}
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function OrderForm ({_id, company:hasCompany, tracking:hasTracking, status:hasStatus}) {
    const companyVal = hasCompany || '';
    const [company, setCompany] = useState(companyVal);
    const trackingVal = hasTracking || '';
    const [tracking, setTracking] = useState(trackingVal);
    const statusVal = hasStatus || '';
    // const [status, setStatus] = useState(statusVal);
    const [selectedStatus, setSelectedStatus] = useState(statusVal);

    const [productReturn, setProductReturn] = useState(false);
    const router = useRouter();

    const options = ["Ordered", "Processing", "Cancelled", "En route", "Delivered"];

    async function createProduct(eventHandle) {
        eventHandle.preventDefault();
        const dataPackage = {company, tracking, selectedStatus};
        if (_id) {
            // update id
            await axios.put('/api/orders', {...dataPackage, _id});
        }
        setProductReturn(true);
    
    }
    if (productReturn) {
        returnToOrders();
    }

    function returnToOrders() {
        router.push('/orders');
    }

    return (
        <form onSubmit={createProduct}>
            <label>Shipping Company</label>
            <input type="text" 
                placeholder="Name, serial, etc."
                value={company} 
                onChange={nVal => setCompany(nVal.target.value)}
            />
            <label>Tracking Number</label>
            <input type="number" 
                placeholder="#"
                value={tracking} 
                onChange={nVal => setTracking(nVal.target.value)}
            />
            {/* <label>Status</label>
            <input type="text" 
                placeholder=""
                value={status} 
                onChange={nVal => setStatus(nVal.target.value)}
            /> */}
            <label>Select Status: </label>
            <select
                className={"border-black m-3"} 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}>
                    {options.map((value) => (
                    <option value={value} key={value}>
                        {value}
                    </option>
                    ))}
            </select>
            <br></br>
            <button type="submit" className="btn-save">Save</button>
        </form>
    );
}
'use client'

import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
    const deadLink = "flex gap-2";
    const liveLink = deadLink + " bg-blue-100 rounded-sm text-black p-1";

    const router = useRouter();
    const { pathname } = router;
    return (
        <aside className="text-gray-200 p-4">
            <Link href={'/'} className="flex gap-2 mb-8 mr-4">
                <span className="">
                    E-Commerce Admin
                </span>
            </Link>
            <nav className="flex flex-col gap-2">
                <Link href={'/'} className={pathname==="/"?liveLink:deadLink}>
                    <span className="">
                        Statement
                    </span>
                </Link>
                <Link href={'/products'} className={pathname.includes("/products")?liveLink:deadLink}>
                    Products
                </Link>
                <Link href={'/orders'} className={pathname.includes("/orders")?liveLink:deadLink}>
                    <span className="">
                        Orders
                    </span>
                </Link>
            </nav>

        </aside>
    );
}
import '../app/Style/admin.css'
import { useEffect } from "react";
import { useRouter } from "next/router";
import Order from "../app/Components/Orders/orders";
import Edit from "../app/Components/Edit/edit";
import NavbarAdmin from "../app/Components/NavbarAdmin/navbarAdmin";
import Footer from "../app/Components/Footer/footer";

export default function Admin() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        // Decode JWT payload to check expiry (no library needed for basic check)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                router.push('/login');
            }
        } catch {
            localStorage.removeItem('token');
            router.push('/login');
        }
    }, []);

    return (
        <>
            <style>
                {`body { margin: 0; }`}
            </style>

            <div>
                <NavbarAdmin />
                <div className="container">
                    <div>
                        <Edit />
                    </div>
                    <div>
                        <Order />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

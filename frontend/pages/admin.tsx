import '../app/Style/admin.css'
import { useEffect } from "react";
import { useRouter } from "next/router";
import Order from "../app/Components/Orders/orders";
import Edit from "../app/Components/Edit/edit";
import '../app/Style/admin.css';

export default function Admin() {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, []);

    return (

        // <>
        //     <style>
        //         {`
        //       body {
        //         margin: 0;
        //         padding: 0;
        //         font-family: 'Arial', sans-serif;
        //       }
        //     `}
        //    </style>
            <div className="container">
                <div>
                    <Edit />
                </div>
                <div>
                    <Order />
                </div>
            </div>
       // </>
    );
}
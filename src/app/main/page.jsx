'use client';
import Card from "@/components/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { logOut } from "@/app/store/slices/authSlice";
// import { jwtDecode } from 'jwt-decode';

export default function Home(){
    let data =[
        {
            id: 1,
            image: "/img/card1.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 2,
            image: "/img/card2.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 3,
            image: "/img/card3.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 4,
            image: "/img/card4.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 5,
            image: "/img/card5.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 6,
            image: "/img/card6.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 7,
            image: "/img/card1.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 8,
            image: "/img/card2.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 9,
            image: "/img/card3.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 10,
            image: "/img/card4.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 11,
            image: "/img/card5.jpeg",
            name: 'Каркас',
            price: 150000,
        },
        {
            id: 12,
            image: "/img/card6.jpeg",
            name: 'Каркас',
            price: 150000,
        },
    ]
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const token = typeof window !== "undefined" ? localStorage.getItem('token') : null
    //     if (token) {
    //         const decodedToken = jwtDecode(token);
    //         if (decodedToken.exp * 1000 < Date.now()) {
    //             dispatch(logOut());
    //         }
    //     }

    //     const interval = setInterval(() => {
    //         const token = typeof window !== "undefined" ? localStorage.getItem('token') : null
    //         if (token) {
    //             const decodedToken = jwtDecode(token);
    //             if (decodedToken.exp * 1000 < Date.now()) {
    //                 dispatch(logOut());
    //             }
    //         }
    //     }, 60000); // Check every 60 seconds

    //     return () => clearInterval(interval);
    // }, [dispatch]);

    return(
        <section className="container">
            <Header/>
            <main className="main">
                <section className="home">
                    <h1>Страница покупки</h1>
                    <p>Давайте спроектируем место, которое вы всегда себе представляли.</p>
                </section>
                <Card product={data}/>
                <button className="button">Еще больше</button>
            </main>
            <Footer/>
        </section>
    )
}
"use client";
import Card from "@/components/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setProductToEdit } from "@/app/store/slices/productSlice";
import { logOut } from "@/app/store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Main() {
	const products = useSelector((state) => state.product.products);
	const loading = useSelector((state) => state.product.loading);
	
	const [visibleProducts, setVisibleProducts] = useState([]);
	const [next, setNext] = useState(8);
	const dispatch = useDispatch();
	const router = useRouter();
	
	
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	useEffect(() => {
		setVisibleProducts(products.slice(0, next));
	}, [products, next]);

	useEffect(() => {
		const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
		if (token) {
			const decodedToken = jwtDecode(token);
			if (decodedToken.exp * 1000 < Date.now()) {
				dispatch(logOut());
			}
		}
		const interval = setInterval(() => {
			const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
			if (token) {
				const decodedToken = jwtDecode(token);
				if (decodedToken.exp * 1000 < Date.now()) {
					dispatch(logOut());
				}
			}
		}, 60000); // Check every 60 seconds

		return () => clearInterval(interval);
	}, [dispatch, router]);

	const loadMore = () => {
		setNext(next + 8);
	};

	const handleEditProduct = (product) => {
		dispatch(setProductToEdit(product));
		router.push('/editProduct');
	};

	if (loading) {
		return (
			<section className="container">
				<Header />
				<main className="main">
					<section className="home">
						<h1>Страница покупки</h1>
						<p>Давайте спроектируем место, которое вы всегда себе представляли.</p>
					</section>
					<p>Загрузка...</p>
				</main>
				<Footer />
			</section>
		);
	}

	return (
		<section className="container">
			<Header />
			<main className="main">
				<section className="home">
					<h1>Страница покупки</h1>
					<p>
						Давайте спроектируем место, которое вы всегда себе
						представляли.
					</p>
				</section>
				<Card product={visibleProducts} onEditProduct={handleEditProduct} />
				{visibleProducts.length < products.length && (
                    <button className="button loadMore" onClick={loadMore} disabled={loading || visibleProducts.length >= products.length}>
                        {loading ? 'Загрузка...' : 'Еще больше'}
                    </button>
                )}
			</main>
			<Footer />
		</section>
	);
}

"use client";
import Card from "@/components/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/app/store/slices/productSlice";
import { useRouter } from "next/navigation";

export default function Home() {
	const products = useSelector((state) => state.product.products);
	const [visibleProducts, setVisibleProducts] = useState([]);

	const [next, setNext] = useState(8);
	const dispatch = useDispatch();
	const router = useRouter();
	
	let feedback = [
		{
			id: 1,
			review: `Заказывала каркас для фотозоны на свадьбу своей сестры, и результат превзошел все ожидания! 
                    Конструкция получилась прочной и стильной, 
                    идеально вписалась в нашу тематику. Все гости остались в восторге от фотозоны. 
                    Огромное спасибо за качественную работу и быструю доставку!`,
			name: "Айгуль",
		},
		{
			id: 2,
			review: `Очень доволен каркасами для фотозон, которые заказал для корпоративного мероприятия. 
                    Конструкции оказались не только красивыми, но и надежными. Монтаж был простым, 
                    а внешний вид впечатлил всех участников. 
                    Обязательно буду заказывать снова и рекомендовать своим знакомым!`,
			name: "Ерлан",
		},
		{
			id: 3,
			review: `Я занимаюсь организацией мероприятий, и каркасы для фотозон от этой компании - это просто находка. 
                    Высокое качество, стильный дизайн и удобство в использовании – все это делает их идеальными для любого мероприятия. 
                    Клиенты всегда довольны результатом. Спасибо за отличный продукт и надежное сотрудничество!`,
			name: "Арман",
		},
		{
			id: 4,
			review: `Спасибо за отличный каркас для фотозоны! Заказывала на юбилей мамы, и это стало настоящим украшением нашего праздника. 
                    Каркас был выполнен с большим вниманием к деталям и выглядел просто потрясающе. 
                    Мы сделали много замечательных фото на его фоне. 
                    Благодарю за профессионализм и креативный подход!`,
			name: "Динара",
		},
	];

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	useEffect(() => {
		setVisibleProducts(products.slice(0, next));
	}, [products, next]);

	return (
		<section className="container">
			<Header />
			<main className="main">
				<section className="home"></section>
				<div className="productSection">
					<h2>Хит продаж</h2>
					<button className="button" onClick={() => router.push('/main')}>Смотреть все</button>
				</div>
				<Card product={visibleProducts} />
				<div className="feedback">
					<h2>Что говорят о нас</h2>
					<div className="feedbackCard">
                        {feedback.map((item) => 
                            <div className="feedbackCardItem" key={item.id}>
                                <p>{item.review}</p>
                                <div className="client">
                                    <div className="avatar">
                                        <img className="imgFit" src="/img/userAvatar.svg" alt="not Found" />
                                    </div>
                                    <span>{item.name}</span>
                                </div>
                            </div>
                        )}
					</div>
				</div>
			</main>
			<Footer />
		</section>
	);
}

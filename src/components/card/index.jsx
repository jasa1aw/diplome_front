'use client';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/app/store/slices/cartSlice";


export default function Card({ product, setCartItems }) {

    return (
        <section className="cardContainer">
            {product.map((item) => (
                <CardItem key={item.id} item={item} />
            ))}
        </section>
    );
}

function CardItem({item}) {
    const dispatch = useDispatch();
    const [isTemporaryAdded, setIsTemporaryAdded] = useState(false);

    const handleAddProduct = () => {
        dispatch(addProduct({ ...item, quantity: 1 }));
        setIsTemporaryAdded(true);
        setTimeout(() => {
            setIsTemporaryAdded(false);
        }, 2000); // 2 секунды
    };

    return (
        <div className="cardItem">
            <div className="cardImg">
                <img className="imgFit" src={item.image} alt="not found" />
                <button className="button buttonFill" onClick={handleAddProduct}>
                    {isTemporaryAdded ? "Добавлено" :  "Добавить в корзину"}
                </button>
            </div>
            <div className="cardDescription">
                <h4>{item.name}</h4>
                <p>{item.price} &#8376;</p>
            </div>
        </div>
    );
}

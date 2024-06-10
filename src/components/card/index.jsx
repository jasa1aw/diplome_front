'use client';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "@/app/store/slices/cartSlice";
import { END_POINT } from "@/config/end_point";

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
    const currentUser = useSelector(state => state.auth.currentUser);
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
                <img className="imgFit" src={`${END_POINT}${item.image}`} alt="not found" />
            </div>
            <div className="cardDescription">
                <h4>{item.name}</h4>
                <p>{item.price} &#8376;</p>
            </div>
            {!currentUser || currentUser && !currentUser.isAdmin &&
                <button className="button addBasket" onClick={handleAddProduct}>
                        {isTemporaryAdded ? "Добавлено" :  "Добавить в корзину"}
                </button>
            }
            
            {currentUser && currentUser.isAdmin && 
                <div className="editProduct">
                    <button className="button editBtn" >Редактировать</button>
                    <button className="button deleteBtn" onClick={() => dispatch(deleteProduct(item.id))}>Удалить</button>
                </div>
            }
        </div>
    );
}

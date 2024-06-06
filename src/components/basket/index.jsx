'use client';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, updateProductQuantity, clearCart } from "@/app/store/slices/cartSlice";
import { useRouter } from "next/navigation";

function CartPage() {
    const [step, setStep] = useState(1);
    const cartItems = useSelector((state) => state.cart.selectedProducts);
    const dispatch = useDispatch();
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [contactDetails, setContactDetails] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        address: ''
    });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            // Симулируем задержку для имитации процесса загрузки
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(totalPrice);
    }, [cartItems]);

    const handleQuantityChange = (id, quantity) => {
        dispatch(updateProductQuantity({ id, quantity }));
    };

    const handleSubmit = () => {
        const message = `
            Имя: ${contactDetails.firstName}
            Фамилия: ${contactDetails.lastName}
            Телефон: ${contactDetails.phone}
            Город: ${contactDetails.city}
            Адрес: ${contactDetails.address}
            Заказанные товары:
            ${cartItems.map(item => `${item.name} - ${item.quantity}`).join('\n')}
        `;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=77786200395&text=${encodedMessage}`;

        // window.open(whatsappUrl, '_blank');
        // alert('Сообщение отправлено');
        // dispatch(clearCart());
        // setStep(1)
        // router.push('/main')
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            alert('Сообщение отправлено');
            dispatch(clearCart());
            setStep(1);
            // router.push('/main'); // Uncomment if needed
        }, 100);
    };
    const emptyBasket = () => {
        router.push("/main")
    }

    if (loading) {
        return (
            <section className="cartContainer">
                <h2>Корзина</h2>
                <p className="emptyCart">Загрузка...</p>
            </section>
        );
    }
    return(
        <main className="container">
            <Header/>
            {step === 1 && 
                <section className="cartContainer">
                    <h1>Корзина</h1>
                    {cartItems.length === 0 ? (
                        <p className="emptyCart">Ваша корзина пуста</p>
                    ) : 
                        <div className="cartHeader">
                            <h3>Товар</h3>
                            <div className="titles">
                                <h3>Количество</h3>
                                <h3>Цена</h3>
                            </div>
                        </div>
                    }
                    <div className="cartProduct">
                        {cartItems.length === 0 ? (
                            null
                        ) : cartItems.map(item => (
                            <div className="cartItem" key={item.id}>
                                <div className="productImg">
                                    <img className="imgFit" src={item.image} alt="" />
                                </div>
                                <div className="productDesc">
                                    <p>{item.name}</p>
                                    <button className="removeButton" onClick={() => dispatch(removeProduct(item.id))}>X Удалить</button>
                                </div>
                                <div className="quantity">
                                    <button className="quantityButton" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className="quantityButton" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <p className="subTotal">{item.price * item.quantity}&#8376;</p>
                            </div>
                        )) 
                        }
                    </div>
                    <div className="checkout">
                        {cartItems.length ?
                            <>
                                <div className="totalPrice">
                                    <h3>Итог:</h3>
                                    <h3>{total} &#8376;</h3>
                                </div>
                                <button className="button" onClick={() => setStep(2)}>Продолжить</button>
                            </> 
                            :
                            <>
                                <button className="button" onClick={emptyBasket}>Вернуться к товарам</button>
                            </>
                        }
                    </div>
                </section>
            }
            {step === 2 &&
                <section className="cartContainer">
                    <h1>Оформление заказа</h1>
                    <div className="checkoutCardContainer">
                        <div className="checkoutCard">
                            <h1>Контактные данные</h1>
                            <div className="fullName">
                                <div className="box">
                                    <label htmlFor="">Имя</label>
                                    <input 
                                        className="checkoutInput" 
                                        type="text" 
                                        placeholder="Введите ваше имя" 
                                        value={contactDetails.firstName}
                                        onChange={(e) => setContactDetails({ ...contactDetails, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="box">
                                    <label htmlFor="">Фамилия</label>
                                    <input 
                                        className="checkoutInput" 
                                        type="text" 
                                        placeholder="Введите ваше фамилию"
                                        value={contactDetails.lastName}
                                        onChange={(e) => setContactDetails({ ...contactDetails, lastName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <label htmlFor="">Телефон</label>
                            <input 
                                className="checkoutInput" 
                                type="text" 
                                placeholder="Введите ваш номер"
                                value={contactDetails.phone}
                                onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                            />
                            <label htmlFor="">Город</label>
                            <input 
                                className="checkoutInput" 
                                type="text" 
                                placeholder="Введите ваш город"
                                value={contactDetails.city}
                                onChange={(e) => setContactDetails({ ...contactDetails, city: e.target.value })}
                            />
                            <label htmlFor="">Адрес</label>
                            <input 
                                className="checkoutInput" 
                                type="text" 
                                placeholder="Введите ваш адрес"
                                value={contactDetails.address}
                                onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
                            />
                        </div>
                        <button className="button checkoutCardButton" onClick={() => setStep(1)}>Назад</button>
                        <button className="button checkoutCardButton" onClick={handleSubmit}>Подтвердить данные</button>
                    </div>
                </section>
            }
            <Footer/>
        </main>
    )
}

export default CartPage;
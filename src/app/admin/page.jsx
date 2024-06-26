'use client'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import { createProduct } from '../store/slices/productSlice';

export default function Admin() {
    const currentUser = useSelector(state => state.auth.currentUser);
    const router = useRouter();
    const dispatch = useDispatch();
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setImage(url);
        }
    };
    
    const Save = () => {
        const form = new FormData();
        form.append('image', selectedFile);
        form.append('name', name)
        form.append('price', price)
        dispatch(createProduct(form))
        router.push('/')
    }

    useEffect(() => {  // Log the currentUser object to see its properties
        if (!currentUser) {
            // If there is no current user, redirect to home
            redirect('/login');
        } else if (!currentUser.isAdmin) {
            // If the current user is not an admin, redirect to home
            redirect('/');
        }
    }, [currentUser, router]);

    if(!currentUser) return null
    return (
        <section className="container">
            <Header/>
            <section className="adminDashboard">
                <h1>Добавление товара</h1>
                <div className="adminCardContainer">
                    <div className="createProductFormContainer">
                        <div className="createProductForm">
                            <h2>Данные товара</h2>
                            <label htmlFor="">Фото товара</label>
                            <input className="checkoutInput" accept=".png, .jpg, .jpeg, .webp" type="file" onChange={handleFileChange}/>
                            <label htmlFor="">Название товара</label>
                            <input className="checkoutInput" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            <label htmlFor="">Цена товара</label>
                            <input className="checkoutInput" type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                    </div>
                    <div className="imagePreview">
                        {image ? <img className='imgFit' src={image} alt="not found" /> : <h2>Изображение не выбрано</h2>}
                    </div>
                </div>
                <button className="button checkoutCardButton" onClick={Save}>Добавить товар</button>
            </section>
            <Footer />
        </section>
    )
}
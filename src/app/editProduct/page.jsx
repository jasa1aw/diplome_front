'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { editProduct, setProductToEdit } from '@/app/store/slices/productSlice';
import { END_POINT } from "@/config/end_point";

export default function EditProduct() {
    const currentUser = useSelector(state => state.auth.currentUser);
    const productToEdit = useSelector(state => state.product.productToEdit);
    const router = useRouter();
    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState(null);
    const [images, setImages] = useState(productToEdit ? `${END_POINT}${productToEdit.image}` : null);
    const [name, setName] = useState(productToEdit ? productToEdit.name : '');
    const [price, setPrice] = useState(productToEdit ? productToEdit.price : '');

    useEffect(() => {
        if (!productToEdit) {
            // Handle the case where productToEdit is null
            // For example, redirect back to the products list or fetch the product again
            router.push('/');
        }
    }, [productToEdit, router]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setImages(url);
        }
    };

    const saveChanges = () => {
        const form = new FormData();
        if (selectedFile) {
            form.append('image', selectedFile);
        }
        form.append('image', images)
        form.append('name', name);
        form.append('price', price);
        form.append('id', productToEdit.id);
        dispatch(editProduct(form))
        router.push('/main');
    };

    if (!currentUser) return null;

    return (
        <section className="container">
            <Header />
            <section className="adminDashboard">
                <h1>Редактирование товара</h1>
                <div className="adminCardContainer">
                    <div className="createProductFormContainer">
                        <div className="createProductForm">
                            <h2>Данные товара</h2>
                            <label htmlFor="">Фото товара</label>
                            <input className="checkoutInput" accept=".png, .jpg, .jpeg, .webp" type="file" onChange={handleFileChange} />
                            <label htmlFor="">Название товара</label>
                            <input className="checkoutInput" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="">Цена товара</label>
                            <input className="checkoutInput" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="imagePreview">
                        {/* <img src="/img/card2" alt="not Found" /> */}
                        {images ? <img className='imgFit' src={images.includes('blob:') ? images : images} alt="not found" /> : <h2>Изображение не выбрано</h2>}
                    </div>
                </div>
                <button className="button checkoutCardButton" onClick={saveChanges}>Сохранить изменения</button>
                <button className="button cancelButton" onClick={() => router.push('/')}>Отмена</button>
            </section>
            <Footer />
        </section>
    );
}

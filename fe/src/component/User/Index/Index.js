
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Index = () => {

    const [Cart, setCart] = useState([]);
    const [Quantity, setQuantity] = useState(0);

    const handleUpdateCartList = async () => {
        const response1 = await axios.get(`http://localhost:8080/home/cart/list`);
        setCart(response1.data);
        const response2 = await axios.get(`http://localhost:8080/home/cart/count`);
        setQuantity(response2.data);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`http://localhost:8080/home/cart/count`);
            setQuantity(response.data);

        };

        const listCart = async () => {
            const response = await axios.get(`http://localhost:8080/home/cart/list`);
            setCart(response.data);
        };

        listCart();
        fetchProducts();
    }, []);

    return (
        <>
            <Header Cart={Cart} Quantity={Quantity} />
            <Outlet context={[handleUpdateCartList]} />
            <Footer />
        </>
    )
}

export default Index
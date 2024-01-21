import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Cart = () => {


    const navigate = useNavigate();

    const [handleUpdateCartList] = useOutletContext();

    const [Cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        const listCart = async () => {
            const response = await axios.get(`http://localhost:8080/home/cart/list`);
            setCart(response.data);

        };

        const total = async () => {
            const response = await axios.get(`http://localhost:8080/home/cart/totalPrice`);
            setTotal(response.data);

        };

        listCart();
        total();

    }, []);

    const handleUpdateCart = async () => {
        handleUpdateCartList()
        const response1 = await axios.get(`http://localhost:8080/home/cart/list`);
        setCart(response1.data);

        const response2 = await axios.get(`http://localhost:8080/home/cart/totalPrice`);
        setTotal(response2.data);
    };

    const handleQuantityChange = async (productId, size, color, quantity) => {

        const formData = new FormData();
        formData.append('productId', parseInt(productId));
        formData.append('size', size);
        formData.append('color', color);
        formData.append('quantity', parseInt(quantity));



        try {
            await axios.put(`http://localhost:8080/home/cart/update`, formData);
            alert("Thanh cong")
            handleUpdateCart()
        } catch (error) {
            console.error(error);

        }
    }

    const handleDelete = async (productId, size, color) => {

        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('size', size);
        formData.append('color', color);

        try {
            await axios.delete(`http://localhost:8080/home/cart/remove`, { data: formData });
            alert("Product deleted successfully!");
            handleUpdateCart()
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };


    return (
        <>
            <div
                className="container-fluid"
                style={{ backgroundColor: "rgb(245,245,245)" }}
            >
                <div className="container" style={{ paddingTop: 40 }}>
                    <div
                        className="row"
                        style={{ paddingTop: 50, paddingBottom: 20, backgroundColor: "white" }}
                    >
                        <div className="col">
                            <table className="table table-bordered">
                                <thead className="">
                                    <tr>
                                        <th scope="col" style={{ textAlign: "center" }}>
                                            STT
                                        </th>
                                        <th scope="col " style={{ textAlign: "center" }}>
                                            Sản phẩm
                                        </th>
                                        <th scope="col " style={{ textAlign: "center" }}>
                                            Kích thước
                                        </th>
                                        <th scope="col " style={{ textAlign: "center" }}>
                                            Màu
                                        </th>
                                        <th scope="col" style={{ textAlign: "center" }}>
                                            Giá
                                        </th>
                                        <th scope="col" style={{ textAlign: "center" }}>
                                            Số lượng
                                        </th>
                                        <th scope="col" style={{ textAlign: "center" }}>
                                            Tổng
                                        </th>
                                        <th scope="col" style={{ textAlign: "center" }}>
                                            Xóa
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Cart.map(cart => {
                                            const newPrice = cart.unitPrice * (100 - cart.discount) / 100;
                                            const imageUrl = `http://localhost:8080/display/files/${cart.image}`;
                                            const tong = newPrice * cart.quantity
                                            return (
                                                <tr key={cart.id}>
                                                    <th scope="row">1</th>
                                                    <td>
                                                        <div
                                                            className="row"
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center"
                                                            }}
                                                        >
                                                            <div className="col-5">
                                                                <img
                                                                    src={imageUrl}
                                                                    alt=""
                                                                    width="60%%"
                                                                    height="100%"
                                                                    className="img-fluid"
                                                                />
                                                            </div>
                                                            <div className="col-7">
                                                                {cart.name}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ textAlign: "center" }} className="pt-4">
                                                        {cart.size}
                                                    </td>
                                                    <td style={{ textAlign: "center" }} className="pt-4">
                                                        {cart.color}
                                                    </td>
                                                    <td style={{ textAlign: "center" }}>{newPrice}VND</td>
                                                    <td style={{ textAlign: "center" }} className="pt-4">
                                                        <input
                                                            type="number"
                                                            name=""
                                                            id=""
                                                            style={{ width: 40, padding: 0 }}
                                                            value={cart.quantity} onChange={(e) => handleQuantityChange(cart.cartItem.productId, cart.size, cart.color, e.target.value)}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: "center" }}>{tong} VND</td>
                                                    <td>
                                                        <button type='button' onClick={() => handleDelete(parseInt(cart.cartItem.productId), cart.size, cart.color)} className="btn btn-outline-danger">
                                                            <i className="fa-solid fa-trash" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: 20, paddingBottom: 20 }}>
                        <div className="Tongtien">
                            <label htmlFor="" style={{ fontWeight: 600, fontSize: 20 }}>
                                Tổng tiền :
                            </label>
                            <span style={{ color: "#f53e2d", fontWeight: 700 }}>{total} VND</span>
                        </div>

                        <Link to={`/checkout`} type="button" className="btn btn-outline-danger">
                            Tiến hành thanh tóan
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Cart
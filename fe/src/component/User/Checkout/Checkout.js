import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import authHeader from "../../../service/authHeader";
import AuthService from '../../../service/AuthService';
const Checkout = () => {

    const [handleUpdateCartList] = useOutletContext();

    const [Cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");

    const [currentUser, setCurrentUser] = useState({});

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    console.log("paymentMethod",paymentMethod);
    console.log("total",total);

    useEffect(() => {

        const listCart = async () => {
            const response = await axios.get(`http://localhost:8080/home/cart/list`);
            setCart(response.data);

        };

        const total = async () => {
            const response = await axios.get(`http://localhost:8080/home/cart/totalPrice`);
            setTotal(response.data);

        };

        const currentUser = AuthService.getCurrentUser();
        setCurrentUser(currentUser);

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

    const header = authHeader();
    const handleCheckout = async () => {

        try {
            const response = await axios.post("http://localhost:8080/home/cart/checkout",
                {
                    phone: phone,
                    address: address,
                    paymentMethod: paymentMethod,
                    total: total,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                        , ...header
                    },
                });
         
            window.location.href = response.data
            // Xử lý khi checkout thành công
            // alert("Đặt hàng thành công")
           // handleUpdateCart();
        } catch (error) {
            console.error(error.response.data);

        }
    };

    return (
        <>
            <div className="container-fluid" style={{ backgroundColor: "rgb(245, 245, 245)", padding: "50px 0px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-7">
                            <h3>Địa chỉ giao hàng</h3>
                            <form
                                style={{ backgroundColor: "white", padding: "20px 20px" }} >


                                <div className="row">
                                    <div className="form-group col">
                                        <label htmlFor="intSoDT">Số ĐT</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="intSoDT"
                                            name="phone"
                                            placeholder="Số điện thoại"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="inputDC">Địa chỉ</label>{" "}
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputDC"
                                            name="address"
                                            placeholder="Địa chỉ"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <label htmlFor="">Thanh toán</label>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="PPThanhtoan"
                                        id="exampleRadios1"
                                        defaultValue="Tiền mặt"
                                        defaultChecked=""
                                        checked={paymentMethod === "Tiền mặt"}
                                        onChange={handlePaymentChange}
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Tiền mặt
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="PPThanhtoan"
                                        id=""
                                        defaultValue="vnpay"
                                        defaultChecked=""
                                        checked={paymentMethod === "vnpay"}
                                        onChange={handlePaymentChange}
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        VNPAY
                                    </label>
                                </div>

                               
                            </form>
                        </div>


                        <div className="col-5">
                            <h3>Hóa đơn chi tiết</h3>

                            <div style={{ backgroundColor: "white", padding: "20px 20px" }}>

                                <span style={{ fontWeight: 700 }}>Sản phẩm</span>
                                {
                                    Cart.map(cart => {
                                        const newPrice = cart.unitPrice * (100 - cart.discount) / 100;
                                        const tong = newPrice * cart.quantity
                                        return (
                                            <>
                                                <div className="row" >
                                                    <div
                                                        className="col-6"
                                                        style={{ color: "rgb(158, 154, 164)" }} />
                                                    {cart.name}
                                                    <div
                                                        className="col-3"
                                                        style={{ color: "rgb(158, 154, 164)" }} >
                                                        {cart.quantity}, {cart.color} ({cart.size})
                                                    </div>
                                                    <div className="col-3">
                                                        {tong}
                                                    </div>

                                                </div>
                                                <hr />
                                            </>
                                        )
                                    })
                                }
                                <hr />
                                <div className="row">
                                    <div className="col-6" style={{ fontWeight: 500 }}>
                                        Tạm tính
                                    </div>
                                    <div
                                        className="col-6"
                                        style={{ color: "rgb(158, 154, 164)" }}
                                    >
                                        {total} VND
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6" style={{ fontWeight: 500 }}>
                                        Phí ship
                                    </div>
                                    <div className="col-6" style={{ color: "rgb(158, 154, 164)" }}>
                                        0 VND
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-6" style={{ fontWeight: 700 }}>
                                        Tổng tiền
                                    </div>
                                    <div
                                        className="col-6"
                                        style={{ color: "red", fontWeight: 600, fontSize: 17 }}>
                                        {total}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ width: "100%" }}
                                        onClick={handleCheckout}
                                    >
                                        Đặt hàng
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Checkout
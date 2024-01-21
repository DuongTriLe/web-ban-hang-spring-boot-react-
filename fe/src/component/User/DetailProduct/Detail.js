import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import AuthService from '../../../service/AuthService';
const Detail = () => {


    const [handleUpdateCartList] = useOutletContext();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [NameCategory, setCategory] = useState('');
    const [unitPrice, setUnitPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [xuatXu, setXuatXu] = useState('');
    const [proId, setProductId] = useState(0);
    const [image, setImage] = useState('');

    const [colors, setColor] = useState([])
    const [sizes, setSize] = useState([])

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    }

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/home/product/detail/${id}`)
            .then(response => {
                const data = response.data;
                setProductId(data.productId);
                setName(data.name);
                setXuatXu(data.xuatXu);
                setQuantity(data.quantity);
                setUnitPrice(data.unitPrice);
                setDescription(data.description);
                setDiscount(data.discount);
                setImage(data.image)
                setCategory(data.category.name)
            })
        axios.get(`http://localhost:8080/home/product/color/${id}`)
            .then(response => {
                const data = response.data;
                setColor(data)
            })

        axios.get(`http://localhost:8080/home/product/size/${id}`)
            .then(response => {
                const data = response.data;
                setSize(data)
            })

            .catch(error => console.log(error));
    }, [id]);

    const addProduct = async (e) => {
        e.preventDefault();

        // Biểu thức !name sẽ trả về true nếu biến name là "falsy"
        // "falsy" khi nó có giá trị không đúng hoặc không xác định, như là null, undefined, false, 0, NaN, hoặc chuỗi rỗng.
        if (!selectedColor || !selectedSize) {

            alert("Không để trống")
            return;

        } else {

            const formData = new FormData();
            formData.append('productId', proId);
            formData.append('color', selectedColor);
            formData.append('size', selectedSize);

            console.log(formData)
            try {

                const user = await AuthService.getCurrentUser();

                if (!user) {
                    // Chuyển hướng người dùng đến trang đăng nhập nếu chưa đăng nhập
                    alert("bạn cần đăng nhập")
                    return;
                }
                await axios.post(
                    'http://localhost:8080/home/cart/add',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                handleUpdateCartList();
                alert("Thêm cart Thành công")
            } catch (error) {
                console.error(error);
            }



        }
    };

    const newPrice = unitPrice * (100 - discount) / 100;
    const imageUrl = `http://localhost:8080/display/files/${image}`;
    return (
        <div className="container-fluid" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="container">
                <div
                    className="row"
                    style={{
                        padding: "30px 0px",
                        paddingBottom: 30,
                        backgroundColor: "white"
                    }}
                >

                    <div className="col-4">
                        <div className="hinhDetail">
                            <img
                                src={imageUrl}
                                alt=""
                                width="100%"
                                height="60%"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                    <div className="col-8">
                        <h5 className="detail-product-title">
                            {name}
                        </h5>
                        <div className="detail-product-NgoiSao">
                            <i
                                className="fa-sharp fa-solid fa-star"
                                style={{ color: "#fbc473" }}
                            />
                            <i
                                className="fa-sharp fa-solid fa-star"
                                style={{ color: "#fbc473" }}
                            />
                            <i
                                className="fa-sharp fa-solid fa-star"
                                style={{ color: "#fbc473" }}
                            />
                            <i
                                className="fa-sharp fa-solid fa-star"
                                style={{ color: "#fbc473" }}
                            />
                            <i className="fa-regular fa-star" />

                            <span>(9999 đánh giá)</span>
                        </div>

                        <div className="home-product-price">
                            <h2 className="product-old">{unitPrice}</h2>
                            <h2 className="product-new">{newPrice}Đ</h2>
                        </div>

                        <div
                            style={{
                                backgroundColor: "#f5f5f5",
                                fontWeight: 300,
                                padding: "5px 5px"
                            }}
                        >
                            {description}
                        </div>
                        <div className="KichThuoc" style={{ paddingTop: 10 }}>
                            <label htmlFor="" style={{ fontWeight: 700 }}>
                                Kích thước :
                            </label>
                            {sizes.map(size => (
                                <div key={size.id} className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="kt" value={size.name} onChange={handleSizeChange} />
                                        {size.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {/* -----------------------End kích thước------------------ */}
                        <div className="MauSac mt-2">
                            <label htmlFor="" style={{ fontWeight: 700 }}>
                                Màu sắc :
                            </label>
                            {colors.map(color => (
                                <div key={color.id} className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" name="ms" value={color.name} onChange={handleColorChange} />
                                        {color.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {/* -----------------------End màu sắc------------------ */}
                        <div className="loaiSP mt-2">
                            <label htmlFor="" style={{ fontWeight: 700 }}>
                                Loại sản phẩm :
                            </label>
                            <span>{NameCategory}</span>
                        </div>
                        <div className="loaiSP mt-2">
                            <label htmlFor="" style={{ fontWeight: 700 }}>
                                Xuất sứ :
                            </label>
                            <span>{xuatXu}</span>
                        </div>
                        <div className="SoLuong mt-2 mb-2">
                            <label htmlFor="" style={{ fontWeight: 700 }}>
                                Số lượng :
                            </label>
                            <span>{quantity}</span>
                        </div>
                        {/* -----------------------End------------------ */}
                        <button type="button" onClick={addProduct} className="btn btn-success">
                            <i className="fa-solid fa-cart-plus" /> Thêm giỏ hàng
                        </button>

                        <button type="button" className="btn btn-danger ml-3">
                            <i className="fa-sharp fa-solid fa-heart" /> Yêu thích
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Detail
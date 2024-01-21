import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const DSProduct = () => {

    const [product, setProduct] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/home/product/list')
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => console.log(error));

    }, []);

    return (
        <>
            <div className="row" style={{ marginLeft: '30px' }}>
                {
                    showAll ? (
                        product.map(product => {
                            const newPrice = product.unitPrice * (100 - product.discount) / 100;
                            const imageUrl = `http://localhost:8080/display/files/${product.image}`;
                            return (
                                <div className="col-2 " key={product.productId}>
                                    <div className="home-page-product-item">
                                        <div className="home-product-item-img">
                                            <Link to={`/detail/${product.productId}`}>
                                                <img src={imageUrl} alt="" />
                                            </Link>
                                        </div>
                                        <h4 className="home-product-item-title">
                                            {product.name}
                                        </h4>
                                        <div className="home-product-item-footer">
                                            <span className="product-price" style={{ fontSize: '15px', color: '#ee4d2d', fontWeight: 500 }}>{newPrice}Đ</span>
                                            <span style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.5)' }}>Đã bán 12,4k</span>
                                        </div>
                                        <div className="home-product-YeuThich">
                                            <i className="fa-solid fa-check" /> Yêu thích
                                        </div>
                                        <div className="home-product-Sale">
                                            <p className="product-giamGia">{product.discount}%
                                                <br />
                                                <span className="product-giamGia-label">Giảm</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                        :
                        (product.slice(0, 6).map(product => {
                            const newPrice = product.unitPrice * (100 - product.discount) / 100;
                            const imageUrl = `http://localhost:8080/display/files/${product.image}`;
                            return (
                                <div className="col-2 " key={product.productId}>
                                    <div className="home-page-product-item">
                                        <div className="home-product-item-img">
                                            <Link to={`/detail/${product.productId}`}>
                                                <img src={imageUrl} alt="" />
                                            </Link>
                                        </div>
                                        <h4 className="home-product-item-title">
                                            {product.name}
                                        </h4>
                                        <div className="home-product-item-footer">
                                            <span className="product-price" style={{ fontSize: '15px', color: '#ee4d2d', fontWeight: 500 }}>{newPrice}Đ</span>
                                            <span style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.5)' }}>Đã bán 12,4k</span>
                                        </div>
                                        <div className="home-product-YeuThich">
                                            <i className="fa-solid fa-check" /> Yêu thích
                                        </div>
                                        <div className="home-product-Sale">
                                            <p className="product-giamGia">{product.discount}%
                                                <br />
                                                <span className="product-giamGia-label">Giảm</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }))
                }
            </div>

            <div className="row pb-3">
                <div className="col text-center">
                    <button className="btn btn-outline-secondary" style={{ width: '400px', padding: '7px 0px 7px 0px' }} onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Thu gọn" : "Xem thêm"}
                    </button>

                </div>
            </div >
        </>
    )
}

export default DSProduct
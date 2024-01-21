import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
const ListPro = (props) => {

    const { selectedCategoryId, selectedIdTypeProduct } = props

    const [product, setProduct] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/home/product/typeproduct?page=${currentPage}&typeProductId=${id}`)
            .then(response => {
                setProduct(response.data.items);
                setPageCount(response.data.totalPages);
            })
            .catch(error => console.log(error));

    }, [currentPage, id]);

    useEffect(() => {
        axios.get(`http://localhost:8080/home/product/category?page=${currentPage}&categoryId=${selectedCategoryId}`)
            .then(response => {
                setProduct(response.data.items);
                setPageCount(response.data.totalPages);
            })
            .catch(error => console.log(error));

    }, [currentPage, selectedCategoryId]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setCurrentPage(selectedPage);
    };

    return (

        <div className="col-8">
            <div className="row">
                <div className="col" style={{ marginTop: 20 }}>
                    <div className="home-filter">
                        <span className="span-filter">Sắp xếp theo</span>
                        <button className="btn home-filter-btn">Phổ biến</button>
                        <button
                            className="btn home-filter-btn"
                            style={{ backgroundColor: "#ee4d2d", color: "white" }}
                        >
                            Mới nhất
                        </button>
                        <button className="btn home-filter-btn">Bán chạy</button>
                        <div className="select-price">
                            <span className="select-price-lable">Giá</span>
                            <i className=" select-price-icon fa-solid fa-chevron-down" />
                            <ul className="select-price-list">
                                <li className="select-price-list-item">
                                    <a href="" className="select-price-list-link">
                                        Giá cao đến thấp
                                    </a>
                                </li>
                                <li className="select-price-list-item">
                                    <a href="" className="select-price-list-link">
                                        Giá cao đến thấp
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-3">

                {
                    product.map(product => {
                        const newPrice = product.unitPrice * (100 - product.discount) / 100;
                        const imageUrl = `http://localhost:8080/display/files/${product.image}`; // Thay đổi đường dẫn ảnh
                        return (
                            <div key={product.productId} className="col-3 ">

                                <div className="home-product-item">
                                    <div className="home-product-item-img">
                                        <Link to={`/detail/${product.productId}`}>
                                            <img src={imageUrl} alt="" />
                                        </Link>
                                    </div>
                                    <h4 className="home-product-item-title">
                                        {product.name}
                                    </h4>
                                    <div className="home-product-price">
                                        <span className="product-old">{product.unitPrice}</span>
                                        <span className="product-new">{newPrice}Đ</span>
                                    </div>

                                    <div style={{ marginLeft: '10px', fontWeight: '400', color: '#555', fontSize: '13px' }}>
                                        {product.category.idTypeProduct.name}
                                    </div>
                                    <div style={{ marginLeft: '10px', fontWeight: '400', color: '#555', fontSize: '13px' }}>
                                        {product.category.name}
                                    </div>

                                    <div className="home-product-XuatSu" style={{ marginLeft: 10 }}>
                                        <span className="product-country">{product.xuatXu}</span>
                                    </div>
                                    <div className="home-product-YeuThich">
                                        <i className="fa-solid fa-check" /> Yêu thích
                                    </div>
                                    <div className="home-product-Sale">
                                        <p className="product-giamGia">
                                            {product.discount}% <br />
                                            <span className="product-giamGia-label">Giảm</span>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        );
                    })
                }


            </div>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default ListPro
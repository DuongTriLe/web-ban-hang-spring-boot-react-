import React from 'react'
import './product.css'
import { Col, Row } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/AuthService';
import authHeader from '../../../service/authHeader';
const ListProduct = () => {

    const header = authHeader();

    const [product, setProduct] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [productDeleted, setProductDeleted] = useState(false);

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const user = await AuthService.getCurrentUser();

                if (!user) {
                    // Chuyển hướng người dùng đến trang đăng nhập nếu chưa đăng nhập
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`http://localhost:8080/admin/products?page=${currentPage}`, {
                    headers: header, // Sử dụng biến header làm header trong yêu cầu API
                });
                setProduct(response.data.items);
                setPageCount(response.data.totalPages);

                if (productDeleted) {
                    setProductDeleted(false);
                }
            } catch (error) {
                setError(
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
                );
                navigate('/login');
            }
        };

        checkAuthentication();
    }, [currentPage, navigate, productDeleted]);


    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setCurrentPage(selectedPage);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/admin/products/delete/${id}`, {
                headers: header, // Sử dụng biến header làm header trong yêu cầu API
            });
            if (response.status === 200) {
                alert("Product deleted successfully!");
                setProductDeleted(true);
            } else {
                alert("Failed to delete product.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while deleting the product.");
        }
    };

    return (
        <>
            <Row className='mb-3'>
                <Col span={8}>
                    <h4>List Product</h4>
                </Col>
                <Col span={8} offset={8}>
                    <input type="text" class="form-control" placeholder="Search....." />
                </Col>
            </Row>
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Giá</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Category</th>
                            <th>Category</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            product.map(product => {
                                const imageUrl = `http://localhost:8080/display/files/${product.image}`;
                                return (
                                    <tr>
                                        <td>{product.productId}</td>
                                        <td><img src={imageUrl} alt="" style={{ width: '100px', height: '100px' }} /></td>
                                        <td>{product.name}</td>
                                        <td>{product.unitPrice}</td>
                                        <td>{product.xuatXu}</td>

                                        <td>
                                            <Link to={`/admin/edit-product/${product.productId}`} className="btn btn-outline-warning"><i className="fas fa-edit"></i></Link>
                                            <button onClick={() => handleDelete(product.productId)} className="btn btn-outline-danger"><i class="fas fa-recycle"></i></button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
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
        </>
    )
}

export default ListProduct
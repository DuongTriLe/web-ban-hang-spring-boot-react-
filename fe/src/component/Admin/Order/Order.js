import React from 'react'
import { Col, Row } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/AuthService';
import authHeader from '../../../service/authHeader';
const Order = () => {

    const [orders, setOrder] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [id, setId] = useState(0);

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const header = authHeader();
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const user = await AuthService.getCurrentUser();

                if (!user) {
                    // Chuyển hướng người dùng đến trang đăng nhập nếu chưa đăng nhập
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`http://localhost:8080/admin/order?page=${currentPage}`, {
                    headers: header, // Sử dụng biến header làm header trong yêu cầu API
                });
                setOrder(response.data.items);
                setPageCount(response.data.totalPages);
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
    }, [currentPage, navigate]);


    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const user = await AuthService.getCurrentUser();

                if (!user) {
                    // Chuyển hướng người dùng đến trang đăng nhập nếu chưa đăng nhập
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`http://localhost:8080/admin/order/find/${id}`, {
                    headers: header, // Sử dụng biến header làm header trong yêu cầu API
                });
                setOrderDetail(response.data);
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
    }, [id, navigate]);




    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setCurrentPage(selectedPage);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const showOrderDetail = async (id) => {
        setShowModal(true)
        setId(id)

    }
    return (
        <>
            <Row className='mb-3'>
                <Col span={24}>
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>OrderId</th>
                                    <th>OrderDate</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Total</th>
                                    <th>User</th>
                                    <th>Action</th>


                                </tr>
                            </thead>

                            <tbody>
                                {
                                    orders.map(item => {

                                        return (
                                            <tr>
                                                <td>{item.orderId}</td>

                                                <td>{item.orderDate}</td>
                                                <td>{item.address}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.total}</td>
                                                <td>{item.username.username}</td>
                                                <td>
                                                    <button onClick={() => showOrderDetail(item.orderId)} className="btn btn-outline-danger"><i class="fas fa-recycle"></i></button>
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
                </Col>
            </Row>

            {/* success modal */}
            {showModal && (
                <Modal show={showModal} onHide={handleModalClose} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className='mb-3'>
                            <Col span={24}>
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Sản phẩm</th>
                                                <th>Giá</th>
                                                <th>Số lượng</th>
                                                <th>Màu sắc</th>
                                                <th>Kích thước</th>
                                                <th>ID Order</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                orderDetail.map(item => {
                                                    const imageUrl = `http://localhost:8080/display/files/${item.product.image}`;
                                                    return (
                                                        <tr>
                                                            <td>{item.orderDetailId}</td>
                                                            <td><img src={imageUrl} alt="" style={{ width: '100px', height: '100px' }} /></td>
                                                            <td>{item.product.unitPrice}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.color}</td>
                                                            <td>{item.size}</td>
                                                            <td>{item.order.orderId}</td>

                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default Order
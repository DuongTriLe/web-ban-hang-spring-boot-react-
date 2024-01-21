
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/AuthService';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import AddTypeProduct from './AddTypeProduct';
import ListTypeProduct from './ListTypeProduct';
import authHeader from '../../../service/authHeader';

const TypeProduct = () => {

    const [TypeProductList, setTypeProductList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedId, setSelectedtypeproduct] = useState(null);
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

                const response = await axios.get(`http://localhost:8080/admin/typeproduct?page=${currentPage}&size=${3}`, {
                    headers: header, // Sử dụng biến header làm header trong yêu cầu API
                });
                setTypeProductList(response.data.items);
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

    const handleUpdateTypeProduct = async () => {
        const response = await axios.get(`http://localhost:8080/admin/typeproduct?page=${currentPage}&size=${3}`, {
            headers: header, // Sử dụng biến header làm header trong yêu cầu API
        });
        setTypeProductList(response.data.items);
    };

    const addtypeproduct = async (formData) => {
        try {
            await axios.post(
                'http://localhost:8080/admin/typeproduct',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...header
                    },
                }
            );
            alert("thanh cong")
            handleUpdateTypeProduct()
        } catch (error) {
            console.error(error);
        }
    };

    const updatetypeproduct = async (formData) => {
        try {
            await axios.put(
                `http://localhost:8080/admin/typeproduct/update/${selectedId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...header
                    },
                }
            );
            alert("thanh cong")
            handleUpdateTypeProduct()
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setCurrentPage(selectedPage);
    };

    const handleSelecttypeproduct = (id) => {
        setSelectedtypeproduct(id);
    };


    const deletetypeproduct = async (id) => {
        await axios.delete(`http://localhost:8080/admin/typeproduct/delete/${id}`, {
            headers: header, // Sử dụng biến header làm header trong yêu cầu API
        })
            .then(response => {
                console.log("--->", response.data)
                alert("Xóa thành công")
                handleUpdateTypeProduct()
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <Row className='mb-3'>
                <Col span={24}>
                    <AddTypeProduct addtypeproduct={addtypeproduct} selectedId={selectedId} updatetypeproduct={updatetypeproduct} handleUpdateTypeProduct={handleUpdateTypeProduct} />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col span={24}>
                    <ListTypeProduct TypeProductList={TypeProductList} handleSelecttypeproduct={handleSelecttypeproduct} handlePageClick={handlePageClick} pageCount={pageCount} deletetypeproduct={deletetypeproduct} />
                </Col>
            </Row>
        </>
    )
}

export default TypeProduct
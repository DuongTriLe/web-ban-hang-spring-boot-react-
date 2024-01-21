import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import axios from 'axios';
import ListSize from './ListSize';
import AddSize from './AddSize';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/AuthService';
import authHeader from '../../../service/authHeader';
const Size = () => {

    const header = authHeader();

    const [sizeList, setsizeList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [idsize, setIdsize] = useState(null);
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

                const response = await axios.get(`http://localhost:8080/admin/size?page=${currentPage}&size=${3}`, {
                    headers: header, // Sử dụng biến header làm header trong yêu cầu API
                });
                setsizeList(response.data.items);
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

    const handleUpdateSize = async () => {
        const response = await axios.get(`http://localhost:8080/admin/size?page=${currentPage}&size=${3}`, {
            headers: header, // Sử dụng biến header làm header trong yêu cầu API
        });
        setsizeList(response.data.items);
        setPageCount(response.data.totalPages);
    };


    const addsize = async (formData) => {
        try {
            await axios.post(
                'http://localhost:8080/admin/size',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...header
                    },
                }
            );
            alert("thanh cong")
            handleUpdateSize()
        } catch (error) {
            console.error(error);
        }
    };

    const updatesize = async (formData) => {
        try {
            await axios.put(
                `http://localhost:8080/admin/size/update/${idsize}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...header
                    },
                }
            );
            alert("thanh cong")
            handleUpdateSize()
        } catch (error) {
            console.error(error);
        }
    };

    const deletesize = async (id) => {
        await axios.delete(`http://localhost:8080/admin/size/delete/${id}`, {
            headers: header, // Sử dụng biến header làm header trong yêu cầu API
        })
            .then(response => {
                console.log("--->", response.data)
                alert("thanh cong")
                handleUpdateSize()

            })
            .catch(error => console.log(error));
    };

    const handleSelectsize = (id) => {
        setIdsize(id);
    };


    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setCurrentPage(selectedPage);
    };
    return (
        <>
            <Row className='mb-3'>
                <Col span={24}>
                    <AddSize addsize={addsize} idsize={idsize} updatesize={updatesize} />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col span={24}>
                    <ListSize handlePageClick={handlePageClick} sizeList={sizeList} pageCount={pageCount} handleSelectsize={handleSelectsize} deletesize={deletesize} />
                </Col>
            </Row>
        </>
    )
}

export default Size
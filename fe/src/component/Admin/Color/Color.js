import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import axios from 'axios';
import AddColor from './AddColor';
import ListColor from './ListColor';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/AuthService';
import authHeader from '../../../service/authHeader';
const Color = () => {

    const [colorList, setColorList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [idColor, setIdColor] = useState(null);

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

                const response = await axios.get(`http://localhost:8080/admin/color?page=${currentPage}&size=${3}`,
                    {
                        headers: header, // Sử dụng biến header làm header trong yêu cầu API
                    });
                setColorList(response.data.items);
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

    const handleUpdateColor = async () => {
        const response = await axios.get(`http://localhost:8080/admin/color?page=${currentPage}&size=${3}`,
            {
                headers: header, // Sử dụng biến header làm header trong yêu cầu API
            });
        setColorList(response.data.items);
        setPageCount(response.data.totalPages);
    };

    const addColor = async (formData) => {
        try {
            await axios.post(
                'http://localhost:8080/admin/color',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...header
                    },
                }
            );
            alert("thanh cong")
            handleUpdateColor()
        } catch (error) {
            console.error(error);
        }
    };

    const updateColor = async (formData) => {
        try {
            await axios.put(
                `http://localhost:8080/admin/color/update/${idColor}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...header
                    },
                }
            );
            alert("thanh cong")
            handleUpdateColor()
        } catch (error) {
            console.error(error);
        }
    };

    const deleteColor = async (id) => {
        await axios.delete(`http://localhost:8080/admin/color/delete/${id}`)
            .then(response => {
                console.log("--->", response.data)
                alert("thanh cong")
                handleUpdateColor()

            })
            .catch(error => console.log(error));
    };

    const handleSelectColor = (id) => {
        setIdColor(id);
    };


    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setCurrentPage(selectedPage);
    };

    return (
        <>
            <Row className='mb-3'>
                <Col span={24}>
                    <AddColor addColor={addColor} idColor={idColor} updateColor={updateColor} />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col span={24}>
                    <ListColor handlePageClick={handlePageClick} colorList={colorList} pageCount={pageCount} handleSelectColor={handleSelectColor} deleteColor={deleteColor} />
                </Col>
            </Row>
        </>
    )
}

export default Color
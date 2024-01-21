import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import AddCategory from './AddCategory';
import ListCategory from './ListCategory';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/AuthService';
import authHeader from '../../../service/authHeader';
const Category = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
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

                const response = await axios.get(`http://localhost:8080/admin/category?page=${currentPage}&size=${3}`,
                    {
                        headers: header, // Sử dụng biến header làm header trong yêu cầu API
                    });
                setCategoryList(response.data.items);
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

    const handleUpdateCategory = async () => {
        const response = await axios.get(`http://localhost:8080/admin/category?page=${currentPage}&size=${3}`,
            {
                headers: header, // Sử dụng biến header làm header trong yêu cầu API
            });
        setCategoryList(response.data.items);
    };

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setCurrentPage(selectedPage);
    };

    const addCategory = async (formData) => {
        try {
            await axios.post(
                'http://localhost:8080/admin/category',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...header
                    },
                }
            );
            alert("thanh cong")
            handleUpdateCategory()
        } catch (error) {
            console.error(error);
        }
    };


    const handleSelectCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    const updateCategory = async (formData) => {
        await axios.put(`http://localhost:8080/admin/category/update/${selectedCategoryId}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                console.log("--->", response.data)
                alert("thanh cong")
                handleUpdateCategory()
            })
            .catch(error => console.log(error));
    };

    const deleteCategory = async (id) => {
        await axios.delete(`http://localhost:8080/admin/category/delete/${id}`, {
            headers: header, // Sử dụng biến header làm header trong yêu cầu API
        })
            .then(response => {
                alert("Xóa thành công")
                handleUpdateCategory()
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <Row className='mb-3'>
                <Col span={24}>
                    <AddCategory onAddCategory={addCategory} selectedCategoryId={selectedCategoryId} onUpdateCategory={updateCategory} />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col span={24}>
                    <ListCategory categoryList={categoryList} setCategoryList={setCategoryList} handlePageClick={handlePageClick} pageCount={pageCount} onSelectCategory={handleSelectCategory} deleteCategory={deleteCategory} />
                </Col>
            </Row>
        </>
    )
}

export default Category
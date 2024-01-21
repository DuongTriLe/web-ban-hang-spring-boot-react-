import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BsListCheck } from "react-icons/bs"
import { AiFillCaretRight } from "react-icons/ai"
import { useParams } from 'react-router-dom';
const TimKiem = (props) => {

    // const [xuatxus, setXuatXus] = useState([]);
    const [category, setCategory] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const { id, name } = useParams();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [NameTypeProduct, setNameTypeProduct] = useState('');


    useEffect(() => {
        // axios.get('http://localhost:8080/home/xuatxu')
        //     .then(response => {
        //         setXuatXus(response.data);
        //     })
        //     .catch(error => console.log(error));

        axios.get(`http://localhost:8080/home/typeproduct/${id}`)
            .then(response => {
                setCategory(response.data);

            })
            .catch(error => console.log(error));
    }, []);

    const handleClick = (categoryId) => {
        props.setSelectedCategoryId(categoryId);
        setSelectedCategory(categoryId);
    };

    const handleClickIdTypeProduct = (id) => {
        props.setSelectedIdTypeProduct(id);
    };

    return (
        <div className="col-3 timKiem mt-4">

            <h6 style={{ fontWeight: '700' }}><BsListCheck style={{ marginRight: '10px' }} /> Tất cả danh mục</h6>
            <div className="name-typeProduct">
                <p onClick={() => handleClickIdTypeProduct(id)} style={{ marginBottom: '0px' }}>{name}</p>
            </div>

            <ul className='category-List'>


                {showAll ? (
                    category.map(category => (

                        <li
                            key={category.id}
                            className={`category-item ${selectedCategory === category.categoryId ? 'selected' : ''}`}
                        >
                            <p
                                style={{ marginBottom: '5px' }}
                                onClick={() => handleClick(category.categoryId)}
                            >
                                {selectedCategory === category.categoryId && (
                                    <AiFillCaretRight style={{ fontSize: '13px', marginTop: '2px', marginRight: '10px' }} />
                                )}
                                {category.name}
                            </p>
                        </li>
                    ))
                ) : (
                    category.slice(0, 3).map(category => (

                        <li
                            key={category.id}
                            className={`category-item ${selectedCategory === category.categoryId ? 'selected' : ''}`}
                        >
                            <p
                                style={{ marginBottom: '0px' }}
                                onClick={() => handleClick(category.categoryId)}
                            >
                                {selectedCategory === category.categoryId && (
                                    <AiFillCaretRight style={{ fontSize: '13px', marginTop: '2px', marginRight: '10px' }} />
                                )}
                                {category.name}
                            </p>
                        </li>
                    ))
                )}
            </ul>

            <div className="show-all">
                <p onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Thu gọn" : "Thêm"}
                    <i style={{ fontSize: '10px', marginLeft: '5px' }} className={`fa-sharp fa-solid fa-chevron-${showAll ? "up" : "down"}`} />
                </p>
            </div>
        </div>
    )
}

export default TimKiem
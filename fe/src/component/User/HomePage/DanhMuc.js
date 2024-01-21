import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DanhMuc = () => {

    const [TypeProductList, setTypeProductList] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/home/typeproduct/list')
            .then(response => {
                setTypeProductList(response.data);
            })
            .catch(error => console.log(error));

    }, []);

    return (

        <div className="row">
            <div className="col">
                <ul className="DanhMuc" style={{ backgroundColor: 'white' }}>
                    {
                        TypeProductList.map(item => {
                            const imageUrl = `http://localhost:8080/display/files/${item.image}`;
                            return (
                                <li className="danhmuc-item" key={item.id}>
                                    <Link to={`typeproduct/${item.id}/${item.name}`}>
                                        <img src={imageUrl} alt="" className="img-fluid" />
                                        <div>
                                            {item.name}
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>

    )
}

export default DanhMuc
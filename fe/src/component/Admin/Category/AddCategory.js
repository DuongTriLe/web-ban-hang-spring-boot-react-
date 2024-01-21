import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from '../../../service/authHeader';

const AddCategory = (props) => {

    const [name, setName] = useState('');
    const [idTypeProduct, setidTypeProduct] = useState(1);

    const { onAddCategory, selectedCategoryId, onUpdateCategory } = props

    const addCategory = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('idTypeProduct', parseInt(idTypeProduct));
        onAddCategory(formData);

        setName('');
    };

    const updateCategory = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('idTypeProduct', parseInt(idTypeProduct));

        onUpdateCategory(formData);
        setName('');
    };

    const header = authHeader();
    useEffect(() => {
        axios.get(`http://localhost:8080/admin/category/${selectedCategoryId}`,
            {
                headers: header, // Sử dụng biến header làm header trong yêu cầu API
            })
            .then(response => {
                const data = response.data;
                setName(data.name);
                setidTypeProduct(data.idTypeProduct.id)

            })
            .catch(error => console.log(error));
    }, [selectedCategoryId]);

    const [TypeProductList, setTypeProductList] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/admin/typeproduct/list', {
            headers: header, // Sử dụng biến header làm header trong yêu cầu API
        })
            .then(response => {
                setTypeProductList(response.data);
            })
            .catch(error => console.log(error));

    }, []);
    return (
        <>
            <div className="card shadow mb-4">
                {/* Card Header - Dropdown */}
                <div className="card-header ">
                    {
                        selectedCategoryId ?
                            (<h6 className="m-0 font-weight-bold text-primary">Update</h6>)
                            :
                            (<h6 className="m-0 font-weight-bold text-primary">Thêm mới</h6>)
                    }

                </div>
                {/* Card Body */}
                <div className="card-body">

                    <div className="form-group">
                        <label htmlFor="name">Name </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            aria-describedby="name"
                            placeholder=""
                            value={name} onChange={event => setName(event.target.value)}
                        />

                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="" classname="mb-3">
                            TypeProduct
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            value={idTypeProduct}
                            onChange={(e) => setidTypeProduct(e.target.value)}
                        >
                            <option value={-1} disabled defaultValue>
                                Chọn TypeProduct
                            </option>
                            {TypeProductList.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="card-footer mt-3">
                        {
                            selectedCategoryId ?
                                (<button type="button" onClick={updateCategory} className="btn btn-primary" style={{ marginLeft: '5px' }}>
                                    update
                                </button>)
                                :
                                (<button type="button" onClick={addCategory} className="btn btn-primary" style={{ marginLeft: '5px' }}>
                                    Save
                                </button>)
                        }

                        <button type="button" name="" id="" className="btn btn-secondary " style={{ marginLeft: '5px' }}>
                            Reset
                        </button>
                    </div>
                </div>
            </div >

        </>
    )
}

export default AddCategory
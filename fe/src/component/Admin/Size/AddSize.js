import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from '../../../service/authHeader';

const AddSize = (props) => {

    const [products, setProduct] = useState([]);
    const [name, setName] = useState('');
    const [idProduct, setIdProduct] = useState(1)
    const header = authHeader();
    const { idsize } = props

    useEffect(() => {
        axios
            .get('http://localhost:8080/admin/products/list', {
                headers: header, // Sử dụng biến header làm header trong yêu cầu API
            })
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/size/${idsize}`)
            .then(response => {
                const data = response.data;
                setName(data.name);
                setIdProduct(data.sizeProduct.productId)
            })
            .catch(error => console.log(error));
    }, [idsize]);

    const savesize = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('SizeProduct', parseInt(idProduct));
        props.addsize(formData);
    };

    const updatesize = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('sizeProduct', parseInt(idProduct));
        props.updatesize(formData);
    };
    return (
        <>
            <div className="card shadow mb-4">
                {/* Card Header - Dropdown */}
                <div className="card-header ">
                    {
                        idsize ?
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
                            Product
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            value={idProduct}
                            onChange={(e) => setIdProduct(e.target.value)}
                        >
                            <option value={-1} disabled defaultValue>
                                Chọn product
                            </option>
                            {products.map((product) => (
                                <option key={product.productId} value={product.productId}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="card-footer mt-3">

                        {
                            idsize ?
                                (<button type="button" onClick={updatesize} className="btn btn-primary" style={{ marginLeft: '5px' }}>
                                    update
                                </button>)
                                :
                                (<button type="button" className="btn btn-primary" style={{ marginLeft: '5px' }} onClick={savesize}>
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

export default AddSize
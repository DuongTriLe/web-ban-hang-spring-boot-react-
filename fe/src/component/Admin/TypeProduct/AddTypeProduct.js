import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from '../../../service/authHeader';

const AddTypeProduct = (props) => {

    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const { addtypeproduct, selectedId, updatetypeproduct } = props
    const [localSelectedId, setLocalSelectedId] = useState(selectedId);
    const header = authHeader();

    const saveTypeProduct = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);
        addtypeproduct(formData);

    };

    const updateTypeProduct = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);
        updatetypeproduct(formData);

    };

    const reset = () => {

        setName('');
        setFile(null)
        setLocalSelectedId("")
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/typeproduct/${selectedId}`, {
            headers: header,
        })
            .then(response => {
                const data = response.data;
                setLocalSelectedId(selectedId);
                setName(data.name);
                setFile(data.image)
            })
            .catch(error => console.log(error));
    }, [selectedId]);

    return (
        <>
            <div className="card shadow mb-4">
                {/* Card Header - Dropdown */}
                <div className="card-header ">
                    {
                        localSelectedId ?
                            (<h6 className="m-0 font-weight-bold text-success">Update</h6>)
                            :
                            (<h6 className="m-0 font-weight-bold text-primary">Thêm mới TypeProduct</h6>)
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
                        <label htmlFor="productImage">Image File</label>
                        <input
                            type="file"
                            className="form-control"
                            name="productImage"
                            id="productImage"
                            aria-describedby="productImage"
                            placeholder="Enter productImage"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <small id="productImage" className="form-text text-muted" />
                    </div>
                    <div className="card-footer mt-3">
                        {
                            localSelectedId ?
                                (<button type="button" onClick={updateTypeProduct} className="btn btn-primary" style={{ marginLeft: '5px' }}>
                                    update
                                </button>)
                                :
                                (<button type="button" onClick={saveTypeProduct} className="btn btn-primary" style={{ marginLeft: '5px' }}>
                                    Save
                                </button>)
                        }

                        <button type="button" onClick={reset} className="btn btn-secondary " style={{ marginLeft: '5px' }}>
                            Reset
                        </button>
                    </div>
                </div>
            </div >

        </>
    )
}


export default AddTypeProduct
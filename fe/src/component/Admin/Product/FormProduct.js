import React, { useEffect, useState } from 'react';
import './product.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/AuthService';
import authHeader from '../../../service/authHeader';
const FormProduct = () => {

    const header = authHeader();

    const [category, setCategories] = useState([]);

    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [categoryId, setCategoryId] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);

    const [quantity, setQuantity] = useState(0);
    const [discount, setDiscount] = useState(null);
    const [xuatXu, setXuatXu] = useState('');
    const [proId, setProductId] = useState(0);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false);
    const [title, setTitle] = useState("");

    const { id } = useParams();

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
    }, [navigate]);


    useEffect(() => {
        axios
            .get('http://localhost:8080/admin/category/list', {
                headers: header, // Sử dụng biến header làm header trong yêu cầu API
            })
            .then((response) => {
                setCategories(response.data);

            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if(id){
            axios.get(`http://localhost:8080/admin/products/${id}`, {
            headers: header, // Sử dụng biến header làm header trong yêu cầu API
        })
            .then(response => {
                const data = response.data;
                setProductId(data.productId);
                setName(data.name);
                setXuatXu(data.xuatXu);
                setQuantity(data.quantity);
                setUnitPrice(data.unitPrice);
                setDescription(data.description);
                setDiscount(data.discount);
                setCategoryId(data.category.categoryId);
            })
            .catch(error => console.log(error));
        }
    }, [id]);

    const resetForm = () => {
        setFile(null);
        setName('');
        setDescription('');
        setCategoryId(0);
        setUnitPrice(0);
        setQuantity(0);
        setDiscount(0);
        setXuatXu('');
    }

    const addProduct = async (e) => {
        e.preventDefault();

        // Biểu thức !name sẽ trả về true nếu biến name là "falsy"
        // "falsy" khi nó có giá trị không đúng hoặc không xác định, như là null, undefined, false, 0, NaN, hoặc chuỗi rỗng.
        if (!name || !xuatXu || !quantity || !unitPrice || !description || !file || !discount) {

            setShowFailureModal(true);
            setTitle("Không được để trống")
            return;

        } else {

            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            formData.append('quantity', parseInt(quantity));
            formData.append('unitPrice', parseInt(unitPrice));
            formData.append('description', description);
            formData.append('discount', parseInt(discount));
            formData.append('xuatXu', xuatXu);

            formData.append('categoryId', parseInt(categoryId));

            try {
                await axios.post(
                    'http://localhost:8080/admin/products',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            ...header
                        },
                    }
                );
                setShowSuccessModal(true);
                setTitle("Save product thành công")
            } catch (error) {
            }

            resetForm();

        }
    };

    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('quantity', parseInt(quantity));
        formData.append('unitPrice', parseInt(unitPrice));
        formData.append('description', description);
        formData.append('discount', parseInt(discount));
        formData.append('xuatXu', xuatXu);

        formData.append('categoryId', parseInt(categoryId));


        try {
            await axios.put(`http://localhost:8080/admin/products/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...header
                },
            });
            setShowSuccessModal(true);
            setTitle("Cập nhật sản phẩm thành công")
            resetForm();
        } catch (error) {
            console.error(error);
            setShowFailureModal(true);
            setTitle("Cập nhật sản phẩm thất bại")
        }
    }

    const handleModalClose = () => {
        setShowSuccessModal(false);
        setShowFailureModal(false);
        setTitle("")
    };

    return (
        <>
            <h4>{id ? "Update Product" : "Add Product"}</h4>
            <form >

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="xuatxu"
                        placeholder="Xuat xu"
                        value={xuatXu}
                        onChange={(e) => setXuatXu(e.target.value)}
                    />
                    <label htmlFor="xuatxu">Xuất xứ</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        placeholder="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <label htmlFor="quantity">Quantity</label>
                </div>

                <div className="input-group form-group mb-3">
                    <span className="input-group-text">Unit price</span>
                    <input
                        type="number"
                        name="unitPrice"
                        id="unitPrice"
                        className="form-control"
                        placeholder="Enter Unit price"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                    />
                    <span className="input-group-text">$</span>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="" classname="mb-3">
                        Category
                    </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value={-1} disabled defaultValue>
                            Chọn category
                        </option>
                        {category.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.name}
                            </option>
                        ))}
                    </select>
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

                <div className="input-group form-group mb-3">
                    <span className="input-group-text">Discount</span>
                    <input
                        type="number"
                        name="discount"
                        id="discount"
                        className="form-control"
                        placeholder="Enter discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                    <span className="input-group-text">%</span>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="description">Desciption</label>
                    <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        rows={5}

                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="">
                    <button type="button" onClick={resetForm} className="btn-pro btn btn-success">
                        New
                    </button>
                    {
                        id ?
                            (<button onClick={updateProduct} className="btn-pro btn btn-primary">
                                update
                            </button>)
                            :
                            (<button onClick={addProduct} className="btn-pro btn btn-primary">
                                Save
                            </button>)
                    }
                    <button type="button" className="btn-pro btn btn-danger">
                        Delete
                    </button>
                </div>
            </form>

        


        </>
    );
};

export default FormProduct;
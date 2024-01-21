
import logo from '../../../images/logo-shopee-png-images-download-shopee-1.png'
import shoppelogo from '../../../images/shopee_logo.png'
import AuthService from '../../../service/AuthService';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'
import { Link } from 'react-router-dom';
const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        AuthService.login(username, password)
            .then(() => {
                alert("Đăng nhập thành công");
                const currentUser = AuthService.getCurrentUser();
                if (currentUser && currentUser.role) {
                    const isAdmin = currentUser.role.includes('ROLE_ADMIN');
                    if (isAdmin) {
                        navigate('/admin'); // Điều hướng đến trang admin
                    } else {
                        navigate('/'); // Điều hướng đến trang chính
                    }
                }

            })
            .catch((error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                // setLoading(false);
                // setMessage(resMessage);
            });
    };
    return (

        <>
            <div className="container" style={{ backgroundColor: "#ffffff" }}>
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-dark col">
                        {/* Nếu trình duyệt nhỏ thì các nút nhấn sẽ di chuyển thành hàng ngang */}
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            {/* data-toggle Thuộc tính này hỗ trợ chúng ta về hiệu ứng khi click vào dropdown menu */}
                            {/* data-target = ID */}
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* mr-auto đẩy qua bên phải */}
                            <ul className="navbar-nav ">
                                <li className="nav-item" style={{ width: 200 }}>
                                    <a className="nav-link" href="index.html">
                                        <img
                                            src={logo}
                                            alt=""
                                            width="100%"
                                        />
                                    </a>
                                </li>

                            </ul>


                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item">
                                    <a className="nav-link" href="/"></a>
                                    <a
                                        href="/"
                                        className="nav-link"
                                        style={{ color: "#ee5e5e", fontWeight: 600 }}
                                    >
                                        Bạn cần giúp đỡ?
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div
                className="container-fluid"
                style={{
                    background: "linear-gradient(to bottom, rgb(238,77,45), #fd5f32)"
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="hinhAnh" style={{ marginTop: 0 }}>
                                <img
                                    src={shoppelogo}
                                    alt=""
                                    width="100%"
                                    height="60%"
                                />
                            </div>
                        </div>
                        <div className="col-4 ">
                            <div className="row mt-3">

                                <form onSubmit={handleSubmit} className="form-login">
                                    <h3>Đăng nhập</h3>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <label htmlFor="name">Username</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="name"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label htmlFor="name">Mật khẩu</label>
                                    </div>

                                    <button type="submit" className="btn btn-primary btnLogin">
                                        Login
                                    </button>

                                    <div className="hinhthuc">
                                        <span>Hoặc</span>
                                    </div>
                                    
                                    <div className="mangXH">
                                        <div className="social fb">
                                            <i
                                                className="fa-brands fa-facebook"
                                                style={{ color: "#1877f2" }}
                                            />
                                            Facebook
                                        </div>
                                        <div className="social gg">
                                            <i className="fa-brands fa-google" /> Google
                                        </div>
                                    </div>
                                    <div className="footer-form">
                                        <p>
                                            Bạn đã chưa có tài khoản?
                                            <Link to={`/register`} type="button" className="btns btn-default">
                                                Đăng kí
                                            </Link>
                                        </p>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Login
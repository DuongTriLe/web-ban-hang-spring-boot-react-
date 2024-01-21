import React from 'react'
import './footer.css'
import qr from '../../../images/qr.png'
import app from '../../../images/app_store.png'
import ch from '../../../images/google_play.png'
const Footer = () => {
    return (
        <>
            <>
                <div className="container-fluid" style={{ borderTop: "6px solid red" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <h3 className="fotter-heading">Chăm sóc khách hàng</h3>
                                <ul className="footer-list">
                                    <li className="footer-list-item">
                                        <a href="/" className="footer-item-link">
                                            Trung tâm trợ giúp
                                        </a>
                                    </li>
                                    <li className="footer-list-item">
                                        <a href="/" className="footer-item-link">
                                            F8-shop mall
                                        </a>
                                    </li>
                                    <li className="footer-list-item">
                                        <a href="/" className="footer-item-link">
                                            Hướng dẫn mua hàng
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <h3 className="fotter-heading">Về TicKid</h3>
                                <ul className="footer-list">
                                    <li className="footer-list-item">
                                        <a href="/" className="footer-item-link">
                                            Giới thiệu
                                        </a>
                                    </li>
                                    <li className="footer-list-item">
                                        <a href="/" className="footer-item-link">
                                            Tuyển dụng
                                        </a>
                                    </li>
                                    <li className="footer-list-item">
                                        <a href="/" className="footer-item-link">
                                            Điều khoản
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <h3 className="fotter-heading">Theo dõi chúng tôi trên</h3>
                                <ul className="footer-list">
                                    <li className="footer-list-item">
                                        <a href="/" className=" footer-item-link">
                                            <i className="footer-list-item-icon fa-brands fa-facebook" />{" "}
                                            Facebook
                                        </a>
                                    </li>
                                    <li className="footer-list-item">
                                        <a href="/" className="footer-item-link">
                                            <i className="footer-list-item-icon fa-brands fa-tiktok" />{" "}
                                            Tiktok
                                        </a>
                                    </li>
                                    <li className="footer-list-item">
                                        <a href="/" className="footer-item-link">
                                            <i className="footer-list-item-icon fa-brands fa-instagram" />{" "}
                                            Instagram
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <h3 className="fotter-heading">Vào cửa hàng trên ứng dụng</h3>
                                <div className="footer-qr">
                                    <img src={qr} alt="QR Code" className="footer-img-qr" />
                                    <div className="footer-img-app">
                                        <a href="/" className="footer-qr-link">
                                            <img
                                                src={app}
                                                alt=""
                                                className="footer-img-chplay-appstore"
                                            />
                                        </a>
                                        <a href="/" className="footer-qr-link">
                                            <img
                                                src={ch}
                                                alt=""
                                                className="footer-img-chplay-appstore"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <p
                                className="footer-text"
                                style={{ backgroundColor: "rgb(245,245,245)", fontSize: 15 }}
                            >
                                2023 - Bản quyền thuộc về LDT
                            </p>
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}

export default Footer
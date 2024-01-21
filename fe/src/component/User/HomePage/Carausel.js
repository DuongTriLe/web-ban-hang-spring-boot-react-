import React from 'react'

import Carousel from 'react-bootstrap/Carousel';
const Carausel = () => {
    return (
        <div className="row">
            <div className="col-8" style={{ paddingRight: '10px' }}>
                <Carousel style={{ marginLeft: '40px' }}>
                    <Carousel.Item>
                        <img
                            className="d-block "
                            src="https://cf.shopee.vn/file/vn-50009109-b2a2951fd90f7ed294ea89de8b0498cf_xxhdpi"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block "
                            src="https://cf.shopee.vn/file/vn-50009109-c07fef967cdebfd4d77e045c5f16d53b_xxhdpi"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src="https://cf.shopee.vn/file/vn-50009109-9452ec3552d60109b1f14c5aa1ae2b98_xxhdpi"
                            alt="third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block "
                            src="https://cf.shopee.vn/file/vn-50009109-ed778298c8169f97d5cdddeb9092ac02_xxhdpi"
                            alt="four slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="col-4" style={{ paddingLeft: 0 }}>
                <div style={{ paddingBottom: '12px' }}>
                    <img src="https://cf.shopee.vn/file/vn-50009109-88c7abdef2d39cf147dfbbf4c3a20d1b_xhdpi" alt="" className="img-fluid" />
                </div>
                <div>
                    <img src="https://cf.shopee.vn/file/vn-50009109-dc94899fe03bd80d88542d447f07cfc0_xhdpi" alt="" className="img-fluid" />
                </div>
            </div>
        </div>
    )
}

export default Carausel
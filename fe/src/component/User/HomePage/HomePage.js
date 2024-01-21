import React from 'react'
import Carausel from './Carausel'
import './homepage.css'
import DichVu from './DichVu'
import DanhMuc from './DanhMuc'
import DSProduct from './DSProduct'
const HomePage = () => {
    return (
        <>
            <div className="container-fluid" style={{ paddingTop: '30px' }}>
                <div className="container">
                    <Carausel />
                    <DichVu />

                </div>
            </div>
            <div className="container-fluid" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="container" style={{ paddingTop: '25px', paddingBottom: '30px' }}>
                    <DanhMuc />
                </div>
            </div>
            <div className="container-fluid" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="container">
                    <DSProduct />
                </div>
            </div>
        </>
    )
}

export default HomePage
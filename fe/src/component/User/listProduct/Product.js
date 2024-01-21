import React, { useState } from 'react';
import './product.css'
import TimKiem from './TimKiem'
import ListPro from './ListPro'
const Product = () => {

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedIdTypeProduct, setSelectedIdTypeProduct] = useState(null);
    return (
        <div
            className="container-fluid"
            style={{ backgroundColor: "rgb(245,245,245)" }}
        >
            <div className="container">
                <div className="row">
                    <TimKiem setSelectedCategoryId={setSelectedCategoryId} setSelectedIdTypeProduct={setSelectedIdTypeProduct} />
                    <ListPro selectedCategoryId={selectedCategoryId} selectedIdTypeProduct={selectedIdTypeProduct} />
                </div>
            </div>
        </div>

    )
}

export default Product